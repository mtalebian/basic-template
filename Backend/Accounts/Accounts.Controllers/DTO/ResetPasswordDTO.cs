namespace Accounts.Controllers
{
    public class ResetPasswordDTO
    {
        public string UserName { get; set; }
        public string Code { get; set; }
        public string Key { get; set; }

    }
}