document.querySelectorAll(".dropdown-toggle-custom").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth < 992) {
      e.preventDefault();

      const menu = this.nextElementSibling;
      menu.classList.toggle("show");
    }
  });
});

const track = document.getElementById("sliderTrack");
let items = Array.from(track.children);
const slideSpeed = 3000;
let autoSlide;

function moveNext() {
  // Only slide if we are in mobile/tablet mode (< 1300px)
  if (window.innerWidth >= 1301) return;

  const itemWidth = items[0].offsetWidth;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${itemWidth}px)`;

  setTimeout(() => {
    track.style.transition = "none";
    track.appendChild(items[0]); // move first card to end
    track.style.transform = "translateX(0)";
    items = Array.from(track.children); // update items array
  }, 500);
}

// Start auto-slide
function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(moveNext, slideSpeed);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Initialize and handle window resizing
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1301) {
    stopAutoSlide();
    track.style.transform = "translateX(0)";
  } else {
    startAutoSlide();
  }
});

// Run on load
if (window.innerWidth < 1301) {
  startAutoSlide();
}
