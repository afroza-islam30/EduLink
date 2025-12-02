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

function renderTutors(listEl, tutors) {
  listEl.innerHTML = '';

  if (!tutors.length) {
    listEl.innerHTML = '<p class="g-empty">No tutors found.</p>';
    return;
  }

  tutors.forEach((tutor) => {
    const card = document.createElement('div');
    card.className = 'g-tutor-card';

    card.innerHTML = `
      <div class="g-tutor-card__top">
        <div class="g-tutor-avatar">
          <span>${(tutor.fullName || '?').charAt(0)}</span>
        </div>
        <div class="g-tutor-info">
          <h3>${tutor.fullName}</h3>
          <div class="g-tutor-rating">
            <span>★ ${tutor.rating?.toFixed ? tutor.rating.toFixed(1) : tutor.rating || '4.5'}</span>
          </div>
          <p class="g-tutor-desc">
            ${tutor.location || ''} • ${tutor.classes?.join(', ') || ''}
          </p>
        </div>
      </div>

      <div class="g-tutor-tags">
        ${(tutor.subjects || []).map(s => `<span class="g-pill">${s}</span>`).join('')}
      </div>

      <div class="g-tutor-meta">
        <div><i class="fa-solid fa-location-dot"></i> ${tutor.location || 'N/A'}</div>
        <div><i class="fa-solid fa-money-bill-wave"></i>
          ${tutor.minRate || '?'}–${tutor.maxRate || '?'} BDT
        </div>
      </div>

      <div class="g-tutor-actions">
        <button class="g-btn g-btn-light">View Profile</button>
        <button class="g-btn g-btn-primary">Send Application</button>
      </div>
    `;

    listEl.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const token = requireGuardian();
  if (!token) return;
  setupLogout();

  const listEl = document.getElementById('tutor-list');
  if (!listEl) return;

  try {
    const res = await fetch(`${API_BASE}/browse-tutors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Failed to load tutors');
      return;
    }

    renderTutors(listEl, data.tutors || []);
  } catch (err) {
    console.error(err);
    alert('Something went wrong while loading tutors.');
  }
});
