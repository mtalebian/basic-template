using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RoleDTO
    {
        public string Id { get; set; }

        public string ApplicationTitle { get; set; }
        public string Title { get; set; }
    }
}