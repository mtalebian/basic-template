using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Message.Core
{
    public class SmsRequest
    {
        public string ToSms { get; set; }
        public string Text { get; set; }
    }
}
