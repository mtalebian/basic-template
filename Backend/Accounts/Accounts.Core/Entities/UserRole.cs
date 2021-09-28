namespace Accounts.Core
{
    public class UserRole
    {
        public string ProjectId { get; set; }
        public string RoleId { get; set; }
        public long UserId { get; set; }

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}