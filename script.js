const API_URL = "https://dummyjson.com/products";

const productsContainer = document.getElementById("products");
const loader = document.getElementById("loader");

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const products = data.products;

    displayProducts(products);

    loader.style.display = "none";

  } catch (error) {
    loader.innerText = "Failed to load products";
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: ₹${product.price}</p>
      <p>Rating: ⭐ ${product.rating}</p>
    </div>
  `).join("");
}

fetchProducts();