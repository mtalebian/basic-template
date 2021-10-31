namespace Accounts.Controllers
{
    public class ForgotPasswordDTO
    {
        public string UserName { get; set; }
        public string Captcha { get; set; }
    }
}