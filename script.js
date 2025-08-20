const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";
const API_BASE = "http://localhost:3000";

function showDashboard() {
  document.getElementById("admin-login").classList.remove("hidden");
  document.getElementById("admin-dashboard").classList.add("hidden");
}

function adminLogin(e) {
  e.preventDefault();
  const u = document.getElementById("adminUser").value.trim();
  const p = document.getElementById("adminPass").value.trim();
  if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
    document.getElementById("loginError").classList.add("hidden");
    document.getElementById("admin-login").classList.add("hidden");
    document.getElementById("admin-dashboard").classList.remove("hidden");
    loadSummary();
  } else {
    document.getElementById("loginError").classList.remove("hidden");
  }
  return false;
}

async function loadSummary() {
  try {
    const res = await fetch(`${API_BASE}/summary`);
    const data = await res.json();
    document.getElementById("todaySummary").innerText =
      `🌱 Today sold: ${data.todayOrders} | 💰 ₹${data.todayAmount}`;
    document.getElementById("totalSummary").innerText =
      `📦 Total plants: ${data.totalOrders} | 💵 Total sales: ₹${data.totalAmount}`;
  } catch (e) {
    document.getElementById("todaySummary").innerText = "⚠️ Error loading summary";
  }
}
