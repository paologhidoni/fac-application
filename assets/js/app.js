/* TABLE OF CONTENTS /////////////////////////////////////////////////////////*/

/* Line 15 -  NAVIGATION 
 * Line 70 -  ACCORDION 
 * Line 98 -  ANIMATING LINKS IN FOOTER
 * Line 137 - PARALLAX SCROLLING EFFECT INTRO SECTION
 * Line 149 - FADE-IN ANIMATION ON PARAGRAPHS    
 * Line 185 - DINAMICALLY UPDATE YEAR
 * Line 194 - DRUMKIT PROJECT 

///////////////////////////////////////////////////////////////////////////////////*/


////////////////////////////////////////////////////////////////////////////
//// NAVIGATION

// Variables
const navigationBtn = document.querySelector('.navigation__button');
const navigationBackground = document.querySelector('.navigation__background');
const navigationNav= document.querySelector('.navigation__nav');
const navigationlinks = document.querySelectorAll('.navigation__link');
const navigationIcon = document.querySelector('.navigation__icon');

/*** Nav button clicked & Navigation open ***/

// When the navigation button is clicked, 3 elements' classes are toggled and modify the elements' styles like so:  
navigationBtn.addEventListener('click', function(e) {
  e.preventDefault(); //Prevent any default behaviour when clicked.

  navigationBackground.classList.toggle('navigation__background-open'); // The navigation background is transformed into a size big enough to cover the entire viewport.
  navigationNav.classList.toggle('navigation__nav-open'); // The navigation ul list is made visible again.
  navigationIcon.classList.toggle('navigation__icon-clicked'); // The navigation Icon's span gets hidden and its before and after pseudo elements rotate forming an X.
});


/*** Smooth scrolling with event delegation ***/

//Add event listener to common parent element, the ul list.
navigationNav.addEventListener('click', (e) => {
  e.preventDefault(); //Prevent any default behaviour when clicked.

  if(e.target.classList.contains('navigation__link')) {  //Matching strategy, selecting only clicks on links, not on ul.
    navigationBackground.classList.remove('navigation__background-open'); //Hide navigation background.
    navigationNav.classList.remove('navigation__nav-open'); //Hide navigation list.

    navigationlinks.forEach(link => link.classList.remove('navigation__link-current')); // Remove 'current' class from non active links.
    e.target.classList.add('navigation__link-current'); //Add 'current' class to active link.

    const targetId = e.target.getAttribute('href'); //Find desired section's id by getting the href attribute value of the target link.
    const targetSection = document.querySelector(targetId); //Get the target section by id.

    navigationIcon.classList.remove('navigation__icon-clicked'); //Navigation icon is set back to closed state.

    let targetCoordinates = targetSection.getBoundingClientRect(); //Determine element's position relative to the viewport.
    window.scrollTo({ //Scroll the window to the following position to the top:
      top: targetCoordinates.top + window.pageYOffset, // Distance from target to top of the viewport + distance from top of the viewport to top of the page.
      behavior: 'smooth'
    });
  }
})

/////////////////////////////////////////////////////////////////////////////////////
//// NAVIGATION end





/////////////////////////////////////////////////////////////////////////////////////
// ACCORDION 

const accordionLabels = document.querySelectorAll('.accordion__label'); //Select all labels.

accordionLabels.forEach(label => { //Loop through each label of the accordion.

  label.addEventListener('click', function(e) { //Add an event listener to every label.

    if(label === e.target) { //Only for the clicked label we:
      const contentHeight = label.nextElementSibling.scrollHeight; //Store its associated content height into a variable.
      label.classList.toggle('accordion__label--open'); //Give the label the 'open' class.

      (label.classList.contains('accordion__label--open')) ? //If the label is open, 
      label.nextElementSibling.style.maxHeight = `${contentHeight}px` : //the associated content is shown by bringing it back to its original height.
      label.nextElementSibling.style.maxHeight = '0px'; // Otherwise, if the label is closed, the content is hidden by setting its height to 0px.

    }
  })
});

/////////////////////////////////////////////////////////////////////////////////////
//// ACCORDION end





/////////////////////////////////////////////////////////////////////////////////////
// ANIMATING LINKS IN FOOTER on mouseover

const footerLinksContainer = document.querySelector('.section__footer-links-container'); //Select links parent.

// Build a function to run both on mouseover and mouseout, passing different arguments.
function linksHover(e, url, transform, opacity) {

  if(e.target.classList.contains('section__footer-link')) { //For the link the user is hovering on/out:
    const targetLink = e.target; //Store the target element into a variable.
    const targetId = `${e.target.id}`; //Store target elemen's ID into a variable.
    const siblings = targetLink.closest('.section__footer').querySelectorAll('.section__footer-link'); //Store all links siblings into a variable.

    targetLink.style.backgroundImage = url + targetId + '.png'; //Dynamically build the url of the background image to apply to the element.
    targetLink.style.transform = transform; //Modify the CSS transform property on the element.

    siblings.forEach(sibling => { //For every sibling
      if(sibling !== targetLink) { //If the sibling is not the element we are hovering on/out
        sibling.style.opacity = opacity; //Modify the CSS opacity property on the sibling.
      }
    })
  } 
}

