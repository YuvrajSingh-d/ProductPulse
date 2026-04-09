const API = "https://dummyjson.com/products?limit=300";

let allProducts = [];


fetch(API)
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;

    const container = document.getElementById("products");

    if (container) {
      container.innerHTML = allProducts.map(p => `
        <div class="card">
          <img src="${p.thumbnail}">
          <h3>${p.title}</h3>
          <p>₹${p.price}</p>
          <p>⭐ ${p.rating}</p>
        </div>
      `).join("");
    }


    const categorySelect = document.getElementById("category");

    if (categorySelect) {
      const categories = [...new Set(allProducts.map(p => p.category))];

      categorySelect.innerHTML += categories.map(c =>
        `<option value="${c}">${c}</option>`
      ).join("");
    }
  });



function applyFilters() {
  let filtered = [...allProducts];

  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;

  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(p =>
      p.category === category
    );
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const container = document.getElementById("products");

  if (container) {
    container.innerHTML = filtered.map(p => `
      <div class="card">
        <img src="${p.thumbnail}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <p>⭐ ${p.rating}</p>
      </div>
    `).join("");
  }
}



let timer;

document.getElementById("search")?.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(applyFilters, 400);
});

document.getElementById("category")?.addEventListener("change", applyFilters);
document.getElementById("sort")?.addEventListener("change", applyFilters);



function goToShop() {
  window.location.href = "shop.html";
}