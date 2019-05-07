function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // attribute selector
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop if key doesn't have sound associated
  audio.currentTime = 0; // rewind to start so you can hit key a bunch and it'll start over
  audio.play();
  key.classList.add("playing"); // same as jquery key.addClass('playing')
}

// transition end event (like from scale 1 to 1.1 or from black to yellow for ex)
function removeTransition(e) {
  if (e.propertyName !== "transform") return; // stop if it's not a transform
  this.classList.remove("playing"); // 'this' is the element that JS is listening to
}

const keys = document.querySelectorAll(".key");
console.log('keys: ' + keys)
// can't listen on each item in array, can only listen to one at once
keys.forEach(key =>
  key.addEventListener("transitionend", removeTransition)
);

window.addEventListener("keydown", playSound);