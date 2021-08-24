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





////////////////////////////////////////////////////////////////////////
// FADE-IN ANIMATION ON PARAGRAPHS, using Intersection Observer

const gridItems = document.querySelectorAll('.grid__item'); // Select all paragraphs.

//Function that will be called by the Intersection Observer.
const showgridItems = function(entries, observer) {
  const [entry] = entries; //These are the paragraphs
  if(!entry.isIntersecting) return; 
    entry.target.classList.remove('grid__item--hidden'); // Show it.
  observer.unobserve(entry.target); // Stop observing that paragraph.
}

// Create a new Intersection Observer that will run a function on the element that is being observed, when it will be past the set threshold, respecting the rootMargin.
const gridItemObserver = new IntersectionObserver(showgridItems, {
  root: null,
  threshold: 0.4,
  rootMargin: '-50px'
});

gridItems.forEach(function(gridItem) { //Loop through all paragraphs

  gridItemObserver.observe(gridItem); //Attach gridItemObserver to each paragraph.
  gridItem.classList.add('grid__item--hidden'); //Hide all paragraphs.

});

////////////////////////////////////////////////////////////////////////
// FADE-IN ANIMATION ON PARAGRAPHS end




//////////////////////////////////////////
//DINAMICALLY UPDATE YEAR in footer
document.querySelector('.date').textContent = (new Date().getFullYear());





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








// ///// DRUM KIT PROJECT /////////////////////////////////////////////////////////////


// const drumkit = document.querySelector('.drumkit'); //Select drumkit container.
// const drumkitBtn = document.querySelector('.drumkit__btn'); //Select ON/OFF btn.

// /*** ON/OFF button functionality ***/

// drumkitBtn.addEventListener('click', function() { //When the ON/OFF button is clicked
//   drumkit.classList.toggle('on'); //Apply 'on' class to drumkit.
//   if(drumkit.classList.contains('on')) { //If drumkit is on
//     drumkitBtn.textContent = 'ON'; //Change the button text to ON and
//     drumkitBtn.style.backgroundColor = 'rgba(0, 230, 64, 0.8)'; //change the button's background color to green.
//   } else { //If drumkit is ooff
//     drumkitBtn.textContent = 'OFF'; //Change the button text to OFF and
//     drumkitBtn.style.backgroundColor = 'rgba(242, 38, 19, 0.8)'; //change the button's background color to red.
//   }
// });


// /*** Drum kit audio setup ***/

// const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Adds support for Safari


// // Audio buffer represents a certain duration of sound and stores the amplitude value of the signal

// ///// createBuffer() parameters: /////

// //numberOfChannels: 
// //number of samples in the entire buffer, multiply our sample rate by the number of seconds in our sample
// //sample rate of our buffer

// const buffer = audioContext.createBuffer( 
//   2, // This is the number of channels
//   audioContext.sampleRate * 0.5, // this is a mono buffer that holds one second worth of audio data.
//   audioContext.sampleRate // This is the sample rate of our buffer, 44.100
// );

// // console.log(audioContext.sampleRate * 0.5);

// const channelData = buffer.getChannelData(0); // getChannelData() returns an array where each item is a number representing the level of that sample.

// // console.log(channelData.length);


// const primaryGainControl = audioContext.createGain(); //Create a gain node to control the main output volume of our drumkit.
// primaryGainControl.gain.setValueAtTime(0.50, 0); //We set the output volume for our gain control. 0.50 is the 'gain volume', using a value less than 0 decreases the volume, more than 0 increases the volume.
// primaryGainControl.connect(audioContext.destination); //Connect the gain control to the output, the destination node represents whatever speakers are connected to play the audio on the computer.

// //Create an object to store the kit pieces mp3 files relative paths.
// const drumkitSoundsURLs = {
//   kick: 'assets/sounds/kick.mp3',
//   snare:  'assets/sounds/snare.mp3',
//   hi_hat: 'assets/sounds/hi-hat.mp3',
//   cymbal_left: 'assets/sounds/cymbal-left.mp3',
//   cymbal_right: 'assets/sounds/cymbal-right.mp3'
// };

// // Function to generate sounds
// const generateSound = async (id) => {

//   const response = await fetch(drumkitSoundsURLs[id]);

//   const soundBuffer = await response.arrayBuffer();

//   const pieceBuffer = await audioContext.decodeAudioData(soundBuffer);
  
//   const pieceSource = audioContext.createBufferSource();

//   pieceSource.buffer = pieceBuffer;

//   pieceSource.connect(primaryGainControl);

//   pieceSource.start();

// };


// // Drum Kit Functionality

// // DESKTOP VERSION
// window.addEventListener('keydown', function(event) {

//   if(drumkit.classList.contains('on')) { // If button is ON

//     event.preventDefault();

//     let piece = '';

//     event.key === 's' ? 
//       piece = document.querySelector('.snare') :
//     event.key === ' ' ? 
//       piece = document.querySelector('.kick') :
//     event.key === 'k' ? 
//       piece = document.querySelector('.cymbal-right') :
//     event.key === 'a' ? 
//       piece = document.querySelector('.cymbal-left') :
//     event.key === 'h' ? 
//       piece = document.querySelector('.hi-hat') :    
//       piece = undefined; 

//     // console.log(piece);
//     if(piece !== undefined) { 
//       piece.src = `assets/img/${piece.id}-active.png`; // Change image when kit-piece is played to give a visual hint of which one is played, adding a yellow stroke.
//       setTimeout(() => { 
//         piece.src = `assets/img/${piece.id}.png`; // Give the kit-piece its original image after 100milliseconds.
//       }, 100);
      
//       generateSound(piece.id);
//     }
//   }
// });


// // TABLET - MOBILE VERSION

// const kitMobileButtons = document.querySelectorAll('.drumkit-mobile-btn');
//       // console.log(kitMobileButtons);

// kitMobileButtons.forEach(button => {

//   button.addEventListener('click', function(event) {

//     if(drumkit.classList.contains('on')) { // If button is ON

//       let piece = '';

//       event.target.id === 'snare-btn' ? 
//         piece = document.querySelector('.snare') :
//       event.target.id === 'kick-btn' ? 
//         piece = document.querySelector('.kick') :
//       event.target.id === 'crash-r-btn' ? 
//         piece = document.querySelector('.cymbal-right') :
//       event.target.id === 'crash-l-btn' ? 
//         piece = document.querySelector('.cymbal-left') :
//       event.target.id === 'hi-hat-btn' ? 
//         piece = document.querySelector('.hi-hat') :    
//         piece = undefined; 

//       // console.log(piece);
//       if(piece !== undefined) {
//         piece.src = `assets/img/${piece.id}-active.png`; // Change image when kit-piece is played to give a visual hint of which one is played, adding a yellow stroke.
//         setTimeout(() => { 
//           piece.src = `assets/img/${piece.id}.png`; // Give the kit-piece its original image after 100milliseconds.
//         }, 100);
        
//         generateSound(piece.id);
//       }
//     }
//   })
// })
