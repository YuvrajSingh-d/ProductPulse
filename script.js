const API = "https://dummyjson.com/products?limit=50";

async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("products");

  if (container) {
    container.innerHTML = data.products.map(p => `
      <div class="card">
        <img src="${p.thumbnail}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
      </div>
    `).join("");
  }
}

function loadWishlist() {
  const container = document.getElementById("wishlist");
  if (!container) return;

  const list = JSON.parse(localStorage.getItem("wishlist")) || [];

  container.innerHTML = list.map(p => `
    <div class="card">
      <h3>${p.title}</h3>
    </div>
  `).join("");
}

function loadCart() {
  const container = document.getElementById("cart");
  if (!container) return;

  const list = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = list.map(p => `
    <div class="card">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
    </div>
  `).join("");
}

loadProducts();
loadWishlist();
loadCart();


