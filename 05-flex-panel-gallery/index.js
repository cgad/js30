const panels = document.querySelectorAll(".panel"); // gives NodeList of all panels

function toggleOpen() {
  this.classList.toggle("open"); // removes if there, adds if not
}

function toggleActive(event) {
  console.log(event);
  // 2 transition events, font-size and flex-grow
  // Safari calls flex-grow flex so do .includes instead of ===
  if (event.propertyName.includes('flex')) {
    this.classList.toggle("open-active");
  }
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive)); 
