const nodemailer = require("nodemailer");

const sendEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"Funko Pop Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification Code (Підтвердження реєстрації)",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2>Welcome to Funko Pop Store!</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #ff8a00; font-size: 40px; letter-spacing: 5px;">${code}</h1>
          <p>This code is valid for <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
  }
};

module.exports = sendEmail;
