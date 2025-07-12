const jobs = [
  { en: "doctor", bn: "ডাক্তার", image: "assets/jobs/doctor.jpg" },
  { en: "teacher", bn: "শিক্ষক", image: "assets/jobs/teacher.jpg" },
  { en: "pilot", bn: "পাইলট", image: "assets/jobs/pilot.jpg" },
];

let lang = "en";
let currentJob = {};
let score = 0;

const img = document.getElementById("jobImage");
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const langBtn = document.getElementById("langBtn");
const speakBtn = document.getElementById("speakBtn");
const title = document.getElementById("title");
const scoreDisplay = document.getElementById("scoreDisplay");

function loadNewJob() {
  currentJob = jobs[Math.floor(Math.random() * jobs.length)];
  img.src = currentJob.image;
  input.value = "";
  message.textContent = "";
}

function checkAnswer() {
  const guess = input.value.trim().toLowerCase();
  const answer = lang === "en" ? currentJob.en : currentJob.bn;
  if (guess === answer) {
    message.textContent = lang === "en" ? "✅ Correct!" : "✅ সঠিক!";
    message.style.color = "green";
    score++;
  } else {
    message.textContent = lang === "en" ? "❌ Try again!" : "❌ আবার চেষ্টা করো!";
    message.style.color = "red";
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

function toggleLang() {
  lang = lang === "en" ? "bn" : "en";
  langBtn.textContent = lang === "en" ? "🌐 বাংলা" : "🌐 English";
  title.textContent = lang === "en" ? "👔 Guess My Job" : "👔 আমার পেশা বলো";
  input.placeholder = lang === "en" ? "What's the job?" : "পেশাটির নাম লিখো...";
}

function speakJob() {
  const job = lang === "en" ? currentJob.en : currentJob.bn;
  const utter = new SpeechSynthesisUtterance(job);
  utter.lang = lang === "en" ? "en-US" : "bn-BD";
  speechSynthesis.speak(utter);
}

checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", loadNewJob);
langBtn.addEventListener("click", toggleLang);
speakBtn.addEventListener("click", speakJob);

// Init
toggleLang();
loadNewJob();
