using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class UserInsertDTO
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "نام را وارد كنيد")]
        [MinLength(3,ErrorMessage = "حداقل طول نام 3 كاراكتر مي باشد")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "نام خانوادگي را وارد كنيد")]
        [MinLength(3, ErrorMessage = "حداقل طول نام خانوادگي 3 كاراكتر مي باشد")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "نام كاربري را وارد كنيد")]
        [MinLength(5, ErrorMessage = "حداقل طول نام كاربري 5 كاراكتر مي باشد")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "كدملي را وارد كنيد")]
        public string NationalCode { get; set; }


        [DataType(DataType.EmailAddress,ErrorMessage = "ايميل نامعتبر است")]
        public string Email { get; set; }

        
        public string Password { get; set; }

        [Compare("Password",ErrorMessage ="تكرار گذرواژه صحيح نيست")]
        public string RepeatePassword { get; set; }

        [RegularExpression(@"^09[0|1|2|3][0-9]{8}$", ErrorMessage = "شماره تلفن نامعتبر است")]
        public string PhoneNumber { get; set; }

        public bool WindowsAuthenticate { get; set; }
    }
}