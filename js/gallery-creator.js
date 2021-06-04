import galleryItems from "./gallery-items.js";

const galleryCreater = (galleryItems) => {
  return galleryItems.map((item) => {
    const newItem = document.createElement("li");
    const newLink = document.createElement("a");
    const newImg = document.createElement("img");
    newItem.classList.add("gallery__item");
    newLink.classList.add("gallery__link");
    newImg.classList.add("gallery__image");
    // newLink.href = item.original;
    newImg.src = item.preview;
    newImg.setAttribute("data-source", item.original);
    newImg.alt = item.description;
    newItem.appendChild(newLink);
    newLink.appendChild(newImg);
    return newItem;
  });
};

document.querySelector(".gallery").append(...galleryCreater(galleryItems));

const images = document.querySelectorAll(".gallery__image");

const lightbox = document.querySelector(".js-lightbox");

const closeLightboxBtn = document.querySelector(".lightbox__button");

const backdrop = document.querySelector(".lightbox__overlay");

const currentImg = document.querySelector(".lightbox__image");
const arrRefImg = [];
const arrAlt = [];

function onClickImage(event) {
  window.addEventListener("keydown", onEscPress);
  lightbox.classList.add("is-open");
  currentImg.src = this.dataset.source;
  currentImg.alt = this.alt;
}

function onEscPress(event) {
  if (event.code === "Escape") onCloseLightbox();
}

images.forEach((image) => {
  arrRefImg.push(image.getAttribute("data-source"));
  arrAlt.push(image.getAttribute("alt"));
  image.addEventListener("click", onClickImage);
});

function onCloseLightbox() {
  lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", onEscPress);
  currentImg.src = "";
}

closeLightboxBtn.addEventListener("click", onCloseLightbox);

backdrop.addEventListener("click", onCloseLightbox);

console.log(arrRefImg);

console.log(arrAlt);

document.addEventListener("keydown", (event) => {
  let currentIndex;
  let currentAlt;
  currentAlt = arrAlt.indexOf(currentImg.alt);
  currentIndex = arrRefImg.indexOf(currentImg.src);
  if (event.code === "ArrowRight") {
    if (currentIndex !== arrRefImg.length - 1) {
      currentIndex += 1;
      currentAlt += 1;
      currentImg.src = arrRefImg[currentIndex];
      currentImg.alt = arrAlt[currentAlt];
    } else {
      currentImg.src = arrRefImg[0];
      currentImg.alt = arrAlt[0];
    }
  }
  if (event.code === "ArrowLeft") {
    if (currentIndex !== 0) {
      currentIndex -= 1;
      currentAlt -= 1;
      currentImg.src = arrRefImg[currentIndex];
      currentImg.alt = arrAlt[currentAlt];
    } else {
      currentImg.src = arrRefImg[arrRefImg.length - 1];
      currentImg.alt = arrAlt[arrRefImg.length - 1];
    }
  }
});
