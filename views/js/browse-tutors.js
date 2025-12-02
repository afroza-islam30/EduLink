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

  const listDiv = document.getElementById('tutor-list');

  try {
    const res = await fetch(`${API_BASE}/browse-tutors`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!data.success) {
      listDiv.innerHTML = `<p class="g-empty">No tutors available.</p>`;
      return;
    }

    const tutors = data.tutors;

    if (!tutors.length) {
      listDiv.innerHTML = `<p class="g-empty">No tutors found.</p>`;
      return;
    }

    listDiv.innerHTML = tutors.map(t => `
      <div class="g-tutor-card">
        <div class="g-tutor-avatar">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="g-tutor-info">
          <h3>${t.fullName}</h3>
          <p><strong>Subject:</strong> ${t.subjectExpertise || 'N/A'}</p>
          <p><strong>Experience:</strong> ${t.experienceLevel || 'N/A'}</p>
          <p><strong>Location:</strong> ${t.preferredLocations || 'N/A'}</p>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    listDiv.innerHTML = `<p class="g-empty">Error loading tutors.</p>`;
  }
});
