using Common;
using Message.Core;
using Microsoft.AspNetCore.Mvc;
using System;
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
                await mailService.SendWelcomeEmailAsync(request);
                return new Response();
            }
            catch (Exception)
            {
                return new Response(Messages.ServerError);
            }

        }
    }
}
