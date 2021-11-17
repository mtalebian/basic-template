using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class RoleDetailsDTO
    {

        public List<AuthorizationDTO> Authorizations { get; set; }

        public string Id { get; set; }
        public string ApplicationTitle { get; set; }
        public string Title { get; set; }
    }
}