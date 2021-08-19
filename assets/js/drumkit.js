'use strict'

///// DRUM KIT PROJECT /////////////////////////////////////////////////////////////

//***************** */
// NOTES*********** */

// Turn your machine's volume down before start playing, then slowly turn it up to gradually check how loud the drum kit is!
// You shouldn' be pressing any alt keys while playing and your cap locks should be off.

const drumkit = document.querySelector('.drumkit');
const drumkitBtn = document.querySelector('.drumkit__btn');

// ON/OFF button functionality
drumkitBtn.addEventListener('click', function() {
  drumkit.classList.toggle('on');
  if(drumkit.classList.contains('on')) {
    drumkitBtn.textContent = 'ON';
    drumkitBtn.style.backgroundColor = 'rgba(0, 230, 64, 0.8)';
  } else {
    drumkitBtn.textContent = 'OFF';
    drumkitBtn.style.backgroundColor = 'rgba(242, 38, 19, 0.8)';
  }
});


// Drum kit audio setup
const audioContext = new AudioContext();

// Audio buffer represents a certain duration of sound and stores the amplitude value of the signal

// console.log(audioContext.sampleRate);


///// createBuffer() parameters: /////

//numberOfChannels: 
//number of samples in the entire buffer, multiply our sample rate by the number of seconds in our sample
//sample rate of our buffer

const buffer = audioContext.createBuffer( 
  2, 
  audioContext.sampleRate * 0.5, // this is a mono buffer that holds one second worth of audio data.
  audioContext.sampleRate
);

const channelData = buffer.getChannelData(0); // this returns an array where each item is a number representing the level of that sample.

// console.log(channelData.length);

for (let i = 0; i < buffer.length; i++) { // assigning a random value between -1 and 1 to our signal we can create white noise.
  channelData[i] = Math.random() * 2 - 1;
}

//the destination node represents whatever speakers are connected to play the audio on the computer.
const primaryGainControl = audioContext.createGain(); // we create a gain node to control the main output volume.
primaryGainControl.gain.setValueAtTime(0.50, 0); // we connect all of our audio nodes to our gain node. 0.40 is the 'gain volume', using a value less than 0 decreases the volume, more than 0 increases the volume.
primaryGainControl.connect(audioContext.destination); //Connect the gain control to the output.


// MP3 AUDIO FILES ////////////////////////////////////////////////////////////////////
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



// Drum Kit Functionality

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

    // console.log(piece);
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

// // const kick = document.querySelector('.kick-btn');
// const snare = document.querySelector('.snare-btn');
// const hi_hat = document.querySelector('.hi-hat-btn');
// // const cymbalLeft = document.querySelector('.crash-l-btn');
// // const cymbalRight = document.querySelector('.crash-R-btn');

const kitMobileButtons = document.querySelectorAll('.drumkit-mobile-btn');
      console.log(kitMobileButtons);

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
