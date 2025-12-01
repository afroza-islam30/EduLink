const API_BASE = '/api';

// Get token from query string
function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

const token = getTokenFromUrl();

if (!token) {
  alert('Reset link is invalid. Please request a new one.');
  window.location.href = 'forgot-password.html';
}

const resetForm = document.getElementById('reset-password-form');

if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Could not reset password.');
        return;
      }

      alert('Password updated successfully. Please log in with your new password.');
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  });
}
