using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class RoleCompositeRole
    {
        public string RoleId { get; set; }
        public string CompositeRoleId { get; set; }
        public string ProjectId { get; set; }

        [IgnoreMap]
        public virtual Role Role { get; set; }

        [IgnoreMap]
        public virtual CompositeRole CompositeRole { get; set; }

    }
}