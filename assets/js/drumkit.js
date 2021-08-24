///// DRUM KIT PROJECT /////////////////////////////////////////////////////////////


const drumkit = document.querySelector('.drumkit'); //Select drumkit container.
const drumkitBtn = document.querySelector('.drumkit__btn'); //Select ON/OFF btn.

/*** ON/OFF button functionality ***/

drumkitBtn.addEventListener('click', function() { //When the ON/OFF button is clicked
  drumkit.classList.toggle('on'); //Apply 'on' class to drumkit.
  if(drumkit.classList.contains('on')) { //If drumkit is on
    drumkitBtn.textContent = 'ON'; //Change the button text to ON and
    drumkitBtn.style.backgroundColor = 'rgba(0, 230, 64, 0.8)'; //change the button's background color to green.
  } else { //If drumkit is ooff
    drumkitBtn.textContent = 'OFF'; //Change the button text to OFF and
    drumkitBtn.style.backgroundColor = 'rgba(242, 38, 19, 0.8)'; //change the button's background color to red.
  }
});


/*** Drum kit audio setup ***/

const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Adds support for Safari


// Audio buffer represents a certain duration of sound and stores the amplitude value of the signal

///// createBuffer() parameters: /////

//numberOfChannels: 
//number of samples in the entire buffer, multiply our sample rate by the number of seconds in our sample
//sample rate of our buffer

const buffer = audioContext.createBuffer( 
  2, // This is the number of channels
  audioContext.sampleRate * 0.5, // this is a mono buffer that holds one second worth of audio data.
  audioContext.sampleRate // This is the sample rate of our buffer, 44.100
);

// console.log(audioContext.sampleRate * 0.5);

const channelData = buffer.getChannelData(0); // getChannelData() returns an array where each item is a number representing the level of that sample.

// console.log(channelData.length);


const primaryGainControl = audioContext.createGain(); //Create a gain node to control the main output volume of our drumkit.
primaryGainControl.gain.setValueAtTime(0.50, 0); //We set the output volume for our gain control. 0.50 is the 'gain volume', using a value less than 0 decreases the volume, more than 0 increases the volume.
primaryGainControl.connect(audioContext.destination); //Connect the gain control to the output, the destination node represents whatever speakers are connected to play the audio on the computer.

//Create an object to store the kit pieces mp3 files relative paths.
const drumkitSoundsURLs = {
  kick: 'assets/sounds/kick.mp3',
  snare:  'assets/sounds/snare.mp3',
  hi_hat: 'assets/sounds/hi-hat.mp3',
  cymbal_left: 'assets/sounds/cymbal-left.mp3',
  cymbal_right: 'assets/sounds/cymbal-right.mp3'
};

// Function to generate sounds
const generateSound = async (id) => {

  const response = await fetch(drumkitSoundsURLs[id]);

  const soundBuffer = await response.arrayBuffer();

  const pieceBuffer = await audioContext.decodeAudioData(soundBuffer);
  
  const pieceSource = audioContext.createBufferSource();

  pieceSource.buffer = pieceBuffer;

  pieceSource.connect(primaryGainControl);

  pieceSource.start();

};


/*** Drum kit functionality ***/

// DESKTOP VERSION
window.addEventListener('keydown', function(event) {

  if(drumkit.classList.contains('on')) { // If button is ON

    event.preventDefault();

    let piece = '';

    event.key === 's' ? 
      piece = document.querySelector('.snare') :
    event.key === ' ' ? 
      piece = document.querySelector('.kick') :
    event.key === 'k' ? 
      piece = document.querySelector('.cymbal-right') :
    event.key === 'a' ? 
      piece = document.querySelector('.cymbal-left') :
    event.key === 'h' ? 
      piece = document.querySelector('.hi-hat') :    
      piece = undefined; 

    if(piece !== undefined) { 
      piece.src = `assets/img/${piece.id}-active.png`; // Change image when kit-piece is played to give a visual hint of which one is played, adding a yellow stroke.
      setTimeout(() => { 
        piece.src = `assets/img/${piece.id}.png`; // Give the kit-piece its original image after 100milliseconds.
      }, 100);
      
      generateSound(piece.id);
    }
  }
});


// TABLET - MOBILE VERSION

const kitMobileButtons = document.querySelectorAll('.drumkit-mobile-btn');

kitMobileButtons.forEach(button => {

  button.addEventListener('click', function(event) {

    if(drumkit.classList.contains('on')) { // If button is ON

      let piece = '';

      event.target.id === 'snare-btn' ? 
        piece = document.querySelector('.snare') :
      event.target.id === 'kick-btn' ? 
        piece = document.querySelector('.kick') :
      event.target.id === 'crash-r-btn' ? 
        piece = document.querySelector('.cymbal-right') :
      event.target.id === 'crash-l-btn' ? 
        piece = document.querySelector('.cymbal-left') :
      event.target.id === 'hi-hat-btn' ? 
        piece = document.querySelector('.hi-hat') :    
        piece = undefined; 

      // console.log(piece);
      if(piece !== undefined) {
        piece.src = `assets/img/${piece.id}-active.png`; // Change image when kit-piece is played to give a visual hint of which one is played, adding a yellow stroke.
        setTimeout(() => { 
          piece.src = `assets/img/${piece.id}.png`; // Give the kit-piece its original image after 100milliseconds.
        }, 100);
        
        generateSound(piece.id);
      }
    }
  })
})
