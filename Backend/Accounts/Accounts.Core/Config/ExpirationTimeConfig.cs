namespace Accounts.Core
{
    public class ExpirationTimeConfig
    {
        public const string SectionName = "ExpirationTime";
        public int Email { get; set; }
        public int SMS { get; set; }
    }
}