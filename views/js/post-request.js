const API_BASE = '/api';

function requireGuardian() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'guardian') {
    window.location.href = 'login.html';
    return null;
  }
  return token;
}

function setupLogout() {
  const btn = document.getElementById('logout-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const token = requireGuardian();
  if (!token) return;

  setupLogout();

  const form = document.getElementById('post-request-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      studentName: document.getElementById('studentName').value.trim(),
      className: document.getElementById('className').value.trim(),
      subjects: document.getElementById('subjects').value.trim(),
      location: document.getElementById('location').value.trim(),
      salary: document.getElementById('salary').value.trim(),
      daysPerWeek: document.getElementById('days').value.trim(),
      preferredGender: document.getElementById('gender').value,
      details: document.getElementById('details').value.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/post-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Failed to submit request');
        return;
      }

      alert('Tuition request posted successfully!');
      window.location.href = 'review-applications.html';
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  });
});
