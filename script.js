const el = document.querySelector(".card");
const wrap = document.querySelector(".card__wrapper");
let w = el.clientWidth;
let h = el.clientHeight;
let b = el.getBoundingClientRect();
let isHovering = false;

el.addEventListener("mouseenter", () => {
  isHovering = true;
});

el.addEventListener("mouseleave", () => {
  isHovering = false;
  resetTilt();
});

el.addEventListener("mousemove", (e) => {
  if (isHovering) {
    let X = (e.clientX - b.left) / w;
    let Y = (e.clientY - b.top) / h;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    let bgX = 40 + 20 * X;
    let bgY = 40 + 20 * Y;

    document.documentElement.style.setProperty("--x", 100 * X + "%");
    document.documentElement.style.setProperty("--y", 100 * Y + "%");

    document.documentElement.style.setProperty("--bg-x", bgX + "%");
    document.documentElement.style.setProperty("--bg-y", bgY + "%");

    document.documentElement.style.setProperty("--r-x", rX + "deg");
    document.documentElement.style.setProperty("--r-y", rY + "deg");
  }
});

function resetTilt() {
  document.documentElement.style.setProperty("--r-x", "0deg");
  document.documentElement.style.setProperty("--r-y", "0deg");
}

// Function to start the shaking animation
function startShaking() {
  const cardLayerProfile = document.querySelector(".card__layerProfile");
  cardLayerProfile.classList.add("shaking");
  setTimeout(() => {
    stopShaking(); // Pause and reset the animation
    setTimeout(() => {
      startShaking(); // Start the animation again after 10 seconds
    }, 10000);
  }, 5000); // Pause after 5 seconds
}

// Function to start the interval
function startAnimationCycle() {
  startShaking(); // Start the animation initially

  setInterval(() => {
    stopShaking(); // Pause and reset the animation
    setTimeout(() => {
      startShaking(); // Start the animation again after 5 seconds
    }, 5000);
  }, 10000); // Repeat the cycle every 10 seconds (5 seconds of shaking and 5 seconds of pause)
}

// Start the animation cycle
startAnimationCycle();

// Function to stop the shaking animation and reset to the original position
function stopShaking() {
  const cardLayerProfile = document.querySelector(".card__layerProfile");
  cardLayerProfile.classList.remove("shaking");

  // Reset the card's position to its original state
  cardLayerProfile.style.transform = "translateX(0)";
}











