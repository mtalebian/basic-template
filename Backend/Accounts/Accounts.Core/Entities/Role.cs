using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class Role
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string ApplicationId { get; set; }
        public string Title { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime LastUpdate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual Application Application { get; set; }

        [IgnoreMap]
        public virtual ICollection<UserRole> UserRoles { get; set; }

        [IgnoreMap]
        public ICollection<Authorization> Authorizations { get; set; }

        [IgnoreMap]
        public virtual ICollection<RoleCompositeRole> RoleCompositeRoles { get; set; }

        public Role()
        {
            LastUpdate = DateTime.Now;
        }

    }
}