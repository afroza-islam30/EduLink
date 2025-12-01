// views/js/tutorDashboard.js

const tokenTutor = localStorage.getItem('token');
const roleTutor = localStorage.getItem('role');

// normal check
if (!tokenTutor || roleTutor !== 'tutor') {
  window.location.replace('login.html');
}

// 🔁 also check when user comes back via Back/Forward
window.addEventListener('pageshow', () => {
  const t = localStorage.getItem('token');
  const r = localStorage.getItem('role');
  if (!t || r !== 'tutor') {
    window.location.replace('login.html');
  }
});



async function loadTutorDashboard() {
  try {
    const res = await fetch('/api/dashboard/tutor', {
      headers: { Authorization: `Bearer ${tokenTutor}` },
    });

    // If server responded with non-JSON, this will throw and go to catch
    const data = await res.json();

    if (!data.success) {
      // Show more specific message if available
      alert(data.message || 'Failed to load dashboard');
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
      }
      return;
    }

    const { user, summary } = data;

    // Fill UI
    document.getElementById('tutor-name').textContent = user.fullName || 'Tutor';
    document.getElementById('tutor-email').textContent = user.email || '';
    document.getElementById('tutor-phone').textContent = user.phone || '';
    document.getElementById('tutor-welcome').textContent =
      summary?.welcomeMessage || 'Welcome to your Tutor Dashboard';

    // Avatar initials
    const avatar = document.getElementById('tutor-avatar-initials');
    if (avatar && user.fullName) {
      const initials = user.fullName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      avatar.textContent = initials;
    }

    // Dummy notifications
    const notifications = [
      {
        iconClass: 'fa-solid fa-circle-check',
        colorBg: 'rgba(22,163,74,0.08)',
        colorIcon: '#16a34a',
        title: 'Welcome to EduLink',
        description: 'Start by exploring your dashboard and keeping your profile up to date.',
        time: 'Just now',
      },
      {
        iconClass: 'fa-solid fa-info',
        colorBg: 'rgba(59,130,246,0.08)',
        colorIcon: '#2563eb',
        title: 'Tip for tutors',
        description: 'Regular logins help you stay active and visible to guardians.',
        time: 'Today',
      },
    ];

    const list = document.getElementById('tutor-notifications');
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
    console.error('Tutor dashboard fetch error:', err);
    alert('Something went wrong while loading the dashboard.');
  }
}

// Logout
const logoutLinkTutor = document.getElementById('logout-link');
if (logoutLinkTutor) {
  logoutLinkTutor.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // ⬇️ replace instead of href
    window.location.replace('login.html');
  });
}


loadTutorDashboard();
