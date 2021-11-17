using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class ChangePasswordDTO
    {
        public string UserName { get; set; }

        [Required(ErrorMessage = "گذرواژه قبلي را وارد كنيد")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "گذرواژه جديد را وارد كنيد")]
        [MinLength(3, ErrorMessage = "حداقل طول گذرواژه 3 كاراكتر است")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "تكرار گذرواژه صحيح نيست")]
        public string RepeatePassword { get; set; }

    }
}