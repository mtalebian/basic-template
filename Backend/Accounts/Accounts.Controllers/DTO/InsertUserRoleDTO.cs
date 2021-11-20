using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class CompositeRolesDTO
    {

        [Required(ErrorMessage = "ProjectId Is Required")]
        public string ProjectId { get; set; }

        [Required(ErrorMessage = "Id Is Required")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Title Is Required")]
        public string Title { get; set; }

        public List<RoleDTO> Roles  { get; set; }
    }
}