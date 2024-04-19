const bcrypt = require("bcrypt");
require("dotenv").config();

const createMailTransporter = require("./mailTransporter");

async function sendPasswordResetMail(user) {
  const transporter = await createMailTransporter();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Reset Password Link",
    html: `<br/>Reset your password by clicking this link: <a href='${process.env.CLIENT_URL}/resetpassword?Email=${user.username}&emailToken=${user.emailToken}'>Reset Your Password</a> `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Password Reset email sent: " + info.response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = sendPasswordResetMail;
