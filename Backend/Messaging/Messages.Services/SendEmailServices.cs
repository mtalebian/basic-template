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
                if (!_EmailConfig.WindowsAuthenticate)
                {
                    var credentials = new NetworkCredential(_EmailConfig.UserName, _EmailConfig.Password);
                    Client.Credentials = credentials;
                }
                else
                {
                    Client.UseDefaultCredentials = true;
                }
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

    }
}
