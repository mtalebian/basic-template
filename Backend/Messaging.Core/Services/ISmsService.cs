using System.Collections.Generic;

namespace Forms.Core
{
    public interface ISmsService
    {
        void SendSms(string[] destination, string message);
    }
}