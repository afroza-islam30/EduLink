// views/js/guardianDashboard.js

const tokenGuardian = localStorage.getItem('token');
const roleGuardian = localStorage.getItem('role');

if (!tokenGuardian || roleGuardian !== 'guardian') {
  window.location.replace('login.html');
}

window.addEventListener('pageshow', () => {
  const t = localStorage.getItem('token');
  const r = localStorage.getItem('role');
  if (!t || r !== 'guardian') {
    window.location.replace('login.html');
  }
});


async function loadGuardianDashboard() {
  try {
    const res = await fetch('/api/dashboard/guardian', {
      headers: { Authorization: `Bearer ${tokenGuardian}` },
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || 'Failed to load dashboard');
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
      }
      return;
    }

    const { user, summary } = data;

    document.getElementById('guardian-name').textContent =
      user.fullName || 'Guardian';
    document.getElementById('guardian-email').textContent = user.email || '';
    document.getElementById('guardian-phone').textContent = user.phone || '';
    document.getElementById('guardian-welcome').textContent =
      summary?.welcomeMessage || 'Welcome to your Guardian Dashboard';

    const avatar = document.getElementById('guardian-avatar-initials');
    if (avatar && user.fullName) {
      const initials = user.fullName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      avatar.textContent = initials;
    }

    const notifications = [
      {
        iconClass: 'fa-solid fa-hand-holding-heart',
        colorBg: 'rgba(34,197,94,0.08)',
        colorIcon: '#15803d',
        title: 'Welcome to EduLink',
        description:
          'Use your dashboard to stay organised and keep track of your tutors.',
        time: 'Just now',
      },
      {
        iconClass: 'fa-solid fa-lightbulb',
        colorBg: 'rgba(250,204,21,0.1)',
        colorIcon: '#ca8a04',
        title: 'Tip for guardians',
        description:
          'Update your contact details so tutors can reach you without issues.',
        time: 'Today',
      },
    ];

    const list = document.getElementById('guardian-notifications');
    if (list) {
      list.innerHTML = '';
      notifications.forEach((n) => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.innerHTML = `
          <div class="notification-icon" style="background:${n.colorBg};">
            <i class="${n.iconClass}" style="color:${n.colorIcon};"></i>
          </div>
          <div>
            <div class="notification-title">${n.title}</div>
            <div class="notification-text">${n.description}</div>
            <div class="notification-time">${n.time}</div>
          </div>
        `;
        list.appendChild(item);
      });
    }
  } catch (err) {
    console.error('Guardian dashboard fetch error:', err);
    alert('Something went wrong while loading the dashboard.');
  }
}

const logoutLinkGuardian = document.getElementById('logout-link');
if (logoutLinkGuardian) {
  logoutLinkGuardian.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.replace('login.html');
  });
}


loadGuardianDashboard();
