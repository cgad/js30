const inputs = document.querySelectorAll(".controls input");
// ^type NodeList, supports forEach() method

function handleUpdate() {
  // dataset = object that contains all data attributes from specific element
  const units = this.dataset.sizing || ""; // hex code no units
  document.documentElement.style.setProperty(
    `--${this.name}`,
    `${this.value}${units}`
  );
}

inputs.forEach(input => {
  input.addEventListener("change", handleUpdate);
});
inputs.forEach(input => {
  input.addEventListener("mousemove", handleUpdate);
});
