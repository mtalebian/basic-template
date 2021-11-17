using Message.Core;
using System;
using System.Threading.Tasks;

namespace Messages.Services
{
    public class SendSmsService: ISendSmsService
    {
        public SendSmsService()
        {
        }
        public Task SendSmsAsync(SmsRequest smsRequest)
        {
            throw new NotImplementedException();
        }
    }
}
