export const generateResetPasswordEmail = (otp: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .header {
          background: #1a73e8;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background: #ffffff;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 0 0 5px 5px;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          color: #1a73e8;
          padding: 20px;
          letter-spacing: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>We received a request to reset your password for your Smart Parking System account. Please use the following OTP to reset your password:</p>
          <div class="otp">${otp}</div>
          <p>This OTP will expire in 15 minutes for security reasons.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br>Smart Parking System Team</p>
        </div>
        <div class="footer">
          <p>This is an automated email, please do not reply.</p>
          <p>© ${new Date().getFullYear()} Smart Parking System - KLEF. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}; 