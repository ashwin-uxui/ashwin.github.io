const screens = document.querySelectorAll(".screen");
const uploadStatus = document.getElementById("uploadStatus");
const analyzeBtn = document.getElementById("analyzeBtn");

let uploaded = false;

/* Navigation */
function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToUpload() {
  showScreen("upload");
}

function goHome() {
  showScreen("splash");
}

/* Upload */
function handleUpload() {
  uploadStatus.innerHTML = "✅ Screenshot uploaded successfully";
  uploaded = true;
  analyzeBtn.disabled = false;
}

/* Fake AI analysis */
function analyzeProfile() {
  uploadStatus.innerHTML = "⏳ Analyzing profile...";
  setTimeout(() => {
    showScreen("result");
    initScratch();
  }, 1500);
}

/* Scratch card */
function initScratch() {
  const canvas = document.getElementById("scratchCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 260;
  canvas.height = 260;

  ctx.fillStyle = "#999";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let scratching = false;

  canvas.addEventListener("mousedown", () => scratching = true);
  canvas.addEventListener("mouseup", () => scratching = false);
  canvas.addEventListener("mousemove", scratch);

  canvas.addEventListener("touchstart", () => scratching = true);
  canvas.addEventListener("touchend", () => scratching = false);
  canvas.addEventListener("touchmove", scratch);

  function scratch(e) {
    if (!scratching) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* Share */
function shareScore() {
  alert("📲 Instagram sharing works on mobile PWA");
}

/* PWA */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
