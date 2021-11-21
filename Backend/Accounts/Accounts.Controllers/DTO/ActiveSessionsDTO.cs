using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Accounts.Controllers
{
    public class ActiveSessionsDTO
    {
        public bool CurrentSession { get; set; }

        public long UserSessionId { get; set; }

        public string ApplicationAndOSTitle { get; set; }

        public string DeviceAndOSTitle { get; set; }

        public string IP { get; set; }

        public string SessionDate { get; set; }

    }
}