footerLinksContainer.addEventListener('mouseover', function(e) {
  linksHover(e, 'url(./assets/img/yellow-', 'scale(1.2)', 0.6);
}); //When hovering over a link, use the 'yellow' background image and slightly increase the size of the icon for the target link, slightly fade the siblings.

footerLinksContainer.addEventListener('mouseout', function(e) {
  linksHover(e, 'url(./assets/img/',  'scale(1)', 1);
}); //When not hovering anymore over a link, use the default background image and resize to normal the icon for the target link, siblings go back to their normal opacity.

/////////////////////////////////////////////////////////////////////////////////////
//// ANIMATING LINKS IN FOOTER end





/////////////////////////////////////////////////////////////////////////////////////
// PARALLAX SCROLLING EFFECT Oon intro hero background
const introHeroBackground = document.querySelector('.section__hero--intro').firstElementChild; //Select intro hero background img.

window.addEventListener('scroll', function(){
  introHeroBackground.style.top = window.pageYOffset * 0.5 + 'px'; //As the user scrolls, dynamically change the background img positioning related to the top of its container. The top property is set to equal the value in pixel of the vertical distance from the top of the document multiplied x 0.5.
})





////////////////////////////////////////////////////////////////////////
// FADE-IN ANIMATION ON PARAGRAPHS, using the Intersection Observer API

const gridItems = document.querySelectorAll('.grid__item'); //Select all paragraphs.

//Create the callback function to pass as first argument in the Intersection Observer. The callback function accepts 2 arguments:
//1. entries is an array containing the threshold entries, every time the target element passes the threshold set for the root element (the viewport in this case) we get an event.
//2. observer Is the Intersection Observer instance I will create, 'gridItemObserver'.
const showgridItems = function(entries, observer) {
  const entry = entries[0]; //Store the last happening entry in the entries array.
  entry.target.classList.remove('grid__item--hidden'); //Select the element that triggered the event by accessing the target property of the IntersectionObserverEntry object, and show it.
  observer.unobserve(entry.target); //Unobserve the element that triggered the event because it has been shown already and the Intersection Observer would otherwise keep registering events for no reason. 
}

//Store the options for our Intersection Observer into an object that will be passed as second argument when creating our Intersection Observer.
//The callback function will run when these options/conditions will be met.
const observerOptions = { 
  root: null, //This is the element the target will be intersecting, the root element. Null represents the entire viewport.
  threshold: 0.4 //This is the percentage of intersection at which the observer callback function will be called. In this case 40% of the target element needs to be visible for the callback function to be called.
};

// Create a new Intersection Observer that will run the 'showgridItems' function on the target element once the options specified in the observerOptions object are met, whether we are scrolling up or down.
const gridItemObserver = new IntersectionObserver(showgridItems, observerOptions);

gridItems.forEach(function(gridItem) { //Loop through all paragraphs.

  gridItemObserver.observe(gridItem); //Call the observe() method on every paragraph (the target element), it will use the Intersection Observer (gridItemObserver) to observe their position in relation to the root element (the viewport in this case).
  gridItem.classList.add('grid__item--hidden'); //Hide all paragraphs. I didn't add the class inline in the HTML because if Javascript were not to work the paragraphs would stay hidden.
});

////////////////////////////////////////////////////////////////////////
// FADE-IN ANIMATION ON PARAGRAPHS end




//////////////////////////////////////////
// DINAMICALLY UPDATE YEAR in footer

document.querySelector('.date').textContent = (new Date().getFullYear());





////////////////////////////////////////////////////////////////////////
// DRUMKIT PROJECT

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

////////////////////////////////////////////////////////////////////////
// DRUMKIT PROJECT end





// NOT IMPLEMENTED - I did't really like it//

////////////////////////////////////////////////////////////////////
// Nav button appears after first section using Intersection Observer

// const navHeight = getComputedStyle(navigationBtn).height; // Find height of navigation button to use as rootMargin in the IntersectionObserver.

// const fixedNav = function(entries) { // Function to add/ remove the 'fixed' class to the navigation when going past the 'origins' section.
//   if(!entries[0].isIntersecting) {
//     navigationBtn.classList.add('fixed');
//     navigationBack.classList.add('fixed');
//   } else {
//     navigationBtn.classList.remove('fixed');
//     navigationBack.classList.remove('fixed');  
//   }
// }

// const sectionOriginsObserver = new IntersectionObserver(fixedNav, {root: null, threshold: 0, rootMargin: `-${navHeight}`});
// sectionOriginsObserver.observe(document.querySelector('#origins'));



