const createTransporter = require('../config/mailer');
const { bookingSuccessTemplate, bookingCancellationTemplate } = require('../utils/emailTemplates');

const sendBookingConfirmationEmail = async ({ to, ...templateData }) => {
  try {
    const transporter = createTransporter();
    const html = bookingSuccessTemplate(templateData);

    await transporter.sendMail({
      from: `"SkyJourney ✈" <${process.env.EMAIL_USER}>`,
      to,
      subject: `✅ Booking Confirmed – ${templateData.flightNumber} | SkyJourney`,
      html,
    });

    console.log(`📧 Booking confirmation email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    // Don't throw — email failure shouldn't break booking
  }
};

const sendCancellationEmail = async ({ to, ...templateData }) => {
  try {
    const transporter = createTransporter();
    const html = bookingCancellationTemplate(templateData);

    await transporter.sendMail({
      from: `"SkyJourney ✈" <${process.env.EMAIL_USER}>`,
      to,
      subject: `❌ Booking Cancelled – ${templateData.flightNumber} | SkyJourney`,
      html,
    });

    console.log(`📧 Cancellation email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending cancellation email:', error.message);
  }
};

module.exports = { sendBookingConfirmationEmail, sendCancellationEmail };
