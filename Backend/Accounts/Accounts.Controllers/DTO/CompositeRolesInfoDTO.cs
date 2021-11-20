using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class CompositeRolesInfoDTO
    {
       public List<CompositeRolesDTO> CompositeRoles { get; set; }

        public List<RoleDTO> Roles { get; set; }
    }
}