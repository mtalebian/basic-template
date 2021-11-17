using Common.Data;
using System;
using System.Collections.Generic;

namespace Forms.Core
{
    public class ChangeDocumentHeader
    {
        public Int64 Serial { get; set; }

        public string ObjectClass { get; set; } //15
        public string ObjectValue { get; set; } //90

        public string Url { get; set; }

        public string UserName { get; set; }    //12
        public DateTime CreatedAt { get; set; } 

        public virtual ICollection<ChangeDocumentItem> Items { get; set; }
    }
}