const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtNgnf2vdZD5NkOpZwsvPw7DfiKxJ6oRxAKQXLh5bUG3GijfrKpwFGyEJqq5Mc3P5LGRG1miO0-TO4/pub?gid=0&single=true&output=csv";

let products = [];

async function loadProducts() {
  try {
    const res = await fetch(SHEET_URL);
    const data = await res.text();
    const rows = data.split("\n").slice(1);

    products = rows.map(row => {
      const cols = row.split(",");
      return {
        produk: cols[0]?.trim(),
        durasi: cols[1]?.trim(),
        harga: cols[2]?.trim(),
        stok: cols[3]?.trim(),
        kategori: cols[4]?.trim().toLowerCase(),
        gambar: cols[5]?.trim(),
        deskripsi: cols[6]?.trim()
      };
    }).filter(p => p.produk);

    displayCategories();
  } catch (err) {
    console.error("Gagal load data:", err);
    document.getElementById("product-list").innerHTML = "<p>Gagal memuat produk. Cek link sheet</p>";
  }
}

function displayCategories() {
  const categories = [...new Set(products.map(p => p.kategori))];
  const categoryButtons = document.getElementById("category-buttons");
  categoryButtons.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat.toUpperCase();
    btn.onclick = () => showProducts(cat);
    categoryButtons.appendChild(btn);
  });

  if(categories.length > 0) showProducts(categories[0]);
}

function showProducts(category) {
  const productList = document.getElementById("product-list");
  const filtered = products.filter(p => p.kategori === category);

  if(filtered.length === 0){
    productList.innerHTML = "<p>Produk kosong</p>";
    return;
  }

  productList.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.gambar || 'https://i.ibb.co.com/2kRz8wB/no-image.png'}" alt="${p.produk}">
      <h3>${p.produk}</h3>
      <p>Durasi: ${p.durasi}</p>
      <p>Harga: Rp ${Number(p.harga).toLocaleString('id-ID')}</p>
      <p>Stok: ${p.stok}</p>
      <p>${p.deskripsi}</p>
      <button onclick="order('${p.produk}', '${p.durasi}', '${p.harga}')">Beli Sekarang</button>
    </div>
  `).join("");
}

function order(produk, durasi, harga) {
  const wa = `https://wa.me/628xxxxxxxxxx?text=Halo%20bang%20mau%20order%20${encodeURIComponent(produk)}%20${encodeURIComponent(durasi)}%20Rp${harga}`;
  window.open(wa, '_blank');
}

document.addEventListener("DOMContentLoaded", loadProducts);