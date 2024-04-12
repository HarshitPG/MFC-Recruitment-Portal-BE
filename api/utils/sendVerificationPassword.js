const bcrypt = require("bcrypt");
require("dotenv").config();

const createMailTransporter = require("./mailTransporter");

export async function sendPasswordResetMail(user) {
  const transporter = await createMailTransporter();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "testing verify email",
    html: `<br/>Reset your password by clicking this link: <a href='${process.env.CLIENT_URL}/updatePassword?Email=${user.username}&emailToken=${user.emailToken}'>Reset Your Password</a>`,
    // http://localhost:3000/updatePassword?Email=test@example.com&emailToken=yourEmailTokenHere
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Password Reset email sent: " + info.response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
