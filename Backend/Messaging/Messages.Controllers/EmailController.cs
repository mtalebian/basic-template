using Common;
using Message.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Messages.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController: ControllerBase
    {
        private readonly ISendEmailService mailService;
        public EmailController(ISendEmailService mailService)
        {
            this.mailService = mailService;
        }
        [HttpPost("send-email")]
        public async Task<Response> SendMail([FromForm] MailRequest request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                return new Response();
            }
            catch (Exception)
            {
                return new Response(Messages.ServerError);
            }

        }
        [HttpPost("send-welcome-email")]
        public async Task<Response> SendWelComeMail([FromForm] WelcomeRequest request)
        {
            try
            {
                string workingDirectory = Environment.CurrentDirectory;
                string projectDirectory = Directory.GetParent(workingDirectory).Parent.FullName;

                string FilePath = projectDirectory + "\\Backend\\Messaging\\Messages.Services\\Template\\WelcomeTemplate.html";
                StreamReader str = new StreamReader(FilePath);
                string MailText = str.ReadToEnd();
                str.Close();
                MailText = MailText.Replace("[username]", request.UserName).Replace("[email]", request.ToEmail);
                var mailRequest = new MailRequest() { ToMail = request.ToEmail, Subject = "Welcome", Body = MailText };

                await mailService.SendEmailAsync(mailRequest);
                return new Response();
            }
            catch (Exception)
            {
                return new Response(Messages.ServerError);
            }

        }
    }
}
