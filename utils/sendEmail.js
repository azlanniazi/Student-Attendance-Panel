const nodemailer = require("nodemailer");

// exporting function responsible for sending emails to user
exports.sendEmail = async (options) => {
  // creating transporter
  const tranpsorter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // defining mail options
  const mailOptions = {
    from: "Azlan Khan <Azlan@Azlan.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await tranpsorter.sendMail(mailOptions);
};
