using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class UserInsertDTO
    {
        [Required(ErrorMessage = "Enter the FirstName value")]
        [MinLength(3,ErrorMessage = "The length FirstName is at least 3 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Enter the LastName value")]
        [MinLength(3, ErrorMessage = "The length LastName is at least 3 characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Enter the UserName value")]
        [MinLength(5, ErrorMessage = "The length UserName is at least 5 characters")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Enter the NationalCode value")]
        public string NationalCode { get; set; }

        [Required(ErrorMessage = "Enter the Email value")]
        [DataType(DataType.EmailAddress,ErrorMessage = "Invalid email")]
        public string Email { get; set; }

        public string Password { get; set; }

        [Compare("Password",ErrorMessage ="تكرار گذرواژه صحيح نيست")]
        public string RepeatePassword { get; set; }

        public bool WindowsAuthenticate { get; set; }
    }
}