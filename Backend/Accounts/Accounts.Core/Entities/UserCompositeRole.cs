namespace Accounts.Core
{
    public class UserCompositeRole
    {
        public string ProjectId { get; set; }
        public string CompositeRoleId { get; set; }
        public long UserId { get; set; }
        
        public virtual User User { get; set; }
        public virtual CompositeRole CompositeRole { get; set; }

    }
}