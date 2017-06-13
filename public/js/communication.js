
// Add command (Short code artisan way)
artyom.on(["Good morning", "Good afternoon"]).then((i) => {
  switch (i) {
    case 0:
      artyom.say("Good morning, how are you?");
    break;
    case 1:
      artyom.say("Good afternoon, how are you?");
    break;
  }
});

let span, text;

artyom.on(["Hello", "Hi"]).then((i) => {
  switch (i) {
    case 0:
      span = document.getElementById('out');
      text = "Hello David, how are you today.";
      artyom.say(text);
      span.innerHTML = text;
    break;
    case 1:
      span = document.getElementById('out');
      text = "Hi David, how can i help you?";
      span.innerHTML = text;
      artyom.say(text);
    break;
  }
});

let newWindow;
let myWindow;

function openNewTab(address) {
  newWindow = window.open(address, '_blank');
  // newWindow.location;
  newWindow.blur;
};

artyom.on(["open new tab", "new tab"]).then((i) => {
  // openNewTab('http://google.cz');
  // window.open('','_parent','');
  openWin('http://google.cz');
});

artyom.on(["close tab"]).then((i) => {
  // window.open('', '_parent', '');
  // window.close();
  closeWin();
});

function openWin(address) {
  myWindow = window.open(address, '_blank');
  // myWindow.document.write("<p>This is 'myWindow'</p>");
  myWindow.location;
}

function closeWin() {
  myWindow.close();
}

artyom.on(["play music"]).then((i) => {
  openWin('https://www.youtube.com/watch?v=Ya7LA0PfIFs&list=PLN2psidca87iZmbiSR33skOT9sQ6MS8fA');
});


// artyom.on(["What's your name?"]).then((i) => {
//   let n = document.getElementById("myTextarea1").value;
//   artyom.say('Call me' + n, {
//     onStart: () => {
//       console.log("Talking: " + n);
//     },
//     onEnd: () => {
//       console.log("Stop talking.");
//     }
//   });
// });

function myFunction() {
  console.log("Converting text to speech ... wait");
  var x = document.getElementById("myTextarea").value;
  // document.getElementById("demo").innerHTML = x;
  artyom.say(x, {
    onStart: () => {
      console.log("Talking");
    },
    onEnd: () => {
      console.log("No more text to talk");
    }
  });
}

function setup() {
  createCanvas(600, 400);
  background(51);

  socket = io.connect('http://localhost:2222');

  // socket.on('mouse', newDrawing);
}

// function newDrawing(data) {
//   noStroke();
//   fill(255, 0, 100);
//   ellipse(data.x, data.y, 32, 32);
// }
//
// function mouseDragged() {
//   console.log("Sending: " + mouseX + ", " + mouseY);
//
//   let data = {
//     x: mouseX,
//     y: mouseY
//   }
//
//   socket.emit('mouse', data);
//
//   noStroke();
//   fill(255);
//   ellipse(mouseX, mouseY, 32, 32);
// }
//
// function draw() {
//   if (mouseIsPressed) {
//     mouseDragged();
//   }
// }

// // Smart command (Short code artisan way), set the second parameter of .on to true
// artyom.on(['Repeat after me *'] , true).then((i,wildcard) => {
//   artyom.say("You've said : " + wildcard);
// });

// // or add some commandsDemostrations in the normal way
// artyom.addCommands([
//   {
//     indexes: ['Hello','Hi','is someone there'],
//     action: (i) => {
//       artyom.say("Hello, it's me");
//     }
//   },
//   {
//     indexes: ['Repeat after me *'],
//     smart:true,
//     action: (i,wildcard) => {
//       artyom.say("You've said : "+ wildcard);
//     }
//   },
//   // The smart commands support regular expressions
//   {
//     indexes: [/Good Morning/i],
//     smart:true,
//     action: (i,wildcard) => {
//       artyom.say("You've said : "+ wildcard);
//     }
//   }
// ]);

// Redirect the recognized text
artyom.redirectRecognizedTextOutput((text, isFinal) => {
 let span = document.getElementById('output');

 if (isFinal) {
   span.innerHTML = '';
 } else {
   span.innerHTML = text;
 }
});

let socket;
// Start the commands!
function startArtyom() {
// window.onload = () => {
  artyom.fatality();

  setTimeout(() => {
    artyom.initialize({
      lang: "en-US", // GreatBritain english
      continuous: true, // Listen forever
      soundex: true,// Use the soundex algorithm to increase accuracy
      debug: true, // Show messages in the console
  //          executionKeyword: "and do it now",
      listen: true, // Start to listen commands!
      speed: 1
    }).then(() => {
        console.log("Artyom has been succesfully initialized");
        // console.log("The following array shouldn't be empty" , artyom.getVoices());
    }).catch((err) => {
        console.error("Artyom couldn't be initialized: ", err);
    });
  });
//        /**
//         * To speech text
//         */
//        artyom.say("Hello, this is a demo text. The next text will be spoken in Spanish",{
//          onStart: () => {
//            console.log("Reading ...");
//          },
//          onEnd: () => {
//            console.log("No more text to talk");
//
//            // Force the language of a single speechSynthesis
//            artyom.say("Hola, esto está en Español", {
//              lang:"es-ES"
//            });
//          }
//        });
}

// function stopArtyom() {
  // artyom.fatality();
// }
