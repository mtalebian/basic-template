using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Message.Core
{
    public class EmailConfig
    {
        public const string SectionName = "Email";

        public bool WindowsAuthenticate { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string From { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSsl { get; set; }
        public bool IsBodyHtml { get; set; }
    }
}
