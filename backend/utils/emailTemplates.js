const bookingSuccessTemplate = ({
  passengerName,
  flightNumber,
  source,
  destination,
  departureTime,
  bookingId,
  airline,
  price,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmed</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4ff; }
    .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(37,99,235,0.12); }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1e3a8a 60%, #2563EB 100%); padding: 40px 32px; text-align: center; }
    .logo { font-size: 28px; font-weight: 800; color: #38BDF8; letter-spacing: 2px; }
    .logo span { color: #ffffff; }
    .header h2 { color: #ffffff; margin-top: 10px; font-size: 18px; font-weight: 400; opacity: 0.85; }
    .badge { display: inline-block; background: #22c55e; color: white; padding: 6px 20px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-top: 14px; letter-spacing: 1px; }
    .body { padding: 36px 32px; }
    .greeting { font-size: 20px; color: #0F172A; font-weight: 700; margin-bottom: 8px; }
    .subtext { color: #64748b; font-size: 14px; margin-bottom: 28px; }
    .flight-card { background: linear-gradient(135deg, #eff6ff, #f0f9ff); border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .route { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .city { font-size: 24px; font-weight: 800; color: #0F172A; }
    .city-label { font-size: 12px; color: #64748b; margin-top: 2px; }
    .plane-icon { font-size: 28px; color: #2563EB; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #cbd5e1; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-size: 13px; color: #64748b; }
    .detail-value { font-size: 13px; font-weight: 600; color: #0F172A; }
    .booking-id { background: #0F172A; color: #38BDF8; padding: 16px 24px; border-radius: 10px; text-align: center; margin-bottom: 24px; }
    .booking-id p { font-size: 12px; color: #94a3b8; margin-bottom: 4px; letter-spacing: 1px; }
    .booking-id span { font-size: 18px; font-weight: 800; letter-spacing: 3px; }
    .note { background: #fefce8; border-left: 4px solid #facc15; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 13px; color: #713f12; }
    .footer { background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #94a3b8; font-size: 12px; line-height: 1.8; }
    .footer strong { color: #2563EB; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">Sky<span>Journey</span></div>
      <h2>Your boarding pass is ready</h2>
      <div class="badge">✓ BOOKING CONFIRMED</div>
    </div>
    <div class="body">
      <p class="greeting">Hello, ${passengerName}! ✈️</p>
      <p class="subtext">Your flight has been successfully booked. Here are your travel details:</p>

      <div class="flight-card">
        <div class="route">
          <div>
            <div class="city">${source}</div>
            <div class="city-label">Departure</div>
          </div>
          <div class="plane-icon">✈</div>
          <div style="text-align:right">
            <div class="city">${destination}</div>
            <div class="city-label">Arrival</div>
          </div>
        </div>
        <div class="detail-row">
          <span class="detail-label">Airline</span>
          <span class="detail-value">${airline}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Flight Number</span>
          <span class="detail-value">${flightNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Departure</span>
          <span class="detail-value">${new Date(departureTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount Paid</span>
          <span class="detail-value" style="color:#2563EB">₹${price}</span>
        </div>
      </div>

      <div class="booking-id">
        <p>BOOKING REFERENCE</p>
        <span>${bookingId}</span>
      </div>

      <div class="note">
        📋 Please carry a valid government-issued photo ID at the airport. Check-in opens 2 hours before departure.
      </div>
    </div>
    <div class="footer">
      <p>Need help? Contact us at <strong>support@skyjourney.com</strong></p>
      <p>© 2025 SkyJourney · Safe travels!</p>
    </div>
  </div>
</body>
</html>
  `;
};

const bookingCancellationTemplate = ({
  passengerName,
  bookingId,
  flightNumber,
  source,
  destination,
  cancellationDate,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Booking Cancelled</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4ff; }
    .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e293b, #374151); padding: 40px 32px; text-align: center; }
    .logo { font-size: 28px; font-weight: 800; color: #38BDF8; letter-spacing: 2px; }
    .logo span { color: #ffffff; }
    .badge { display: inline-block; background: #ef4444; color: white; padding: 6px 20px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-top: 14px; letter-spacing: 1px; }
    .body { padding: 36px 32px; }
    .greeting { font-size: 20px; color: #0F172A; font-weight: 700; margin-bottom: 8px; }
    .subtext { color: #64748b; font-size: 14px; margin-bottom: 28px; }
    .detail-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-size: 13px; color: #64748b; }
    .detail-value { font-size: 13px; font-weight: 600; color: #0F172A; }
    .refund-note { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; }
    .refund-note p { font-size: 13px; color: #166534; line-height: 1.7; }
    .footer { background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #94a3b8; font-size: 12px; line-height: 1.8; }
    .footer strong { color: #2563EB; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">Sky<span>Journey</span></div>
      <div class="badge">✕ BOOKING CANCELLED</div>
    </div>
    <div class="body">
      <p class="greeting">Hello, ${passengerName}</p>
      <p class="subtext">Your booking has been successfully cancelled. We're sorry to see you go.</p>

      <div class="detail-card">
        <div class="detail-row">
          <span class="detail-label">Booking ID</span>
          <span class="detail-value">${bookingId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Flight Number</span>
          <span class="detail-value">${flightNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Route</span>
          <span class="detail-value">${source} → ${destination}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Cancellation Date</span>
          <span class="detail-value">${new Date(cancellationDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
      </div>

      <div class="refund-note">
        <p>💰 <strong>Refund Information:</strong> If applicable, your refund will be processed within 5–7 business days to your original payment method.</p>
      </div>
    </div>
    <div class="footer">
      <p>Questions? Contact us at <strong>support@skyjourney.com</strong></p>
      <p>© 2025 SkyJourney</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = { bookingSuccessTemplate, bookingCancellationTemplate };
