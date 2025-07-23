import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const {
    user_name, user_email, phone,
    pickup_location, drop_location,
    date, time, message,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.MY_EMAIL}>`,
      to: process.env.MY_EMAIL,
      subject: "New Ride Booking",
      html: `
        <h3>Booking Details</h3>
        <p><b>Name:</b> ${user_name}</p>
        <p><b>Email:</b> ${user_email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Pickup:</b> ${pickup_location}</p>
        <p><b>Drop:</b> ${drop_location}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Email sending failed" });
  }
}
