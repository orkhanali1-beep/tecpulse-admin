// ── STATE ──
let currentPage = 'dashboard';
let products = [
  { id: 1, name: 'iPhone 15 Pro Max', cat: 'Telefon', price: 2499, oldPrice: 2699, stock: 12, status: 'active', emoji: '📱', brand: 'Apple', sold: 48 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', cat: 'Telefon', price: 1999, oldPrice: 2199, stock: 3, status: 'active', emoji: '📱', brand: 'Samsung', sold: 31 },
  { id: 3, name: 'MacBook Air M3', cat: 'Noutbuk', price: 2199, oldPrice: 2399, stock: 8, status: 'active', emoji: '💻', brand: 'Apple', sold: 19 },
  { id: 4, name: 'AirPods Pro 2', cat: 'Qulaqlıq', price: 499, oldPrice: 549, stock: 0, status: 'inactive', emoji: '🎧', brand: 'Apple', sold: 62 },
  { id: 5, name: 'iPad Pro 12.9"', cat: 'Tablet', price: 1599, oldPrice: 1749, stock: 5, status: 'active', emoji: '📲', brand: 'Apple', sold: 14 },
  { id: 6, name: 'Sony WH-1000XM5', cat: 'Qulaqlıq', price: 649, oldPrice: 699, stock: 2, status: 'active', emoji: '🎧', brand: 'Sony', sold: 27 },
  { id: 7, name: 'Google Pixel 8 Pro', cat: 'Telefon', price: 1299, oldPrice: 1399, stock: 9, status: 'active', emoji: '📱', brand: 'Google', sold: 11 },
  { id: 8, name: 'Dell XPS 15', cat: 'Noutbuk', price: 2899, oldPrice: 3099, stock: 4, status: 'active', emoji: '💻', brand: 'Dell', sold: 7 },
];

let orders = [
  { id: 'TP-001', customer: 'Əli Həsənov', phone: '+994501234567', city: 'Bakı', items: 'iPhone 15 Pro Max', amount: 2499, status: 'delivered', date: '23.09.2026', step: 4 },
  { id: 'TP-002', customer: 'Nigar Məmmədova', phone: '+994552345678', city: 'Gəncə', items: 'AirPods Pro 2', amount: 499, status: 'shipping', date: '23.09.2026', step: 3 },
  { id: 'TP-003', customer: 'Rauf Əliyev', phone: '+994703456789', city: 'Sumqayıt', items: 'MacBook Air M3', amount: 2199, status: 'processing', date: '22.09.2026', step: 2 },
  { id: 'TP-004', customer: 'Sevinc Quliyeva', phone: '+994774567890', city: 'Bakı', items: 'Samsung Galaxy S24', amount: 1999, status: 'new', date: '22.09.2026', step: 1 },
  { id: 'TP-005', customer: 'Tural Hüseynov', phone: '+994515678901', city: 'Lənkəran', items: 'iPad Pro 12.9"', amount: 1599, status: 'delivered', date: '21.09.2026', step: 4 },
  { id: 'TP-006', customer: 'Aytən Babayeva', phone: '+994506789012', city: 'Bakı', items: 'Sony WH-1000XM5', amount: 649, status: 'cancelled', date: '21.09.2026', step: 0 },
];

let customers = [
  { id: 1, name: 'Əli Həsənov', email: 'ali@mail.az', city: 'Bakı', orders: 5, total: 7840, avatar: '#6c63ff' },
  { id: 2, name: 'Nigar Məmmədova', email: 'nigar@mail.az', city: 'Gəncə', orders: 3, total: 3210, avatar: '#ff6584' },
  { id: 3, name: 'Rauf Əliyev', email: 'rauf@mail.az', city: 'Sumqayıt', orders: 2, total: 4398, avatar: '#22c55e' },
  { id: 4, name: 'Sevinc Quliyeva', email: 'sevinc@mail.az', city: 'Bakı', orders: 7, total: 9920, avatar: '#f59e0b' },
  { id: 5, name: 'Tural Hüseynov', email: 'tural@mail.az', city: 'Lənkəran', orders: 1, total: 1599, avatar: '#3b82f6' },
  { id: 6, name: 'Aytən Babayeva', email: 'ayten@mail.az', city: 'Bakı', orders: 4, total: 5230, avatar: '#8b5cf6' },
];

let editingProductId = null;
let activeProductFilter = 'all';

const chartData = {
  labels: ['Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen'],
  values: [3200, 4100, 6800, 3900, 4500, 5200, 4800, 6100, 5700, 7200, 6600, 8900],
};

// ── NAVIGATION ──
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');

  const navEl = document.querySelector('[data-page="' + page + '"]');
  if (navEl) navEl.classList.add('active');

  currentPage = page;

  // Update topbar title
  const titles = {
    dashboard: ['📊 Dashboard', 'Ümumi baxış'],
    products: ['📦 Məhsullar', 'Stok idarəsi'],
    orders: ['🛍️ Sifarişlər', 'Sifariş idarəsi'],
    customers: ['👥 Müştərilər', 'Müştəri bazası'],
    categories: ['🏷️ Kateqoriyalar', 'Kateqoriya idarəsi'],
    settings: ['⚙️ Ayarlar', 'Sistem tənzimləmələri'],
  };

  const t = titles[page] || ['TecPulse Admin', ''];
  document.getElementById('topbar-title').textContent = t[0];
  document.getElementById('topbar-subtitle').textContent = t[1];

  closeSidebar();

  if (page === 'products') renderProducts();
  if (page === 'orders') renderOrders();
  if (page === 'customers') renderCustomers();
}

