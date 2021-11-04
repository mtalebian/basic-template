using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RoleInsertDTO
    {
        [Required(ErrorMessage = "ProjectId Is Required")]
        [MaxLength(30, ErrorMessage = "maximum length For ProjectId {1} characters allowed")]
        public string ProjectId { get; set; }

        [Required(ErrorMessage = "Id Is Required")]
        [MaxLength(30,ErrorMessage = "maximum length For Id {1} characters allowed")]
        public string Id { get; set; }

        [MaxLength(450, ErrorMessage = "maximum length For ApplicationId {1} characters allowed")]
        public string ApplicationId { get; set; }

        [Required(ErrorMessage = "CompositeRoleId Is Required")]
        [MaxLength(50, ErrorMessage = "maximum length For CompositeRoleId {1} characters allowed")]
        public string CompositeRoleId { get; set; }

        [Required(ErrorMessage = "Title Is Required")]
        [MaxLength(150, ErrorMessage = "maximum length For Title {1} characters allowed")]
        public string Title { get; set; }
    }
}