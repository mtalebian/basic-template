using System;

namespace Accounts.Core
{
    public class AzValue
    {
        public int Serial { get; set; }

        public int AuthorizationId { get; set; }
        public string ObjectId { get; set; }
        public string FieldId { get; set; }
        public string Value { get; set; }

        [IgnoreMap]
        public virtual Authorization Authorization { get; set; }

        [IgnoreMap]
        public virtual AzObjectField AzObjectField { get; set; }
    }
}