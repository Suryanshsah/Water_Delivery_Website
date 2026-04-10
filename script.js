// ================= FIREBASE =================

// Import Firebase (MODERN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔑 PUT YOUR CONFIG HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrSkLazeBfPdNhcfz2d1FGbbW_9d8f9oo",
  authDomain: "water-delivery-df7c5.firebaseapp.com",
  projectId: "water-delivery-df7c5",
  storageBucket: "water-delivery-df7c5.firebasestorage.app",
  messagingSenderId: "1023725230397",
  appId: "1:1023725230397:web:567203a2b10ef3c94c8d54",
  measurementId: "G-B7QQYBYJVW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// 🔐 LOGIN FUNCTION (GLOBAL)
window.loginWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Show name
      const nameEl = document.querySelector(".greeting h1");
      if (nameEl) nameEl.innerText = user.displayName;

      // Save for later
      localStorage.setItem("userName", user.displayName);

      alert("Logged in as " + user.displayName);
    })
    .catch((error) => {
  console.error("FULL ERROR:", error);
  alert(error.message);
});
};


// ================= DARK MODE =================

window.addEventListener("DOMContentLoaded", () => {
  let savedAddress = localStorage.getItem("address");
let locationEl = document.getElementById("userLocation");

if (savedAddress && locationEl) {
  // Show only first part (clean UI)
  let shortAddress = savedAddress.split(",")[0];
  locationEl.innerText = shortAddress;
}

  // DARK MODE
  const toggle = document.getElementById("darkToggle");

  if (toggle) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // 🔥 LOAD USER NAME
 

  if (savedName) {
    const nameEl = document.querySelector(".greeting h1");
    if (nameEl) nameEl.innerText = savedName;
  }

});


// ================= ORDER LOGIC =================

let quantity = 1;
let pricePerJar = 30;

// Increase quantity
window.increaseQty = function () {
  quantity++;
  updateUI();
};

// Decrease quantity
window.decreaseQty = function () {
  if (quantity > 1) {
    quantity--;
    updateUI();
  }
};

// Update UI
function updateUI() {
  const qtyEl = document.getElementById("qty");
  const priceEl = document.getElementById("price");

  if (qtyEl) qtyEl.innerText = quantity;
  if (priceEl) priceEl.innerText = quantity * pricePerJar;
}

// Select slot
window.selectSlot = function (btn) {
  let buttons = document.querySelectorAll(".slots button");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
};

// Go to details page
window.goToDetails = function () {
  let selectedSlot = document.querySelector(".slots .active");

  if (!selectedSlot) {
    alert("Please select a delivery slot!");
    return;
  }

  localStorage.setItem("quantity", quantity);
  localStorage.setItem("slot", selectedSlot.innerText);

  window.location.href = "details.html";
};
window.goToAddress = function () {
  window.location.href = "address.html";
};