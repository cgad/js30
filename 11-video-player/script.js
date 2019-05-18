const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // alt way -->
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
};

function skip() {
  const dataSkip = this.getAttribute("data-skip");
  // ^ can also access data-skip value from this.dataset
  video.currentTime += parseFloat(dataSkip);
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

// flag for handling ranges - using mouseover instead of change so reflects change on slide instead of when gets to final point
let mouseDown = false;

function handleRangeUpdate() {
  if (!mouseDown) return;
  // this.name = volume or playbackRate
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  // event.offsetX = how many pixels clicked away from the start of the bar
  // progress.offsetWidth = width of progress bar
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration; // percent of progress * duration of video
  video.currentTime = scrubTime;
}

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress); // when video updates its timecode
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
ranges.forEach(range =>
  range.addEventListener("mousedown", () => (mouseDown = true))
);
ranges.forEach(range =>
  range.addEventListener("mouseup", () => (mouseDown = false))
);
progress.addEventListener("click", scrub);
