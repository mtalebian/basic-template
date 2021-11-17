namespace Accounts.Controllers
{
    public class ForgotPasswordResultDTO
    {
        public byte[] Key { get; set; }
        public string Code { get; set; } //while sms or email Implement Remove this Property
        public int Expiry { get; set; }
    }
}