using Common;
using System.Threading.Tasks;

namespace Message.Core
{
    public interface ISendEmailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeRequest request);
    }
}
