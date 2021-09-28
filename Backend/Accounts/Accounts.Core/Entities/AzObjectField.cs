using System.Collections.Generic;

namespace Accounts.Core
{
    public class AzObjectField
    {
        public string ObjectId { get; set; }
        public string FieldId { get; set; }

        public virtual AzObject AzObject { get; set; }
        public virtual AzField AzField { get; set; }

        public ICollection<AzValue> Values { get; set; }
    }
}