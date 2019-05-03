let now;
let seconds;
let minutes;
let hour;

const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const analogTime = document.querySelector(".analogTime");
const toggleButton = document.querySelector(".toggle");
const analogSetting = document.querySelector(".setting");

toggleButton.addEventListener("click", function() {
  if (toggleButton.classList.contains("military")) {
    toggleButton.classList.remove("military");
    toggleButton.innerHTML = "to military";
    analogSetting.innerHTML = "STANDARD";
  } else {
    toggleButton.classList.add("military");
    toggleButton.innerHTML = "to standard";
    analogSetting.innerHTML = "MILITARY";
  }
});

function setTime() {
  now = new Date(); // new Date instance
  seconds = now.getSeconds(); // get seconds of current minute
  minutes = now.getMinutes();
  hour = now.getHours();

  // turn seconds of minute into a degree
  // base 100 so scale 0% to 100% = 0 to 360 deg
  const secondsDegrees = (seconds / 60) * 360 + 90; // add 90 because we initially offset by 90deg to get the hands vertical by default, so now it's like as if it's still starting at it's original left-to-right orientation so you have to add 90 to match the offset we've already added
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hourDegrees = (hour / 12) * 360 + (minutes / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  // for analog
  if (seconds < 10) seconds = `0${seconds}`;
  if (minutes < 10) minutes = `0${minutes}`;

  if (toggleButton.classList.contains("military")) {
    analogTime.innerHTML = `${hour}:${minutes}:${seconds}`;
  } else {
    toStandard();
  }
}

// to standard time
function toStandard() {
  let identifier;
  let stdHour = hour;
  if (0 < hour && hour < 12) {
    identifier = "AM";
  } else {
    identifier = "PM";
    stdHour = hour - 12;
  }
  analogTime.innerHTML = `${stdHour}:${minutes}:${seconds} ${identifier}`;
}

setTime();
setInterval(setTime, 1000);
