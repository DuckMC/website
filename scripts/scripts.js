
// ███████╗██╗     ██╗██████╗ ███████╗██████╗ 
// ██╔════╝██║     ██║██╔══██╗██╔════╝██╔══██╗
// ███████╗██║     ██║██║  ██║█████╗  ██████╔╝
// ╚════██║██║     ██║██║  ██║██╔══╝  ██╔══██╗
// ███████║███████╗██║██████╔╝███████╗██║  ██║
// ╚══════╝╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝

var urls = [
	'https://image.jimcdn.com/app/cms/image/transf/none/path/s81991ed0496c1df4/backgroundarea/ic383bc2687a0fa48/version/1538921439/image.png',
	'https://i.imgur.com/5G9OQlk.jpg',
	'https://image.jimcdn.com/app/cms/image/transf/none/path/s81991ed0496c1df4/backgroundarea/ic383bc2687a0fa48/version/1538921439/image.png',
	'https://i.imgur.com/RpfXT1W.jpg'
];

// Get the placeholder element and all the slides
var placeholder = document.querySelector('.split-slider__placeholder');
var slides = document.querySelectorAll('.slide');

// Get the total number of slides
var slidesLength = slides.length;

// Initialize the current element and index
var currentElem = slides[0];
var currentIndex = 0;

// Function to load an image
function loadImage(url) {
	return new Promise(function(resolve, reject) {
		var img = new Image();
		img.onload = function() {
			img.onload = img.onerror = null;
			resolve(img);
		};
		img.onerror = function(e) {
			img.onload = img.onerror = null;
			reject(e);
		};
		img.src = url;
	});
}

// Function to load multiple images
function loadImages(urls) {
	return Promise.all(urls.map(url => loadImage(url)))
}

// Error handling function
function onError(error) {
	// placeholder.classList.add('split-slider__placeholder_error');
	placeholder.innerHTML = `
		<pre><code>${error}</pre></code>`; // Display the error message
	return error;
}

// Function to set the URLs of the images to the slides
function setImagesUrls(images) {
	slides.forEach((slide, index) => {
		slide.querySelector('.slide__image')
			.style.backgroundImage = `url(${images[index].src})`;
		slide.classList.remove('slide_wait');
	});
}

// Function to set the active slide
function setActiveSlide(index) {
	slides[index].classList.add('slide_active');
	currentElem.classList.remove('slide_active');
	currentElem = slides[index];
}

// Function to change the slide
function changeSlide() {
	currentIndex = (currentIndex + 1 + slidesLength) % slidesLength;
	setActiveSlide(currentIndex);
}

// Function to start the slide show
function start() {
	setInterval(changeSlide, 4000); // Change slide every 4 seconds
}

// Load the images, set the URLs, and start the slide show
loadImages(urls)
	.then(setImagesUrls)
	.then(start)
	.catch(onError)











