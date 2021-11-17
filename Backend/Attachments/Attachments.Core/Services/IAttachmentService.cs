using System.Collections.Generic;

namespace Forms.Core
{
    public interface IAttachmentService
    {
        void SendEmail(string[] destination, string message);
    }
}