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

function loadCartItemsCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items");
  const total = document.getElementById("checkout-total");
  if (!container || !total) return;

  container.innerHTML = "";
  let sum = 0;

  cart.forEach((item) => {
    sum += item.price;
    container.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - R${item.price}</span>
      </div>
    `;
  });

  total.textContent = "Total: R" + sum;
}

function handleCheckout(e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;

  if (!name || !address || !email) {
    alert("Please fill in all fields");
    return;
  }

  alert(`Thank you ${name}! Your order has been placed.`);
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
