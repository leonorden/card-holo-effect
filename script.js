$(document).ready(function() {

  const $el = $(".card");
  const $cardLayerProfile = $(".card__layerProfile");

  let w = $el.width();
  let h = $el.height();
  let b = $el[0].getBoundingClientRect();
  let isHovering = false;

  $el.on("mouseenter", function() {
    isHovering = true;
  });

  $el.on("mouseleave", function() {
    isHovering = false;
    resetTilt();
  });

  $el.on("mousemove", function(e) {
    if (isHovering) {
      let X = (e.clientX - b.left) / w;
      let Y = (e.clientY - b.top) / h;

      let rX = -(X - 0.5) * 26;
      let rY = (Y - 0.5) * 26;

      let bgX = 40 + 20 * X;
      let bgY = 40 + 20 * Y;

      // Set the card's style properties
      $el.css("--x", 100 * X + "%");
      $el.css("--y", 100 * Y + "%");
      $el.css("--bg-x", bgX + "%");
      $el.css("--bg-y", bgY + "%");
      $el.css("--r-x", rX + "deg");
      $el.css("--r-y", rY + "deg");
    }
  });

  function resetTilt() {
    // Reset the card's style properties to their default values
    $el.css("--x", "50%");
    $el.css("--y", "50%");
    $el.css("--bg-x", "50%");
    $el.css("--bg-y", "50%");
    $el.css("--r-x", "0deg");
    $el.css("--r-y", "0deg");
  }

  function startSwinging() {
    $cardLayerProfile.css("animation", "swing 5s ease infinite");
  }

  function stopSwinging() {
    $cardLayerProfile.css("animation", "none");
    $cardLayerProfile.css("transform", "translateX(0)"); // Reset the transform property
  }
  
  function startAnimationCycle() {
    startSwinging();
    setTimeout(function() {
      stopSwinging();
      setTimeout(startSwinging, 5000); // Start swinging again after a pause of 5 seconds
    }, 5000); // Swing for 5 seconds, then pause for 5 seconds
  }

  // Start the animation cycle
  startAnimationCycle();

});


 