// ── SIDEBAR MOBILE ──
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ── DASHBOARD CHART ──
function renderChart() {
  const wrap = document.getElementById('chartBars');
  if (!wrap) return;
  const max = Math.max(...chartData.values);
  wrap.innerHTML = chartData.labels.map((label, i) => {
    const h = Math.round((chartData.values[i] / max) * 130);
    return `<div class="chart-bar-wrap">
      <div class="chart-bar" style="height:${h}px" title="${chartData.values[i]} ₼"></div>
      <span class="chart-bar-label">${label}</span>
    </div>`;
  }).join('');
}

// ── DONUT CHART ──
function renderDonut() {
  const data = [
    { label: 'Telefon', pct: 52, color: '#6c63ff' },
    { label: 'Noutbuk', pct: 23, color: '#ff6584' },
    { label: 'Qulaqlıq', pct: 15, color: '#22c55e' },
    { label: 'Tablet', pct: 10, color: '#f59e0b' },
  ];

  const r = 54; const cx = 70; const cy = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  let paths = '';

  data.forEach(d => {
    const dash = (d.pct / 100) * circ;
    paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="16"
      stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${-offset}" />`;
    offset += dash;
  });

  document.getElementById('donutSvg').innerHTML = paths;

  document.getElementById('donutLegend').innerHTML = data.map(d =>
    `<div class="legend-item">
      <div class="legend-dot" style="background:${d.color}"></div>
      <span class="legend-name">${d.label}</span>
      <span class="legend-pct">${d.pct}%</span>
    </div>`
  ).join('');
}

