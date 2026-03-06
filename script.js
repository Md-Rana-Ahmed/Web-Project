// frontend/script.js
const API_BASE = 'http://localhost:3001/api';

// User Authentication Functions
async function registerUser(email, password, name) {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    });
    return response.json();
}

async function loginUser(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

// Medicine Search
async function searchMedicines(query) {
    const response = await fetch(`${API_BASE}/medicines/search?query=${encodeURIComponent(query)}`);
    return response.json();
}

// AI Symptom Checker
async function checkSymptoms(symptoms) {
    const response = await fetch(`${API_BASE}/symptoms/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms })
    });
    return response.json();
}

// Drug Interaction Checker
async function checkInteractions(drugs) {
    const response = await fetch(`${API_BASE}/interactions/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugs })
    });
    return response.json();
}

// Local Storage Helper
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Navigation
function navigateTo(page) {
    window.location.href = page;
}

// Initialize Dashboard
function initDashboard() {
    const user = getCurrentUser();
    if (!user) navigateTo('login.html');
    
    document.getElementById('userName').textContent = user.name;
    
    // Load user's medicines
    if (typeof loadMedicines === 'function') loadMedicines();
}