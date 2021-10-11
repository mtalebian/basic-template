using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class UserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string NationalCode { get; set; }
        public bool WindowsAuthenticate { get; set; }
    }
}