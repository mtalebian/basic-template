using System.Collections.Generic;

namespace Accounts.Core
{
    public class AzField
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string ValidValues { get; set; }
        public string ValuesQuery { get; set; }
    
        public virtual ICollection<AzObjectField> AzObjectFields { get; set; }
        public virtual Project Project { get; set; }
    }
}