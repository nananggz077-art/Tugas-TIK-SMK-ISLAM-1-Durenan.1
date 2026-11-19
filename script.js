// Data Menu
const menuData = [
    {
        id: 1,
        name: "Nasi Goreng Spesial",
        category: "makanan",
        price: 22000,
        desc: "Nasi goreng dengan telur mata sapi, suwiran ayam, dan kerupuk.",
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Ayam Bakar Madu",
        category: "makanan",
        price: 28000,
        desc: "Ayam bakar bumbu madu lengkap dengan nasi hangat, lalapan, dan sambal.",
        img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Mie Ayam Bakso",
        category: "makanan",
        price: 18000,
        desc: "Mie kenyal dengan topping ayam kecap manis dan 2 butir bakso sapi.",
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Sate Ayam Madura",
        category: "makanan",
        price: 25000,
        desc: "10 tusuk sate ayam empuk disiram bumbu kacang kental dan lontong.",
        img: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Es Teh Manis",
        category: "minuman",
        price: 5000,
        desc: "Teh melati seduh segar dengan es batu kristal.",
        img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Es Jeruk Peras",
        category: "minuman",
        price: 8000,
        desc: "Perasan jeruk murni menyegarkan kaya vitamin C.",
        img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Kentang Goreng",
        category: "cemilan",
        price: 12000,
        desc: "Kentang goreng renyah disajikan dengan saus sambal dan mayones.",
        img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Pisang Bakar Cokelat Keju",
        category: "cemilan",
        price: 15000,
        desc: "Pisang raja bakar manis dengan taburan meses cokelat dan keju parut.",
        img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];
let currentCategory = 'semua';

// Format Rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Menampilkan Menu
function renderMenu(items) {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>Menu tidak ditemukan.</p>";
        return;
    }

    items.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <div class="card-body">
                    <div>
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-desc">${item.desc}</p>
                    </div>
                    <div class="card-footer">
                        <span class="price">${formatRupiah(item.price)}</span>
                        <button class="add-btn" onclick="addToCart(${item.id})">+ Tambah</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter Kategori
function filterMenu(category, btn) {
    currentCategory = category;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
}

// Pencarian
function searchMenu() {
    applyFilters();
}

function applyFilters() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = menuData.filter(item => {
        const matchCat = currentCategory === 'semua' || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(keyword);
        return matchCat && matchSearch;
    });
    renderMenu(filtered);
}

// Tambah ke Keranjang
function addToCart(id) {
    const item = menuData.find(m => m.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
}

// Ubah Jumlah Item
function changeQty(id, delta) {
    const index = cart.findIndex(c => c.id === id);
    if (index !== -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

// Update Tampilan Keranjang
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let totalQty = 0;
    let totalPrice = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #777;">Keranjang masih kosong.</p>';
    } else {
        cart.forEach(item => {
            totalQty += item.qty;
            totalPrice += item.price * item.qty;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${formatRupiah(item.price)}</small>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    cartCount.innerText = totalQty;
    cartTotal.innerText = formatRupiah(totalPrice);
}

// Buka/Tutup Modal Keranjang
function toggleCart() {
    const modal = document.getElementById("cartModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Proses Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !address) {
        alert("Harap isi Nama Pemesan dan Nomor Meja / Alamat!");
        return;
    }

    let detailPesanan = cart.map(item => `- ${item.name} (${item.qty}x)`).join("\n");
    let total = document.getElementById("cart-total").innerText;

    alert(`Terima kasih, ${name}!\n\nPesanan Anda telah diterima:\n${detailPesanan}\n\nTotal: ${total}\nTujuan: ${address}`);

    // Reset keranjang setelah pesan
    cart = [];
    document.getElementById("customerName").value = "";
    document.getElementById("customerAddress").value = "";
    updateCartUI();
    toggleCart();
}

// Inisialisasi awal
renderMenu(menuData);
