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

document.addEventListener('DOMContentLoaded', async () => {
  const token = requireGuardian();
  if (!token) return;

  const container = document.getElementById('application-list');

  try {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await res.json();

    if (!data.success || !data.requests.length) {
      container.innerHTML = `<p class="g-empty">No tuition requests posted.</p>`;
      return;
    }

    container.innerHTML = data.requests.map(r => `
      <div class="g-app-card">
        <h3>${r.studentName} – Class ${r.className}</h3>
        <p><strong>Subjects:</strong> ${r.subjects}</p>
        <p><strong>Location:</strong> ${r.location}</p>
        <p><strong>Salary:</strong> ${r.salary}</p>
        <p><strong>Status:</strong> ${r.status}</p>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="g-empty">Error loading requests.</p>`;
  }
});
