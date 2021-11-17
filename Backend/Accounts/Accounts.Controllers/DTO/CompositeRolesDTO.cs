using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class InsertUserRoleDTO
    {

        [Required(ErrorMessage = "ProjectId Is Required")]
        public string ProjectId { get; set; }

        [Required(ErrorMessage = "RoleId Is Required")]
        public string RoleId { get; set; }

        [Required(ErrorMessage = "UserId Is Required")]
        public long UserId { get; set; }
    }
}