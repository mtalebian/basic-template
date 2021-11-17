using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class UserRoleGridDTO
    {
        public string projectId { get; set; }
        public long UserId { get; set; }
        public string RoleId { get; set; }
        public string RoleTitle { get; set; }
        public string UserName { get; set; }
        public string CreateBy { get; set; }
        public string CreateAt { get; set; }

    }
}