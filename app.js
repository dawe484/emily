'use strict';

const colors = require('colors/safe');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
// const mongoose = require('mongoose');
const helmet = require('helmet');

const routes = require('./routes/index');

// Init App
let app = express();

// Set connection to the database
// mongoose.connect('mongodb://localhost:27017/emily_database');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebars({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(favicon(path.join(__dirname, 'public', '/assets/favicon/favicon.ico')));

// Helmet - implements X-DNS-Prefetch-Control:off;
//        - remove X-Powered-By header
//        - sets the X-Download-Options to prevent Internet Explorer from executing downloads in your site’s context
//        - sets the X-XSS-Protection header to prevent reflected XSS attacks
app.use(helmet());

// X-Frame - protect from clickjacking attacks
app.use(helmet.frameguard({ action: 'deny'}));

// HTTP Strict Transport Security (HSTS) - Implement Strict-Transport-Security
app.use(helmet.hsts({
  maxAge: 5184000, //60 days in seconds
  includeSubdomains: false
}));

// Cache-Control
app.use(helmet.noCache({
  maxAge: 864000 //10 days
}));

// Morgan
app.use(morgan('dev'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public/'))); // folder for images, css files, etc.

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Emily'})
});

// Set Port
app.set('port', (process.env.PORT || 2222));
let server = app.listen(app.get('port'), () => {
  console.log("---------------------------------------\n"
    + colors.green("Server running... ") + "on port " + app.get('port')
    + "\nPress " + colors.red("Ctrl-C") + " to terminate."
    + "\n---------------------------------------");
});

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data); // send data to everyone else (not me)
    // io.sockets.emit('mouse', data); // send data to everyone (me too)
    console.log(data);
  }
}
