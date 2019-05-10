const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetch returns a Promise
fetch(endpoint)
  .then(res => res.json()) // convert raw data res into JSON
  .then(data => cities.push(...data)); // spread operator to give each array item it's own place in cities array rather than putting response array in one index in cities array

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// \B = no word boundary so finds the match in words that contain the match inside or at the end, but doesn't match at the start so like cat in certificate and tomcat, but not catfish or cat --> won't put a comma after the last 3 numbers
// ?= = at that position in the string, what directly follows is what matches (\d{3})+(?!\d)
// so must have 3 numbers in a row (\d{3}) starting from the start of the string, plus any number of non-numbers (?!\d) following

function displayMatches() {
  // this.value = user input aka word to match
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      // .replace the regex match with a span around the match with class=highlight so the match shows up highlighted on the list
      const cityName = place.city.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const population = numberWithCommas(place.population);
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">pop: ${population}</span>
    </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches); // change event only fires when you go off that element so would have to click out of the input box
searchInput.addEventListener("keyup", displayMatches);
