document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
      }
    });
    
    // Close menu when clicking on menu items
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

  // Typing animation for homepage
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const text = "Beautiful. Minimalistic. Easy to Buy.";
    const subline = document.querySelector(".subline");
    let index = 0;

    function typeLetter() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeLetter, 250);
      } else {
        // Show subline after typing effect is complete
        if (subline) {
          subline.classList.add("show");
        }
      }
    }

    typeLetter();
  }
});

// Scroll animation for assembly pieces
window.addEventListener("scroll", () => {
  const parts = document.querySelectorAll(".piece");
  if (parts.length === 0) return;
  
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;

  parts.forEach((part, i) => {
    const revealPoint = windowHeight * (0.3 + i * 0.2);
    if (scrollTop > revealPoint) {
      part.classList.add("show");
    } else {
      part.classList.remove("show");
    }
  });
});

//window.addEventListener("scroll", () => {
//  const parts = document.querySelectorAll(".piece");
//  const scrollTop = window.pageYOffset;

//  parts.forEach((part, i) => {
//    const revealPoint = window.innerHeight * (0.3 + i * 0.3);
//    if (scrollTop > revealPoint) {
//      part.classList.add("show");
//    } else {
//      part.classList.remove("show");
//    }
//  });
//});

// Shopping cart functionality
function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Show confirmation
  showNotification(`${name} added to cart!`);
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    z-index: 10000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const total = document.getElementById("total-price");
  
  if (!container || !total) return;

  container.innerHTML = "";
  let sum = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
  } else {
    cart.forEach((item, index) => {
      sum += item.price;
      container.innerHTML += `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong><br>
            <span style="color: #666;">R${item.price}</span>
          </div>
          <button onclick="removeFromCart(${index})" style="background: #dc3545; max-width: 100px;">Remove</button>
        </div>
      `;
    });
  }

  total.textContent = "Total: R" + sum;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems(); // Reload the cart display
  showNotification("Item removed from cart");
}

function loadCartItemsCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items");
  const total = document.getElementById("checkout-total");
  
  if (!container || !total) return;

  container.innerHTML = "";
  let sum = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 1rem; color: #666;">No items in cart</p>';
  } else {
    cart.forEach((item) => {
      sum += item.price;
      container.innerHTML += `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>R${item.price}</span>
        </div>
      `;
    });
  }

  total.textContent = "Total: R" + sum;
}

function handleCheckout(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;

  if (!name || !address || !email) {
    alert("Please fill in all fields");
    return;
  }

  alert(`Thank you ${name}! Your order has been placed and will be delivered to ${address}.`);
  localStorage.removeItem("cart");
  window.location.href = "../index.html";
}

// Load cart items when page loads
if (document.getElementById("cart-items")) {
  loadCartItems();
}

// Handle touch events for mobile
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', function() {}, false);
}
