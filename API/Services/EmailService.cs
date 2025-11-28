using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace API.Services {
    public class EmailService {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly string _toEmail;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger) {
            _configuration = configuration;
            _logger = logger;

            // Get email settings from configuration
            // Priority: Environment Variable > Configuration > Default
            _smtpHost = Environment.GetEnvironmentVariable("SMTP_HOST") 
                ?? configuration["Email:SmtpHost"] 
                ?? "smtp.gmail.com";

            _smtpPort = int.Parse(Environment.GetEnvironmentVariable("SMTP_PORT") 
                ?? configuration["Email:SmtpPort"] 
                ?? "587");

            _smtpUsername = Environment.GetEnvironmentVariable("SMTP_USERNAME") 
                ?? configuration["Email:SmtpUsername"] 
                ?? string.Empty;

            _smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD") 
                ?? configuration["Email:SmtpPassword"] 
                ?? string.Empty;

            _fromEmail = Environment.GetEnvironmentVariable("EMAIL_FROM") 
                ?? configuration["Email:FromEmail"] 
                ?? _smtpUsername;

            _fromName = Environment.GetEnvironmentVariable("EMAIL_FROM_NAME") 
                ?? configuration["Email:FromName"] 
                ?? "AlpiDev Contact Form";

            _toEmail = Environment.GetEnvironmentVariable("EMAIL_TO") 
                ?? configuration["Email:ToEmail"] 
                ?? "info@alpidev.com";
        }

        public async Task<bool> SendContactEmailAsync(string name, string email, string subject, string message) {
            try {
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(_fromName, _fromEmail));
                emailMessage.To.Add(new MailboxAddress("AlpiDev", _toEmail));
                emailMessage.Subject = $"Contact Form: {subject}";
                
                var bodyBuilder = new BodyBuilder {
                    HtmlBody = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                                <h2 style='color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;'>
                                    New Contact Form Message
                                </h2>
                                
                                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                                    <p><strong>From:</strong> {System.Net.WebUtility.HtmlEncode(name)}</p>
                                    <p><strong>Email:</strong> <a href='mailto:{System.Net.WebUtility.HtmlEncode(email)}'>{System.Net.WebUtility.HtmlEncode(email)}</a></p>
                                    <p><strong>Subject:</strong> {System.Net.WebUtility.HtmlEncode(subject)}</p>
                                </div>
                                
                                <div style='background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;'>
                                    <h3 style='margin-top: 0;'>Message:</h3>
                                    <p style='white-space: pre-wrap;'>{System.Net.WebUtility.HtmlEncode(message)}</p>
                                </div>
                                
                                <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
                                    <p>This email was sent from the AlpiDev contact form.</p>
                                    <p>Reply to: <a href='mailto:{System.Net.WebUtility.HtmlEncode(email)}'>{System.Net.WebUtility.HtmlEncode(email)}</a></p>
                                </div>
                            </div>
                        </body>
                        </html>",
                    TextBody = $@"
New Contact Form Message

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This email was sent from the AlpiDev contact form.
Reply to: {email}"
                };

                emailMessage.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(_smtpHost, _smtpPort, SecureSocketOptions.StartTls);
                
                if (!string.IsNullOrWhiteSpace(_smtpUsername) && !string.IsNullOrWhiteSpace(_smtpPassword)) {
                    await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
                }
                
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);

                _logger.LogInformation("Contact email sent successfully to {ToEmail} from {FromEmail}", _toEmail, email);
                return true;
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error sending contact email from {Email} to {ToEmail}", email, _toEmail);
                return false;
            }
        }
    }
}

