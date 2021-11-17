using System.Collections.Generic;

namespace Forms.Core
{
    public interface IEmailService
    {
        void SendEmail(string[] destination, string message);
    }
}