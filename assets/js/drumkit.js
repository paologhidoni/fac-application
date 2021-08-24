///// DRUM KIT PROJECT /////////////////////////////////////////////////////////////

//Variables
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



/*** AUDIO SETUP ***/

/*** 1. Create a new audio context ***************************************************
Audio context is the environment to create any sound. */

const audioContext = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' }); // Create a new audio context, set the latency to be as low as possible ('interactive'). Add support for Safari with webkit prefix.




// /*** 2. Create a gain node *****************************************************
// to control the main output volume of our drumkit.*/

const primaryGainControl = audioContext.createGain(); //Create a gain node.
primaryGainControl.gain.setValueAtTime(0.50, 0); //Set the output volume for our gain control. 0.50 is the 'gain volume', using a value less than 0 decreases the volume, more than 0 increases the volume.
primaryGainControl.connect(audioContext.destination); //Connect the gain control to the output, the destination node represents whatever speakers are connected to play the audio on the computer (this will allow us to hear the sound).




/*** 3. Create a function to generate sounds **************************************
use the fetch API to download the sound, process it as an array buffer, and use the audio context decodeAudioData method to turn it into an audio buffer.
***/

const generateSound = async (id) => { //Use async function to load audio files.

  const response = await fetch(drumkitSoundsURLs[id]); //Use the fetch API to download the sound.
  const soundBuffer = await response.arrayBuffer();//Process the audio as an array buffer.
  const pieceBuffer = await audioContext.decodeAudioData(soundBuffer); //Decode the audio file data contained in an 'soundBuffer'. decodeAudioData() creates an audio source for Web Audio API from an audio track.
  const pieceSource = audioContext.createBufferSource(); //Create a new AudioBufferSourceNode and store it in the pieceSource variable. It can be used to play audio data contained within an audio buffer object.
  pieceSource.buffer = pieceBuffer; //Assign the audio source 'pieceBuffer' I've created to the buffer property of the 'pieceSource' AudioBufferSourceNode object.
  pieceSource.connect(primaryGainControl); //Connect 'pieceSource' to the main gain control
  pieceSource.start(); //Play the source.

};




/*** 4. Store the audio files ***************************************************
Create an object to store the kit pieces mp3 files relative paths. */

const drumkitSoundsURLs = {
  kick: 'assets/sounds/kick.mp3',
  snare:  'assets/sounds/snare.mp3',
  hi_hat: 'assets/sounds/hi-hat.mp3',
  cymbal_left: 'assets/sounds/cymbal-left.mp3',
  cymbal_right: 'assets/sounds/cymbal-right.mp3'
};




/*** 5. Receive the user's input and play the selected kit piece *******************
**/

//Function to play a specific drumkit piece and give visual feedback, both for desktop and mobile.
function playPiece(piece) {
  if(piece !== undefined) { //If a valid key/button is pressed
    piece.src = `assets/img/${piece.id}-active.png`; //Change image when kit-piece is played to give a visual hint of which one is played, adding a yellow stroke.
    setTimeout(() => { 
      piece.src = `assets/img/${piece.id}.png`; //Give the kit-piece its original image after 100milliseconds.
    }, 100);
    
    generateSound(piece.id); //Run the function to generate the sound of the seletcted kit piece.
  }
}

// Desktop Functionality, playing using keyboard.
window.addEventListener('keydown', function(event) {

  if(drumkit.classList.contains('on')) { // If button is ON

    event.preventDefault();

    let piece = ''; //Establish what piece is being played.

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

    playPiece(piece); //Play the kit piece.
  }
});


// Tablet/mobile Functionality, playing using touchscreen buttons.
const kitMobileButtons = document.querySelectorAll('.drumkit-mobile-btn');

kitMobileButtons.forEach(button => {

  button.addEventListener('click', function(event) {

    if(drumkit.classList.contains('on')) { // If button is ON

      let piece = ''; //Establish what piece is being played.

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

      playPiece(piece); //Play the kit piece.
    }
  })
})

