const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
const hour = document.querySelector(".hour");

const analog = document.querySelector(".analog p");

function setDate() {
  const now = new Date(); // new Date instance
  let seconds = now.getSeconds(); // get seconds of current minute
  if (seconds < 10) seconds = "0" + seconds; // so doesn't show in analog as '1' instead of '01' etc.
  // turn seconds of minute into a degree
  // base 100 so scale 0% to 100% = 0 to 360 deg
  const secondsDegrees = (seconds / 60) * 360 + 90; // add 90 because we initially offset by 90deg to get the hands vertical by default, so now it's like as if it's still starting at it's original left-to-right orientation so you have to add 90 to match the offset we've already added
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  analog.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// setDate();

setInterval(setDate, 1000);
