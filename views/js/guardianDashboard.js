const tokenGuardian = localStorage.getItem('token');
const roleGuardian = localStorage.getItem('role');

if (!tokenGuardian || roleGuardian !== 'guardian') {
  window.location.href = 'login.html';
}

async function loadGuardianDashboard() {
  try {
    const res = await fetch('/api/dashboard/guardian', {
      headers: { Authorization: `Bearer ${tokenGuardian}` },
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
    document.getElementById('guardian-name').textContent = user.fullName;
    document.getElementById('guardian-email').textContent = user.email;
    document.getElementById('guardian-phone').textContent = user.phone;
    document.getElementById('guardian-welcome').textContent = summary.welcomeMessage;
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
}

// Logout
const logoutLinkGuardian = document.getElementById('logout-link');
if (logoutLinkGuardian) {
  logoutLinkGuardian.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
  });
}

loadGuardianDashboard();
