# Paolo Ghidoni's Founders and Coders application website

I am applying for the Founders and Coders programme, September 2021 cohort.

Please find my website [here](https://paologhidoni.github.io/fac-application/).

Thanks FaC for this huge opportunity.


## My steps in creating the website:

1. I Browsed online for interesting layouts that might inspire me not only visually (colors, use of white space, fonts) but give me ideas on how and where to place interesting content in the website.

2. Drew a quick mockup (or ten) on paper of how the website might look like, without going too deep into details but asking myself questions like:

- What is the main goal of the website.

- Who is the main user.

- How do I want to present myself.

- What content and how much content I want to present, how many sections.

- How would I implement single fundamental components like a navigation, a footer and so on.

  These look a bit awful but are examples of some sketches I've made to figure out the layout of my website:

  <img src='https://github.com/paologhidoni/fac-application/blob/master/assets/img/Project-1.jpg' alt='website sketch number 1'>
  <img src='https://github.com/paologhidoni/fac-application/blob/master/assets/img/Project-2.jpg' alt='website sketch number 2'>
  <img src='https://github.com/paologhidoni/fac-application/blob/master/assets/img/Project-3.jpg' alt='website sketch number 3'>
  <img src='https://github.com/paologhidoni/fac-application/blob/master/assets/img/Project-4.jpg' alt='website sketch number 4'>
  <img src='https://github.com/paologhidoni/fac-application/blob/master/assets/img/Project-5.jpg' alt='website sketch number 5'>

3. Ideally at this point I would have designed a mockup for the desktop and tablet/mobile versions of the website in Photoshop or any other software. I did not do this for this project, I adopted a different approach, I just started building because I wanted to practice coding while creating and give myself room to come up with something different with time.

4. I've set up the a development environment, deciding folder structure in the project, setting up sass, npm, git (I've set up git at a later stage).

5. Started putting together most of the assets, such as images, sounds, fonts, storing color pallettes in CSS variables, writing copy (I initially wrote everythin in a Word file).

6. Coded the website and keep checking it's responsiveness mostly using chrome's toggle device toolbar, the overall look taking screenshots using a browser extension called 'Nimbus Screenshot & Screen video recorder', asking for external feedback.

7. I was thinking about adding something a bit more personal and fun to the website, and I found out about the Web Audio Api, started learning more about it and decided to incorporate the drumkit app to interact and 'play' the drums in the browser.

8. Cleaned up / refactored the code as much as possible, minifyied images and audio files etc..

9. Pushed the website to GitHub Pages and kept testing it on as many devices as possible.




## What I would have added if I had more time:

// Website

- [ ]Parallax background scrolling effect on every 'hero' of each section.

- [ ]An image gallery designed using grid, where using Javascript I would have randomly selected images urls stored into an array and changed the background image url of each grid cell. The gallery would have been fully reponsive and change its layout depending on the device.

- [ ]A few more images appearing with animations, next to the paragraphs, to narrate everything a bit more clearly.

// Drumkit app

- [ ]Understand more deeply the [Web Audio Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to add volume or equalizer controls (like knobs or faders) to the drum kit and fix latency issues (if possible), mostly on tablet/mobile.

- [ ]Add a dropdown menu for the user to be able to change sound library,choosing between a set of sounds for each piece of the drumkit.

- [ ]Add more pieces to the drum kit, like Toms.

- [ ]Allow the user to personalise the controls to play the drumkit, both in the desktop and tablet/mobile version.

- [ ]Add different samples at different 'velocities' (perceived loudness and tone of the 'hit') to each kit piece, to make them sound more real and interesting.

- [ ]Improve audio compatibility with tablet/mobile browsers. Audio works in Chrome, Opera, Edge, Firefox. It does not work in Safari at the moment.

-  A thousand more features, I could have probably gone on for a year or two :D



## Notes

A message appears in the console when we loading the website:

'The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.'

This happens because the audioContext was created in the 'suspended' state before the user interacted with the page. A resume() method is available to resume the audioContext when the user interacts (for example clicking on a ON/OFF button); in this case it was not necessary to run resume(), since the audioContext authomatically resumes in the 'generateSound' function when the sound is generated running the start() method. More on this at [here](https://developer.chrome.com/blog/autoplay/#webaudio).
