'use strict'

///// DRUM KIT PROJECT /////////////////////////////////////////////////////////////

//***************** */
// NOTES*********** */

// Turn your machine's volume down before start playing, then slowly turn it up to gradually check how loud the drum kit is!
// You shouldn' be pressing any alt keys while playing and your cap locks should be off.


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
primaryGainControl.gain.setValueAtTime(0.05, 0); // we connect all of our audio nodes to our gain node. 0.5 is the 'gain volume', using a value less than 0 decreases the volume, more than 0 increases the volume.
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
const kit_pieces = document.querySelectorAll('.kit-piece');

// const kick = document.querySelector('.kick');
const snare = document.querySelector('.snare');
const hi_hat = document.querySelector('.hi-hat');
// const cymbalLeft = document.querySelector('.cymbal-left');
// const cymbalRight = document.querySelector('.cymbal-right');

window.addEventListener('keydown', function(event) {

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

});
