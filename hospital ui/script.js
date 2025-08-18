//data
const doctors = [
  { id: 1, name: "Dr. Ayesha Rahman", specialty: "Cardiology", hospital: "Square Hospital" },
  { id: 2, name: "Dr. Mahfuz Hasan", specialty: "Dermatology", hospital: "United Hospital" },
  { id: 3, name: "Dr. Nusrat Jahan", specialty: "Dental", hospital: "Ibn Sina" }
];

let currentUser = null;
let selectedDoctor = null;
let appointments = [];

//show/Hide pages
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

//login
function login() {
  const role = document.getElementById('role').value;
  currentUser = { name: "Demo User", role };
  alert("Logged in as " + role);
  showPage("doctors");
}

//doctor list
function loadDoctors() {
  const list = document.getElementById("doctorList");
  list.innerHTML = "";
  doctors.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.specialty} • ${d.hospital}</p>
      <button onclick="bookDoctor(${d.id})">Book</button>
    `;
    list.appendChild(card);
  });
}

//book
function bookDoctor(id) {
  selectedDoctor = doctors.find(d => d.id === id);
  document.getElementById("selectedDoctor").textContent =
    `${selectedDoctor.name} • ${selectedDoctor.specialty} • ${selectedDoctor.hospital}`;
  showPage("booking");
}

function confirmBooking() {
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;
  if (!date || !time) return alert("Select date & time");

  const appt = { doctor: selectedDoctor, date, time };
  appointments.push(appt);
  alert("Appointment booked!");
  showAppointments();
  showPage("dashboard");
}

//show appointments
function showAppointments() {
  const container = document.getElementById("appointments");
  container.innerHTML = "";
  if (appointments.length === 0) {
    container.textContent = "No appointments yet.";
  }
  appointments.forEach((a, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${a.doctor.name}</h3>
      <p>${a.date} at ${a.time}</p>
      <button onclick="showQueue(${i})">View Queue</button>
    `;
    container.appendChild(card);
  });
}

//queue
function showQueue(index) {
  const qList = document.getElementById("queueList");
  qList.innerHTML = "";
  const appt = appointments[index];
  const queue = [appt, {doctor: appt.doctor, time: "Later"}]; // simple mock

  queue.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = `${i+1}. ${q.doctor.name} - ${q.time}`;
    qList.appendChild(div);
  });

  showPage("queue");
}

//init
window.onload = () => {
  loadDoctors();
  showPage("login");
}
