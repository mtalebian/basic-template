using System;
using System.Linq;

namespace Accounts.Core
{
    public class UserSession
    {
        public long Id { get; set; }

        public int UserId { get; set; }
        public string RefreshToken { get; set; }
        public int RefreshCount { get; set; } = 1;
        public DateTime RefreshTokenDate { get; set; } = DateTime.Now;
        public string ProjectId { get; set; }
        public string LastIP { get; set; }
        public string IPList { get; set; }
        public string IP { get; set; }
        public int UserAgentId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual UserAgent UserAgent { get; set; }

        [IgnoreMap]
        public virtual User User { get; set; }


        public UserSession()
        {
        }

        public UserSession(Project app, int userId, int userAgentId, string ip)
        {
            UserId = userId;
            ProjectId = app.Id;
            RefreshToken = Guid.NewGuid().ToString("N");
            RefreshTokenDate = DateTime.Now;
            RefreshCount = 1;

            UserAgentId = userAgentId;
            LastIP = ip;
            IPList = ip;
            IP = ip;
        }

        public string AddToIPList(string ip)
        {
            if (string.IsNullOrEmpty(IPList)) return ip;
            var list = IPList.Split(',').ToList();
            if (list.IndexOf(ip) >= 0) return IPList;
            list.Add(ip);
            var s = string.Join(",", list);
            return s.Length > 200 ? IPList : s;
        }
    }
}