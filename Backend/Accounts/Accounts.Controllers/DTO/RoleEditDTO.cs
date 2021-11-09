using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RoleEditDTO
    {

        [Required(ErrorMessage = "ProjectId Is Required")]
        public string ProjectId { get; set; }

        [Required(ErrorMessage = "Id Is Required")]
        [MaxLength(30,ErrorMessage = "maximum length For Id {1} characters allowed")]
        public string Id { get; set; }

        [MaxLength(450, ErrorMessage = "maximum length For ApplicationId {1} characters allowed")]
        public string ApplicationTitle { get; set; }

        [Required(ErrorMessage = "Title Is Required")]
        [MaxLength(150, ErrorMessage = "maximum length For Title {1} characters allowed")]
        public string Title { get; set; }

        public List<AuthorizationDTO> Authorizations { get; set; }
    }
}