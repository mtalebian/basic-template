using Accounts.Core;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class AuthorizationDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<AzFieldDTO> Fields { get; set; }
    }
}