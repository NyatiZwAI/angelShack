//function scrollToProducts() {
//  document.getElementById(products).scrollIntoView({ behavior: smooth });
//}

document.addEventListener('DOMContentLoaded', () => {
  const text = "Beautiful. Minimalistic. Easy to Buy.";
  const target = document.getElementById("typing-text");
  const subline = document.querySelector(".subline");
  let index = 0;

  function typeLetter() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeLetter, 250);
    } else {
      // Show subline after typing effect is complete
      subline.classList.add("show");
    }
  }

  typeLetter();
});

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

