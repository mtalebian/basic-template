using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class AzObjectField
    {
        public string ObjectId { get; set; }
        public string FieldId { get; set; }

        [IgnoreMap]
        public virtual AzObject AzObject { get; set; }

        [IgnoreMap]
        public virtual AzField AzField { get; set; }

        [IgnoreMap]
        public ICollection<AzValue> Values { get; set; }
    }
}