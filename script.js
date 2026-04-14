const API = "https://dummyjson.com/products?limit=300";

let allProducts = [];

/* ELEMENTS */
const container = document.getElementById("products");
const stats = document.getElementById("productStats");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

/* LOADING */
if (container) {
  container.innerHTML = "<p>Loading products...</p>";
}

/* FETCH DATA */
Promise.all([
  fetch(API).then(res => res.json()),
  fetch("https://dummyjson.com/products/category-list").then(res => res.json())
])
.then(([productData, categories]) => {

  allProducts = productData.products;

  /* LOAD CATEGORIES */
  if (categorySelect) {
    categorySelect.innerHTML =
      `<option value="all">All Categories</option>` +
      categories.map(c => `<option value="${c}">${c}</option>`).join("");
  }

  renderProducts(allProducts);
})
.catch(() => {
  if (container) {
    container.innerHTML = "<p>❌ Failed to load products</p>";
  }
});

/* RENDER */
function renderProducts(products) {
  if (!container) return;

  /* STATS */
  if (stats) {
    stats.textContent = `Showing ${products.length} products`;
  }
  
  /* NO RESULT */
  if (products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  container.innerHTML = products.map(p => {

    const stars = "⭐".repeat(Math.round(p.rating));

    return `
    <div class="card">

      <div class="card-img">
        <img src="${p.thumbnail}">
      </div>

      <div class="card-body">

        <span class="badge">${p.category}</span>

        <h3>${p.title}</h3>

        <p class="desc">${p.description.slice(0, 60)}...</p>

        <p class="rating">${stars} (${p.rating})</p>

        <div class="card-footer">
          <span class="price">₹${p.price}</span>
        </div>

      </div>

    </div>
    `;
  }).join("");
}

function applyFilters() {
  let filtered = [...allProducts];

  const search = searchInput?.value.toLowerCase();
  const category = categorySelect?.value;
  const sort = sortSelect?.value;

  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

searchInput?.addEventListener("input", applyFilters);
categorySelect?.addEventListener("change", applyFilters);
sortSelect?.addEventListener("change", applyFilters);

function handleLogin() {
  const email = document.getElementById("email")?.value;

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (pattern.test(email)) {
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Enter valid email");
  }
}

function goToShop() {
  window.location.href = "shop.html";
}