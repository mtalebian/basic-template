using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RoleDTO
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }
        public string ApplicationId { get; set; }
        public string Title { get; set; }
    }
}