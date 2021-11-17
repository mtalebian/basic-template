using Common;
using System.Threading.Tasks;

namespace Message.Core
{
    public interface ISendSmsService
    {
        Task SendSmsAsync(SmsRequest smsRequest);
    }
}
