using Message.Core;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Messages.Services
{
    public class SendEmailServices : ISendEmailService
    {
        private readonly EmailConfig _EmailConfig;

        public SendEmailServices(IOptions<EmailConfig> emailConfig)
        {
            this._EmailConfig = emailConfig.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            using (var Client = new SmtpClient())
            {
                Client.UseDefaultCredentials = true;
                Client.Host = _EmailConfig.Host;
                Client.Port = _EmailConfig.Port;
                Client.EnableSsl = _EmailConfig.EnableSsl;
                using (var emailMessage = new MailMessage())
                {
                    emailMessage.To.Add(new MailAddress(mailRequest.ToMail));
                    emailMessage.From = new MailAddress(_EmailConfig.From);
                    emailMessage.Subject = mailRequest.Subject;
                    emailMessage.IsBodyHtml = _EmailConfig.IsBodyHtml;
                    emailMessage.Body = mailRequest.Body;

                    Client.Send(emailMessage);
                };
                await Task.CompletedTask;
            }
        }
        public async Task SendWelcomeEmailAsync(WelcomeRequest request)
        {
            string workingDirectory = Environment.CurrentDirectory;
            string projectDirectory = Directory.GetParent(workingDirectory).Parent.FullName;

            string FilePath = projectDirectory + "\\Backend\\Messaging\\Messages.Services\\Template\\WelcomeTemplate.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[username]", request.UserName).Replace("[email]", request.ToEmail);

            using (var Client = new SmtpClient())
            {
                Client.UseDefaultCredentials = true;
                Client.Host = _EmailConfig.Host;
                Client.Port = _EmailConfig.Port;
                Client.EnableSsl = _EmailConfig.EnableSsl;
                using (var emailMessage = new MailMessage())
                {
                    emailMessage.To.Add(new MailAddress(request.ToEmail));
                    emailMessage.From = new MailAddress(_EmailConfig.From);
                    emailMessage.Subject = "Welcome";
                    emailMessage.IsBodyHtml = _EmailConfig.IsBodyHtml;
                    emailMessage.Body = MailText;

                    Client.Send(emailMessage);
                };
                await Task.CompletedTask;
            }
        }
    }
}
