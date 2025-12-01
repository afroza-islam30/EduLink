const tokenTutor = localStorage.getItem('token');
const roleTutor = localStorage.getItem('role');

if (!tokenTutor || roleTutor !== 'tutor') {
  window.location.href = 'login.html';
}

async function loadTutorDashboard() {
  try {
    const res = await fetch('/api/dashboard/tutor', {
      headers: { Authorization: `Bearer ${tokenTutor}` },
    });
    const data = await res.json();

    if (!data.success) {
      if (res.status === 401) {
        window.location.href = 'login.html';
        return;
      }
      alert(data.message || 'Failed to load dashboard');
      return;
    }

    const { user, summary } = data;
    document.getElementById('tutor-name').textContent = user.fullName;
    document.getElementById('tutor-email').textContent = user.email;
    document.getElementById('tutor-phone').textContent = user.phone;
    document.getElementById('tutor-welcome').textContent = summary.welcomeMessage;
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
}

// Logout
const logoutLinkTutor = document.getElementById('logout-link');
if (logoutLinkTutor) {
  logoutLinkTutor.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
  });
}

loadTutorDashboard();
