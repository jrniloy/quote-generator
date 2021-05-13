"use strict";

const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const footer = document.querySelector(".footer");

let photosArr = [];

// check if all images are loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) ready = true;
  console.log("ready");
}

//  Unsplash API
const count = 20;
const apiKey = "UGHIltQWWQ0ET30Z1TfK9BFvGPd9mNvJe-QurGjIcOs";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=travel`;

//  Create elements for links & photos, add that to the DOM
function displayPhotos() {
  // Run function for Each object in photosArr
  photosArr.forEach((photo) => {
    // console.log(photo);

    const markup = `
    <a href="${photo.links.html}" target="_blank">
        <img class="unsplash-image" src="${photo.urls.small}" alt="${photo.alt_description}" title="${photo.alt_description}" />
      </a>
    `;
    imageContainer.insertAdjacentHTML("beforeend", markup);
  });
}

//  Get photos from API
async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    photosArr = await res.json();

    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

const options = {
  root: null,
  rootMargin: "750px",
  threshold: 0.1,
};
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getPhotos();
    }
  });
};

const heightObserver = new IntersectionObserver(callback, options);
heightObserver.observe(footer);

// on load
getPhotos();