// ── PRODUCTS ──
function renderProducts() {
  const tbody = document.getElementById('productsBody');
  if (!tbody) return;

  let filtered = products;
  if (activeProductFilter === 'active') filtered = products.filter(p => p.status === 'active');
  if (activeProductFilter === 'inactive') filtered = products.filter(p => p.status === 'inactive');
  if (activeProductFilter === 'low') filtered = products.filter(p => p.stock <= 3 && p.stock > 0);
  if (activeProductFilter === 'out') filtered = products.filter(p => p.stock === 0);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📭</div><h3>Məhsul tapılmadı</h3></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const stockBadge = p.stock === 0
      ? `<span class="badge badge-danger">Bitmişdir</span>`
      : p.stock <= 3
        ? `<span class="badge badge-warning">⚠️ ${p.stock} ədəd</span>`
        : `<span class="badge badge-success">${p.stock} ədəd</span>`;

    const statusBadge = p.status === 'active'
      ? `<span class="badge badge-success">Aktiv</span>`
      : `<span class="badge badge-gray">Deaktiv</span>`;

    return `<tr>
      <td>
        <div class="product-cell">
          <div class="product-emoji">${p.emoji}</div>
          <div>
            <div class="product-name">${p.name}</div>
            <div class="product-cat">${p.brand} · ${p.cat}</div>
          </div>
        </div>
      </td>
      <td><strong>${p.price.toLocaleString()} ₼</strong><br><span class="text-muted" style="text-decoration:line-through">${p.oldPrice.toLocaleString()} ₼</span></td>
      <td>${stockBadge}</td>
      <td>${statusBadge}</td>
      <td><span class="text-muted">${p.sold} satış</span></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm btn-icon" onclick="editProduct(${p.id})" title="Redaktə">✏️</button>
          <button class="btn btn-danger-outline btn-sm btn-icon" onclick="deleteProduct(${p.id})" title="Sil">🗑️</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterProducts(tab) {
  activeProductFilter = tab;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderProducts();
}

function openAddProduct() {
  editingProductId = null;
  document.getElementById('modalTitle').textContent = '➕ Yeni Məhsul';
  document.getElementById('prodForm').reset();
  document.getElementById('productModal').classList.add('open');
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('modalTitle').textContent = '✏️ Məhsulu Redaktə Et';
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCat').value = p.cat;
  document.getElementById('prodBrand').value = p.brand;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodOldPrice').value = p.oldPrice;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodEmoji').value = p.emoji;
  document.getElementById('prodStatus').value = p.status;
  document.getElementById('productModal').classList.add('open');
}

function saveProduct() {
  const name = document.getElementById('prodName').value.trim();
  const price = parseFloat(document.getElementById('prodPrice').value);
  if (!name || !price) { showToast('❌ Ad və qiymət mütləqdir', 'error'); return; }

  const data = {
    name,
    cat: document.getElementById('prodCat').value,
    brand: document.getElementById('prodBrand').value.trim() || 'Digər',
    price,
    oldPrice: parseFloat(document.getElementById('prodOldPrice').value) || price,
    stock: parseInt(document.getElementById('prodStock').value) || 0,
    emoji: document.getElementById('prodEmoji').value || '📦',
    status: document.getElementById('prodStatus').value,
    sold: 0,
  };

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    products[idx] = { ...products[idx], ...data };
    showToast('✅ Məhsul yeniləndi', 'success');
  } else {
    data.id = Date.now();
    products.unshift(data);
    showToast('✅ Məhsul əlavə edildi', 'success');
  }

  closeModal('productModal');
  renderProducts();
  updateDashboardStats();
}

function deleteProduct(id) {
  if (!confirm('Bu məhsulu silmək istəyirsiniz?')) return;
  products = products.filter(p => p.id !== id);
  renderProducts();
  updateDashboardStats();
  showToast('🗑️ Məhsul silindi');
}

// ── ORDERS ──
const orderStatusMap = {
  new: { label: 'Yeni', badge: 'badge-info' },
  processing: { label: 'Hazırlanır', badge: 'badge-warning' },
  shipping: { label: 'Göndərilib', badge: 'badge-purple' },
  delivered: { label: 'Çatdırılıb', badge: 'badge-success' },
  cancelled: { label: 'Ləğv edilib', badge: 'badge-danger' },
};

function renderOrders() {
  const tbody = document.getElementById('ordersBody');
  if (!tbody) return;

  tbody.innerHTML = orders.map(o => {
    const s = orderStatusMap[o.status] || { label: o.status, badge: 'badge-gray' };
    return `<tr>
      <td><strong>${o.id}</strong></td>
      <td>
        <div class="fw-700">${o.customer}</div>
        <div class="text-muted">${o.city} · ${o.phone}</div>
      </td>
      <td>${o.items}</td>
      <td><strong>${o.amount.toLocaleString()} ₼</strong></td>
      <td><span class="badge ${s.badge}">${s.label}</span></td>
      <td class="text-muted">${o.date}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewOrder('${o.id}')">🔍 Bax</button>
      </td>
    </tr>`;
  }).join('');
}

function viewOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;

  const steps = ['Yeni', 'Hazırlanır', 'Göndərilib', 'Çatdırılıb'];
  const stepHtml = o.status === 'cancelled'
    ? `<div class="badge badge-danger" style="font-size:14px;padding:10px 20px">❌ Sifariş ləğv edilib</div>`
    : steps.map((s, i) => {
        const cls = i < o.step ? 'done' : i === o.step - 1 ? 'active' : '';
        const icon = i < o.step ? '✓' : (i + 1);
        return `<div class="step ${cls}"><div class="step-dot">${icon}</div><div class="step-label">${s}</div></div>`;
      }).join('');

  document.getElementById('orderDetail').innerHTML = `
    <div style="margin-bottom:20px">
      <div class="flex justify-between items-center mb-3">
        <div>
          <div class="fw-700" style="font-size:18px">${o.id}</div>
          <div class="text-muted">${o.date}</div>
        </div>
        <span class="badge ${(orderStatusMap[o.status] || {}).badge || 'badge-gray'}" style="font-size:13px;padding:7px 14px">
          ${(orderStatusMap[o.status] || {}).label || o.status}
        </span>
      </div>
      <div class="order-stepper" style="${o.status === 'cancelled' ? 'justify-content:center' : ''}">${stepHtml}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div class="card" style="border:none;background:var(--bg)">
        <div class="card-body" style="padding:14px">
          <div class="text-muted mb-3">👤 Müştəri</div>
          <div class="fw-700">${o.customer}</div>
          <div class="text-muted">${o.phone}</div>
          <div class="text-muted">${o.city}</div>
        </div>
      </div>
      <div class="card" style="border:none;background:var(--bg)">
        <div class="card-body" style="padding:14px">
          <div class="text-muted mb-3">📦 Sifariş</div>
          <div class="fw-700">${o.items}</div>
          <div class="fw-700" style="color:var(--primary);font-size:18px;margin-top:6px">${o.amount.toLocaleString()} ₼</div>
        </div>
      </div>
    </div>
    ${o.status !== 'delivered' && o.status !== 'cancelled' ? `
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" onclick="advanceOrder('${o.id}')">⬆️ Növbəti mərhələ</button>
      <button class="btn btn-danger-outline" onclick="cancelOrder('${o.id}')">❌ Ləğv et</button>
    </div>` : ''}
  `;

  document.getElementById('orderModal').classList.add('open');
}

function advanceOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  const steps = ['new', 'processing', 'shipping', 'delivered'];
  const idx = steps.indexOf(o.status);
  if (idx < steps.length - 1) {
    o.status = steps[idx + 1];
    o.step = idx + 2;
    showToast('✅ Status yeniləndi', 'success');
    closeModal('orderModal');
    renderOrders();
    viewOrder(id);
  }
}

function cancelOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  o.status = 'cancelled';
  o.step = 0;
  showToast('❌ Sifariş ləğv edildi', 'error');
  closeModal('orderModal');
  renderOrders();
  viewOrder(id);
}

// ── CUSTOMERS ──
function renderCustomers() {
  const el = document.getElementById('customersList');
  if (!el) return;
  el.innerHTML = customers.map(c => `
    <div class="customer-card">
      <div class="customer-avatar" style="background:${c.avatar}">${c.name[0]}</div>
      <div class="customer-info">
        <div class="customer-name">${c.name}</div>
        <div class="customer-meta">${c.email} · ${c.city}</div>
      </div>
      <div class="customer-stats">
        <div class="customer-amount">${c.total.toLocaleString()} ₼</div>
        <div class="customer-orders">${c.orders} sifariş</div>
      </div>
    </div>
  `).join('');
}

// ── DASHBOARD STATS ──
function updateDashboardStats() {
  const totalRevenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.amount, 0);
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const el = id => document.getElementById(id);
  if (el('statRevenue')) el('statRevenue').textContent = totalRevenue.toLocaleString() + ' ₼';
  if (el('statOrders')) el('statOrders').textContent = activeOrders;
  if (el('statProducts')) el('statProducts').textContent = totalProducts;
  if (el('statCustomers')) el('statCustomers').textContent = totalCustomers;
}

// ── RECENT ORDERS (dashboard) ──
function renderRecentOrders() {
  const el = document.getElementById('recentOrders');
  if (!el) return;
  const recent = orders.slice(0, 5);
  el.innerHTML = recent.map(o => {
    const s = orderStatusMap[o.status] || { label: o.status, badge: 'badge-gray' };
    return `<tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td>${o.items}</td>
      <td><strong>${o.amount.toLocaleString()} ₼</strong></td>
      <td><span class="badge ${s.badge}">${s.label}</span></td>
    </tr>`;
  }).join('');
}

// ── TOP PRODUCTS (dashboard) ──
function renderTopProducts() {
  const el = document.getElementById('topProducts');
  if (!el) return;
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  el.innerHTML = top.map((p, i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:13px;font-weight:700;color:var(--text-muted);width:20px">#${i + 1}</span>
      <span style="font-size:22px">${p.emoji}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
        <div class="text-muted">${p.cat}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-weight:700;color:var(--primary)">${p.sold} satış</div>
        <div class="text-muted">${p.price.toLocaleString()} ₼</div>
      </div>
    </div>
  `).join('');
}

// ── MODAL ──
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ── TOAST ──
function showToast(msg, type = '') {
  const tc = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  tc.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── SEARCH ──
function handleSearch(q) {
  if (!q.trim()) return;
  showToast('🔍 Axtarış: ' + q);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  goTo('dashboard');
  renderChart();
  renderDonut();
  updateDashboardStats();
  renderRecentOrders();
  renderTopProducts();

  // Nav click
  document.querySelectorAll('.nav-item[data-page]').forEach(btn => {
    btn.addEventListener('click', () => goTo(btn.dataset.page));
  });

  // Sidebar toggle
  document.getElementById('menuToggle').addEventListener('click', openSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

  // Search
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch(e.target.value);
  });

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
});