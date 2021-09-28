using System.Collections.Generic;

namespace Accounts.Core
{
    public class Authorization
    {
        public int Id { get; set; }
        
        public string ProjectId { get; set; }
        public string ObjectId { get; set; }
        public string RoleId { get; set; }
        public string Title { get; set; }

        public ICollection<AzValue> Values { get; set; }
    }
}