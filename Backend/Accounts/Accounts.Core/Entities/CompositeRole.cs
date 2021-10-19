using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class CompositeRole
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string Title { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime LastUpdate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual ICollection<UserCompositeRole> UserCompositeRoles { get; set; }
    }
}