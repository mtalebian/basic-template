using System;

namespace Accounts.Core
{
    public class UserRole
    {
        public string ProjectId { get; set; }
        public string RoleId { get; set; }
        public long UserId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual User User { get; set; }

        [IgnoreMap]
        public virtual Role Role { get; set; }
    }
}