namespace Accounts.Core
{
    public class JwtConfig
    {
        public const string SectionName = "Jwt";

        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int Expiry { get; set; }
    }
}