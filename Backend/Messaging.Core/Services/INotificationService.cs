using System.Collections.Generic;

namespace Forms.Core
{
    public interface INotificationService
    {
        void SendNotification(string sender, string reciever, string message);
    }
}