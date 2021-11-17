using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class ProfileInfoDTO
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string NationalCode { get; set; }


        [DataType(DataType.EmailAddress, ErrorMessage = "ايميل نامعتبر است")]
        public string Email { get; set; }


        [RegularExpression(@"^09[0|1|2|3][0-9]{8}$", ErrorMessage = "شماره تلفن نامعتبر است")]
        public string PhoneNumber { get; set; }

        public bool WindowsAuthenticate { get; set; }
    }
}