// Elements Selection
let settingBox = document.querySelector(".setting-box");
let gearBoxSetting = document.querySelector(".setting-box i");
let listColorLis = document.querySelectorAll(".setting-box .color-list li");
let optionBackground = document.querySelectorAll(
  ".setting-box .background-option li"
);
let optionNavBar = document.querySelectorAll(".setting-box .nav-option li");
let resetOption = document.querySelector(".setting-box .reset");
let landPage = document.querySelector(".land-page");
let links = document.querySelectorAll(".land-page ul li a");
let skillSection = document.querySelector(".skills");
let skillProgresses = document.querySelectorAll(".skill-box span");
let galleryImages = document.querySelectorAll(".gallery img");
let navBullet = document.querySelector(".nav-bullets");
let bullets = document.querySelectorAll(".nav-bullets .bullet");

// Variables
let backgroundInterval;
let landPageBackgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundOption = localStorage.getItem("background-option") || "yes";
let navBarOption = localStorage.getItem("nav-option") || "yes";

// Function to toggle class
function toggleClass(element, className) {
  element.classList.toggle(className);
}

// Function to remove active class from all items
function removeActiveClass(elements) {
  elements.forEach((el) => el.classList.remove("active"));
}

// Function to add active class
function addActiveClass(element) {
  element.classList.add("active");
}

// Function to handle color selection
function handleColorSelection() {
  let mainColorStorage = localStorage.getItem("main-color");

  if (mainColorStorage) {
    document.documentElement.style.setProperty(
      "--main-color",
      mainColorStorage
    );
    listColorLis.forEach((li) => {
      li.classList.toggle("active", li.dataset.color === mainColorStorage);
    });
  }

  listColorLis.forEach((li) => {
    li.addEventListener("click", function () {
      removeActiveClass(listColorLis);
      addActiveClass(this);
      let selectedColor = this.dataset.color;
      document.documentElement.style.setProperty("--main-color", selectedColor);
      localStorage.setItem("main-color", selectedColor);
    });
  });
}

// Function to handle background selection and randomizer
function randomBackground() {
  if (backgroundOption === "yes") {
    backgroundInterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * landPageBackgrounds.length);
      landPage.style.backgroundImage = `url(img/${landPageBackgrounds[randomIndex]})`;
    }, 10000);
  } else {
    clearInterval(backgroundInterval);
  }
}

// Function to handle background option
function handleBackgroundOption() {
  optionBackground.forEach((li) => {
    li.classList.toggle("active", li.dataset.background === backgroundOption);
  });

  optionBackground.forEach((li) => {
    li.addEventListener("click", function () {
      removeActiveClass(optionBackground);
      addActiveClass(this);
      backgroundOption = this.dataset.background;
      localStorage.setItem("background-option", backgroundOption);

      randomBackground();
    });
  });

  randomBackground();
}

function showOrNotNavBar() {
  if (navBarOption === "yes") navBullet.classList.add("show");
  else navBullet.classList.remove("show");
}

function handleNavOption() {
  optionNavBar.forEach((li) => {
    li.classList.toggle("active", li.dataset.nav === navBarOption);
  });

  optionNavBar.forEach((li) => {
    li.addEventListener("click", function () {
      removeActiveClass(optionNavBar);
      addActiveClass(this);
      navBarOption = this.dataset.nav;
      localStorage.setItem("nav-option", navBarOption);

      showOrNotNavBar();
    });
  });
  showOrNotNavBar();
}
// Function to handle skills progress animation
function handleSkillsProgress() {
  let scrollTop = window.scrollY;
  let skillTopHeight = skillSection.offsetTop;

  if (scrollTop > skillTopHeight - 300) {
    skillProgresses.forEach((span) => {
      span.style.width = span.dataset.prog;
      span.style.color = "#fff";
    });
  } else {
    skillProgresses.forEach((span) => {
      span.style.width = 0;
      span.style.color = "#eee";
    });
  }
}

// Function to debounce scroll events
function debounce(func, wait = 20) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

// Function to handle gallery popup
function handleGalleryPopup() {
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      let popupOverlay = document.createElement("div");
      popupOverlay.className = "popup-overlay";
      document.body.appendChild(popupOverlay);

      let popupBox = document.createElement("div");
      popupBox.className = "popup-box";

      let popupBoxImg = document.createElement("img");
      popupBoxImg.src = e.target.src;
      popupBox.appendChild(popupBoxImg);

      let closeSpan = document.createElement("span");
      closeSpan.className = "close-popup";
      closeSpan.textContent = "X";
      popupBox.appendChild(closeSpan);

      document.body.appendChild(popupBox);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.className === "close-popup") {
      e.target.parentElement.remove();
      document.querySelector(".popup-overlay").remove();
    }
  });
}

// Function to handle bullets scrolling
function handleBulletsScroll() {
  bullets.forEach((bullet) => {
    bullet.addEventListener("click", () => {
      document
        .querySelector(bullet.dataset.scroll)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Function to handle link activation
function handleLinkActivation() {
  links.forEach((link) => {
    link.addEventListener("click", function () {
      removeActiveClass(links);
      addActiveClass(this);
    });
  });
}

function resetLocalStorage() {
  resetOption.onclick = () => {
    localStorage.clear();
    window.location.reload();
  };
}

// Reset local storage option
resetLocalStorage();

// Initialize color selection
handleColorSelection();

// Initialize background option
handleBackgroundOption();

// Initialize nav bar option
handleNavOption();

// Initialize link activation
handleLinkActivation();

// Initialize bullets scroll
handleBulletsScroll();

// Initialize gallery popup
handleGalleryPopup();

// Gear box setting toggle
gearBoxSetting.onclick = () => toggleClass(settingBox, "open");

// Handle scroll for skill section (debounced)
window.onscroll = debounce(handleSkillsProgress);
