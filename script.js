document.addEventListener("DOMContentLoaded", function () {
 
  const el = document.querySelector(".card");
  const layer2 = document.querySelector(".card__layer2");
  let w = el.clientWidth;
  let h = el.clientHeight;
  let b = el.getBoundingClientRect();
  let isHovering = false;

  el.addEventListener("mouseenter", () => {
    isHovering = true;
    layer2.classList.add("show-layer2");
  });

  el.addEventListener("mouseleave", () => {
    isHovering = false;
    resetTilt();
    layer2.classList.remove("show-layer2");
  });

  el.addEventListener("mousemove", (e) => {
    if (isHovering) {
      let X = (e.clientX - b.left) / w;
      let Y = (e.clientY - b.top) / h;

      let rX = -(X - 0.5) * 26;
      let rY = (Y - 0.5) * 26;

      let bgX = 40 + 20 * X;
      let bgY = 40 + 20 * Y;

      // Set the card's style properties
      el.style.setProperty("--x", 100 * X + "%");
      el.style.setProperty("--y", 100 * Y + "%");
      el.style.setProperty("--bg-x", bgX + "%");
      el.style.setProperty("--bg-y", bgY + "%");
      el.style.setProperty("--r-x", rX + "deg");
      el.style.setProperty("--r-y", rY + "deg");    
    }
  });

  function resetTilt() {
    // Reset the card's style properties to their default values
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
    el.style.setProperty("--bg-x", "50%");
    el.style.setProperty("--bg-y", "50%");
    el.style.setProperty("--r-x", "0deg");
    el.style.setProperty("--r-y", "0deg");
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

});