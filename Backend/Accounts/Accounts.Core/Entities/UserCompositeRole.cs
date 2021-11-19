using System;

namespace Accounts.Core
{
    public class UserCompositeRole
    {
        public string ProjectId { get; set; }
        public string CompositeRoleId { get; set; }
        public int UserId { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual User User { get; set; }

        [IgnoreMap]
        public virtual CompositeRole CompositeRole { get; set; }

    }
}