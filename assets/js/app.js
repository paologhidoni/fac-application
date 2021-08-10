////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// NAVIGATION


// Variables
const navigationBtn = document.querySelector('.navigation__button');
const navigationBack = document.querySelector('.navigation__background');
const navigationNav= document.querySelector('.navigation__nav');
const navigationlinks = document.querySelectorAll('.navigation__link');
const navigationIcon = document.querySelector('.navigation__icon');

///////////////////////////////////////
//Nav button clicked & Navigation open
navigationBtn.addEventListener('click', function(e) {
  e.preventDefault();

  navigationBack.classList.toggle('navigation__background-open');
  navigationNav.classList.toggle('navigation__nav-open');
  navigationIcon.classList.toggle('navigation__icon-clicked');
});

////////////////////////////////////////
//Smooth scrolling with event delegation 

//add event listener to common parent element
navigationNav.addEventListener('click', (e) => {
  e.preventDefault(); //prevent anything from happening when clicked

  if(e.target.classList.contains('navigation__link')) {  //Matching strategy, selecting only clicks on links, not on ul
    console.log(e.target)
    navigationBack.classList.toggle('navigation__background-open'); // open/close navigation background
    navigationNav.classList.toggle('navigation__nav-open'); // open/close navigation list

    navigationlinks.forEach(link => link.classList.remove('navigation__link-current')); // remove 'current' class from non active links

    e.target.classList.add('navigation__link-current'); // add 'current' class to active link

    const targetId = e.target.getAttribute('href'); //find id target section by getting the href attribute of the link
    const targetSection = document.querySelector(targetId); //getting the target section by id

    navigationIcon.classList.toggle('navigation__icon-clicked'); // remove clicked class from navigation icon

    let targetCoordinates = targetSection.getBoundingClientRect();
    window.scrollTo({
      top: targetCoordinates.top + window.pageYOffset, // distance from target and top ow the window + distance from top of the window to top of the page
      behavior: 'smooth',
    });
  }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// NAVIGATION end





//////////////////////////////////////////
//Animation on links in footer

const footerLinksContainer = document.querySelector('.section__footer-links-container');

function linksHover(e, url, transform, opacity) {

  // If user hovers over an element with the class '.section__footer-link', store the target element into the 'targetLink' constant.
  // Find the closest element to 'targetLink' with the class '.section__footer', select each one of its children with the class '.section__footer-link' and store them into the 'siblings' constant.
  if(e.target.classList.contains('section__footer-link')) {
    const targetLink = e.target;
    const targetId = `${e.target.id}`;
    console.log(targetId);

    const siblings = targetLink.closest('.section__footer').querySelectorAll('.section__footer-link');

    targetLink.style.backgroundImage = url + targetId + '.png';
    targetLink.style.transform = transform;

    siblings.forEach(sibling => {
      if(sibling !== targetLink) {
        sibling.style.opacity = opacity;
      }
    })
  } 
}

footerLinksContainer.addEventListener('mouseover', function(e) {

  linksHover(e, 'url(./assets/img/yellow-', 'scale(1.2)', 0.6);

});

footerLinksContainer.addEventListener('mouseout', function(e) {

  linksHover(e, 'url(./assets/img/',  'scale(1)', 1);

});





//////////////////////////////////////////
//Dinamically updated date in footer
document.querySelector('.date').textContent = (new Date().getFullYear());





//////////////////////////////////////////
//Parallax Effect in Hero Sections

// parallax effect
let heroes = document.querySelectorAll(".section__hero");
let heroBackgrounds = document.querySelectorAll(".section__hero-background");


// parallax effect on heroes - works only on one


window.addEventListener("scroll", function(){
  let valueY = window.scrollY;

  for (let i = 0; i < heroBackgrounds.length; i++) {
    heroBackground[i].style.top = valueY * 0.5 + "px";
  }
});








//////////////////////////////////////////
//Randomized Gallery


// let img_1 = 'url("assets/img/capossela.jpeg")';
// let img_2 = 'url("assets/img/golden.jpeg")';
// let img_3 = 'url("assets/img/moto.jpeg")'
// let img_4 = 'url("assets/img/airplane.jpg")'
// let img_5 = 'url("assets/img/italy.jpeg")'
// let img_6 = 'url("assets/img/greece.jpeg")';
// let img_7 = 'url("assets/img/spritz.jpeg")';
// let img_8 = 'url("assets/img/costwolds.jpeg")';
// let img_9 = 'url("assets/img/windsurf.jpeg")';
// let img_10 = 'url("assets/img/kings.jpeg")';
// let img_11 = 'url("assets/img/crete.jpeg")';

// let images = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, img_10, img_11];

// //Arrow immediately invoked version
// const randomBackground = (arr) => {
//   let i = arr.length;
//   while (i--) {                            
//     let randomNum = Math.trunc(Math.random() * arr.length);
//     let extractedPic = arr.splice(randomNum, 1);
//     document.querySelector(`.gallery__grid-item--${i+1}`)
//     .style.backgroundImage = extractedPic;
//   }
// };

// setInterval(randomBackground, 500, images); //NOT REPEATING???



//////////////////////////////////////////
//Images fading in