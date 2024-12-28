// Ganti Foto Profile
function openFileInput() {
  document.getElementById("imageUpload").click();
}

function changeProfilePic(event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.querySelector(".profile-image");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
// _________________________________________________________________________
// Fungsi untuk mengganti gambar profil
function changeProfile(imageSrc) {
  const profileImage = document.querySelector(".profile-image");
  profileImage.src = imageSrc;
}

// _________________________________________________________________________
// Memperbesar Foto Profile
function enlargeImage() {
  var modal = document.getElementById("imgModal");
  var modalImg = document.getElementById("modalImg");
  var img = document.querySelector(".profile-image");
  modal.style.display = "block";
  modalImg.src = img.src;
}

function closeModal() {
  var modal = document.getElementById("imgModal");
  modal.style.display = "none";
}
// _________________________________________________________________________
// Menampilkan menu
function toggleMenu() {
  var menu = document.getElementById("menuContent");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleDropdown(event) {
  event.preventDefault();
  var dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

  var dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(function (menu) {
    if (menu !== dropdown) {
      menu.style.display = 'none';
    }
  });

  event.stopPropagation();
}

window.onclick = function (event) {
  if (!event.target.matches('.profile-image') && !event.target.matches('.dropdown-btn')) {
    var dropdowns = document.querySelectorAll(".menu-content, .dropdown-content");
    dropdowns.forEach(function (menu) {
      menu.style.display = "none";
    });
  }
}
// _________________________________________________________________________
// Ganti Username
function editUsername() {
  var usernameSpan = document.querySelector(".username");
  var usernameInput = document.getElementById("usernameInput");
  usernameInput.value = usernameSpan.innerText;
  usernameSpan.style.display = "none";
  usernameInput.style.display = "inline-block";
  usernameInput.focus();
}

function saveUsername() {
  var usernameInput = document.getElementById("usernameInput");
  var usernameSpan = document.querySelector(".username");
  usernameSpan.innerText = usernameInput.value;
  usernameSpan.style.display = "inline-block";
  usernameInput.style.display = "none";
}

function checkEnter(event) {
  if (event.key === "Enter") {
    saveUsername();
  }
}

// Username
function setUsername(newUsername) {
  const usernameElement = document.querySelector(".username");
  usernameElement.textContent = newUsername || "Chat Fake"; // Default username
}

// Contoh penggunaan
setUsername("Username");

// _________________________________________________________________________
// Menampilkan Menu
document.querySelector(".menu-button").addEventListener("click", function () {
  const menuContainer = document.querySelector(".menu-container");
  menuContainer.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  const menuContainer = document.querySelector(".menu-container");
  if (!menuContainer.contains(event.target)) {
    menuContainer.classList.remove("active");
  }
});
// _________________________________________________________________________
// Chat Bot
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Kamus sinonim sederhana
const synonyms = {
  "clear": ["hapus", "clr", "bersihkan", "hilangkan"],
  "menu": ["command", "perintah", "keyword", "help"],
  "hai": ["halo", "helo", "hi", "hello"],
  "iya": ["ya", "y", "ok", "siap"],
  "bagaimana": ["gimana", "bagaimanakah",],
  "terima kasih": ["makasih", "thanks", "thank you"],
  "bye": ["dadah", "selamat tinggal"],
  "siapa kamu": ["kamu siapa", "bot siapa", "what's your name"],
  "tanggal": ["hari ini tanggal", "tanggal hari ini"],
  "waktu": ["jam berapa", "pukul berapa"]
};

// Respon chatbot
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();

  // Logika berdasarkan input pengguna
  if (matchesInput(lowerInput, "menu")) {
    return `
        <h1>List Perintah</h1>
        <pre style="background-color: #f4f4f4;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 5px;
                overflow-x: auto;
                widht: 100%;">
            Berikut merupakan perintah yang baru bisa di gunakan.

            Options:

            - Hai             Menyapa
            - Siapa kamu      Memberi tau nama dan tugas
            - Bagaimana       Menanyakan kabar
            - Terima Kasih    Berterima kasih atas perhatian
            - Bye             Ucapan perpisahan
            - Tanggal         Memberi tau tangggal secara realtime
            - Waktu           Memberi tau waktu secara realtime
        </pre>
    `;
  } else if (matchesInput(lowerInput, "hai")) {
    return "Halo!";
  } else if (matchesInput(lowerInput, "bagaimana")) {
    return "Saya baik!";
  } else if (matchesInput(lowerInput, "terima kasih")) {
    return "Sama-sama! 😊";
  } else if (matchesInput(lowerInput, "bye")) {
    return "Selamat tinggal! Sampai jumpa lagi.";
  } else if (matchesInput(lowerInput, "siapa kamu")) {
    return "Saya adalah chatbot sederhana yang dibuat untuk membantu Anda.";
  } else if (matchesInput(lowerInput, "tanggal")) {
    return `Hari ini adalah ${new Date().toLocaleDateString("id-ID")}.`;
  } else if (matchesInput(lowerInput, "waktu")) {
    return `Sekarang pukul ${new Date().toLocaleTimeString("id-ID")}.`;
  } else if (lowerInput.startsWith("hitung")) {
    return calculateMath(lowerInput);
  } else if (matchesInput(lowerInput, "clear")) {
    return clearChat();
  } else {
    return "Maaf, saya tidak mengerti pesan Anda. ";
  }
}

// Fungsi untuk menghitung matematika sederhana
function calculateMath(input) {
  const mathExpression = input.replace("hitung", "").trim(); // Hapus kata "hitung"
  try {
    const result = eval(mathExpression); // Evaluasi ekspresi matematika
    return `Hasilnya adalah ${result}`;
  } catch (error) {
    return "Maaf, saya tidak dapat memahami ekspresi matematika Anda.";
  }
}

// Fungsi mencocokkan input dengan sinonim
function matchesInput(input, key) {
  if (input.includes(key)) return true;
  for (let synonym of synonyms[key] || []) {
    if (input.includes(synonym)) return true;
  }
  return false;
}
function safeCalculate(expression) {
  try {
    const sanitized = expression.replace(/[^-()\d/*+.]/g, ""); // Hapus karakter ilegal
    return Function(`'use strict'; return (${sanitized})`)();
  } catch {
    return "Ekspresi matematika tidak valid.";
  }
}

// Menambahkan pesan ke chatbox
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

function sendMessage() {
  const input = userInput.value.trim();
  if (input === "") return;

  // Pesan pengguna
  addMessage("user", input);

  // Tambahkan animasi loading
  const loadingMessage = document.createElement("div");
  loadingMessage.className = "message bot loading";
  loadingMessage.innerHTML = "Bot sedang mengetik";
  chatBox.appendChild(loadingMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  userInput.value = "";

  // Simulasi respon bot dengan delay
  setTimeout(() => {
    chatBox.removeChild(loadingMessage); // Hapus animasi loading
    const botResponse = getBotResponse(input); // Dapatkan respon bot
    addMessage("bot", botResponse);
  }, 1500); // Delay 1.5 detik untuk simulasi mengetik
}

function clearChat() {
  const messages = document.querySelectorAll(".message"); // Ambil semua pesan

  // Tambahkan animasi fade-out ke setiap pesan
  messages.forEach((message) => {
    message.classList.add("fade-out");
  });

  // Tunggu animasi selesai sebelum menghapus pesan
  setTimeout(() => {
    chatBox.innerHTML = ""; // Hapus semua pesan dari chatbox
  }, 500); // Delay sesuai durasi animasi (0.5 detik)
}
