using System.Collections.Generic;

namespace Accounts.Controllers
{
    public class UserUpdateDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string NationalCode { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsDisabled { get; set; }
        public bool WindowsAuthenticate { get; set; }
    }
}