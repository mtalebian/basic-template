using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class UserCompositeRoleGridDTO
    {
        public string projectId { get; set; }
        public int UserId { get; set; }
        public string CompositeRoleId { get; set; }
        public string CompositeRoleTitle { get; set; }
        public string UserName { get; set; }
        public string CreateBy { get; set; }
        public string CreateAt { get; set; }

    }
}