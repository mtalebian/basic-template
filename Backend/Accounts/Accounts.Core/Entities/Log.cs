using System;
using System.Linq;

namespace Accounts.Core
{
    public class Log
    {
        public long Id { get; set; }

        public string ProjectId { get; set; }

        public long SessionId { get; set; }

        public string LogType { get; set; }

        public string UserName { get; set; }

        public string Message { get; set; }

        public DateTime CreateOn { get; set; }

    }
}