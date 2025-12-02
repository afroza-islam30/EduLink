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

function statusBadge(status) {
  const cls =
    status === 'approved'
      ? 'g-badge g-badge--green'
      : status === 'rejected'
      ? 'g-badge g-badge--red'
      : status === 'shortlisted'
      ? 'g-badge g-badge--blue'
      : 'g-badge g-badge--yellow';

  return `<span class="${cls}">${status[0].toUpperCase() + status.slice(1)}</span>`;
}

function renderApplications(container, applications, token) {
  container.innerHTML = '';

  if (!applications.length) {
    container.innerHTML = '<p class="g-empty">No applications yet.</p>';
    return;
  }

  applications.forEach((app) => {
    const card = document.createElement('div');
    card.className = 'g-application-card';

    const tutor = app.tutor || {};
    const req = app.request || {};

    card.innerHTML = `
      <div class="g-application-main">
        <div class="g-application-left">
          <div class="g-tutor-avatar">
            <span>${(tutor.fullName || '?').charAt(0)}</span>
          </div>
          <div>
            <h3>${tutor.fullName || 'Tutor'}</h3>
            <p class="g-application-line">
              Applied for: <strong>${req.className || ''} – ${req.subjects || ''}</strong>
            </p>
            <div class="g-application-tags">
              ${(tutor.subjects || []).map(s => `<span class="g-pill">${s}</span>`).join('')}
            </div>
            <p class="g-application-line">
              <i class="fa-solid fa-location-dot"></i> ${req.location || tutor.location || 'N/A'}
              &nbsp; &nbsp;
              <i class="fa-solid fa-money-bill-wave"></i> ${req.salary || ''} 
            </p>
          </div>
        </div>

        <div class="g-application-right">
          <div class="g-application-status">
            ${statusBadge(app.status)}
          </div>
          <div class="g-application-buttons">
            <button class="g-btn g-btn-primary js-approve">Approve</button>
            <button class="g-btn g-btn-outline js-reject">Reject</button>
          </div>
          <button class="g-btn g-btn-light g-btn-sm">View Details</button>
        </div>
      </div>
    `;

    const approveBtn = card.querySelector('.js-approve');
    const rejectBtn = card.querySelector('.js-reject');

    approveBtn.addEventListener('click', () =>
      updateStatus(app._id, 'approve', token)
    );
    rejectBtn.addEventListener('click', () =>
      updateStatus(app._id, 'reject', token)
    );

    container.appendChild(card);
  });
}

async function updateStatus(applicationId, action, token) {
  try {
    const url =
      action === 'approve'
        ? `${API_BASE}/applications/approve`
        : `${API_BASE}/applications/reject`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ applicationId }),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.message || 'Could not update application');
      return;
    }

    alert(`Application ${action}d`);
    // reload list
    loadApplications(token);
  } catch (err) {
    console.error(err);
    alert('Something went wrong.');
  }
}

async function loadApplications(token) {
  const container = document.getElementById('application-list');
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!data.success) {
      alert(data.message || 'Failed to load applications');
      return;
    }

    renderApplications(container, data.applications || [], token);
  } catch (err) {
    console.error(err);
    alert('Could not load applications');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const token = requireGuardian();
  if (!token) return;
  setupLogout();
  loadApplications(token);
});
