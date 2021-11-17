using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RolesInfoDTO
    {
       public List<RoleDTO> Roles { get; set; }

        public List<AzObjectDTO> AzObjects { get; set; }
    }
}