const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send a password reset email with a link.
 * @param {string} to
 * @param {string} resetLink
 */
async function sendPasswordResetEmail(to, resetLink) {
  const from = process.env.SMTP_USER;

  const mailOptions = {
    from: `"EduLink Support" <${from}>`,
    to,
    subject: 'EduLink – Password Reset',
    html: `
      <p>Hello,</p>
      <p>We received a request to reset your EduLink account password.</p>
      <p>Click the link below to set a new password:</p>
      <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, you can ignore this email.</p>
      <p>– EduLink</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendPasswordResetEmail,
};
