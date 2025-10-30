const loginBtn = document.getElementById("login-btn");
const loginContainer = document.getElementById("login-container");
const profile = document.getElementById("profile");
const displayUsername = document.getElementById("display-username");
const profileIcon = document.getElementById("profile-icon");
const reportSection = document.getElementById("report-section");
const reportBtn = document.getElementById("report-btn");
const reportBox = document.getElementById("report-box");
const reportText = document.getElementById("report-text");
const sendReport = document.getElementById("send-report");

// Cek kalau sudah login sebelumnya
window.onload = () => {
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");
  if (savedUser && savedPass) {
    showProfile(savedUser);
  }
};

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Isi username dan password dulu!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  showProfile(username);
});

function showProfile(username) {
  loginContainer.style.display = "none";
  profile.style.display = "flex";
  reportSection.style.display = "flex";
  displayUsername.textContent = username;
  profileIcon.textContent = username.charAt(0).toUpperCase();
}

// Saat klik tombol REPORT TO ADMIN
reportBtn.addEventListener("click", () => {
  reportSection.style.display = "none";
  profile.style.display = "none";
  reportBox.style.display = "flex";
});

// Saat kirim laporan
sendReport.addEventListener("click", async () => {
  const message = reportText.value.trim();
  const username = localStorage.getItem("username") || "Unknown";

  if (!message) {
    alert("Isi dulu pesannya!");
    return;
  }

  try {
    await fetch("http://localhost:5000/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message })
    });

    alert("Laporan berhasil dikirim ke admin!");
    reportText.value = "";
  } catch (error) {
    alert("Gagal kirim laporan (server belum aktif).");
  }
});