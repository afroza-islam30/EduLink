// views/js/forgotPassword.js

const forgotForm = document.getElementById('forgot-password-form');

if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value.trim();
    const newPassword = document.getElementById('forgotNewPassword').value;

    if (!email || !newPassword) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        // 🔥 For invalid email you'll see: "No user found with this email"
        alert(data.message || 'Could not update password.');
        return;
      }

      alert('Password updated successfully. Please log in with your new password.');
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Forgot password request error:', err);
      alert('Something went wrong. Please try again.');
    }
  });
}
