using System.Collections.Generic;

namespace Accounts.Controllers
{
    public class UserInsertDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string NationalCode { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RepeatePassword { get; set; }
        public bool WindowsAuthenticate { get; set; }
    }
}