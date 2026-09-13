function scrollToTop() {
  const ScrollBack = document.querySelector(".gh-scroll-top");
  if (ScrollBack) {
    ScrollBack.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }
}

function footerYear() {
  const yearElement = document.querySelector(".gh-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
