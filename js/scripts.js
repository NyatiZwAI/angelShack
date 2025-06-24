window.addEventListener("scroll", () => {
  const parts = document.querySelectorAll(".piece");
  const scrollTop = window.pageYOffset;

  parts.forEach((part, i) => {
    const revealPoint = window.innerHeight * (0.3 + i * 0.3);
    if (scrollTop > revealPoint) {
      part.classList.add("show");
    } else {
      part.classList.remove("show");
    }
  });
});
