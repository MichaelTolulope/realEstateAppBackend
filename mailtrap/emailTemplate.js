export const EmailverificationMailTemplate = () => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border-radius: 8px 8px 0 0;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
    }
    .verification-code {
      font-size: 30px;
      font-weight: bold;
      color: #4CAF50;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      display: inline-block;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 20px;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }
    
    /* Media queries for responsiveness */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        padding: 10px;
      }
      .email-header h1 {
        font-size: 20px !important;
      }
      .verification-code {
        font-size: 24px !important;
      }
      .email-body p {
        font-size: 16px !important;
      }
      .footer {
        font-size: 12px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Email Verification</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Thank you for signing up with us! Please use the following verification code to confirm your email address:</p>
      <div class="verification-code">
        {verificationcode}
      </div>
      <p>This code will expire in 5 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
    </div>
  </div>
</body>
</html>
`
}