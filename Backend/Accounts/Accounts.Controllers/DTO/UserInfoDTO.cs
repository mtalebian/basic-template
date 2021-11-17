using System.Collections.Generic;

namespace Accounts.Controllers
{
    public class UserInfoDTO
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public int Expiry { get; set; }

        public string ProjectTitle { get; set; }
    }
}