const API_BASE = '/api';

/* ===== ROLE TOGGLE ON REGISTRATION ===== */
const toggleTutor = document.getElementById('toggle-tutor');
const toggleGuardian = document.getElementById('toggle-guardian');
const roleInput = document.getElementById('role');

if (toggleTutor && toggleGuardian && roleInput) {
  toggleTutor.addEventListener('click', () => {
    roleInput.value = 'tutor';
    toggleTutor.classList.add('active');
    toggleGuardian.classList.remove('active');
  });

  toggleGuardian.addEventListener('click', () => {
    roleInput.value = 'guardian';
    toggleGuardian.classList.add('active');
    toggleTutor.classList.remove('active');
  });
}

/* ===== REGISTER ===== */
const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = { fullName, email, phone, password, role };

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Registration failed');
        return;
      }
      alert('Registration successful! Please log in.');
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  });
}

/* ===== LOGIN ===== */
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      if (data.user.role === 'tutor') {
        window.location.href = 'tutor-dashboard.html';
      } else {
        window.location.href = 'guardian-dashboard.html';
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  });
}
