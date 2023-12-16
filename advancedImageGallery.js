/*
   Filename: advancedImageGallery.js
  
   Description: This JavaScript code is an advanced image gallery that displays a collection of images
   in a visually appealing and interactive way. It includes features such as image zooming, sliding
   transitions, thumbnail navigation, and a responsive design for different screen sizes.
*/

// Create an array of image URLs
var images = [
   "image1.jpg",
   "image2.jpg",
   "image3.jpg",
   "image4.jpg",
   // Add more image URLs here...
];

// Create an array of image captions
var captions = [
   "Image 1",
   "Image 2",
   "Image 3",
   "Image 4",
   // Add more captions here...
];

// Set the initial index for the currently displayed image
var currentIndex = 0;

// Function to display the image with the given index
function displayImage(index) {
   var imgElement = document.getElementById("image");
   var captionElement = document.getElementById("caption");

   // Update the image URL and caption
   imgElement.src = images[index];
   captionElement.innerHTML = captions[index];
}

// Function to handle the click event for the next button
function nextImage() {
   currentIndex++;

   // Wrap around to the first image if at the end
   if (currentIndex === images.length) {
      currentIndex = 0;
   }

   displayImage(currentIndex);
}

// Function to handle the click event for the previous button
function previousImage() {
   currentIndex--;

   // Wrap around to the last image if at the beginning
   if (currentIndex < 0) {
      currentIndex = images.length - 1;
   }

   displayImage(currentIndex);
}

// Add event listeners for the next and previous buttons
document.getElementById("next").addEventListener("click", nextImage);
document.getElementById("previous").addEventListener("click", previousImage);

// Function to handle the click event for the thumbnail images
function thumbnailClick(index) {
   currentIndex = index;
   displayImage(currentIndex);
}

// Generate the thumbnail images dynamically
var thumbnailContainer = document.getElementById("thumbnails");

for (var i = 0; i < images.length; i++) {
   var thumbnailImage = document.createElement("img");
   thumbnailImage.src = images[i];
   thumbnailImage.addEventListener("click", (function(index) {
      return function() {
         thumbnailClick(index);
      };
   })(i));

   thumbnailContainer.appendChild(thumbnailImage);
}

// Add zoom functionality to the main image
document.getElementById("image").addEventListener("mousemove", function(event) {
   var zoomElement = document.getElementById("zoom");
   var zoomFactor = 2;

   zoomElement.style.backgroundImage = "url('" + images[currentIndex] + "')";
   zoomElement.style.backgroundPosition = (-event.offsetX * zoomFactor) + "px " + (-event.offsetY * zoomFactor) + "px";
});

// Add sliding transitions to the image gallery
document.getElementById("gallery").addEventListener("click", function() {
   this.classList.toggle("slide");
});

// Responsive design changes for different screen sizes
window.addEventListener("resize", function() {
   if (window.innerWidth < 768) {
      document.getElementById("gallery").classList.remove("slide");
   } else {
      document.getElementById("gallery").classList.add("slide");
   }
});

// Display the first image
displayImage(currentIndex);