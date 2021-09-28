using DeviceDetectorNET;
using DeviceDetectorNET.Cache;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Core
{
    public class UserAgent
    {
        public int Id { get; set; }

        public string Value { get; set; }
        public string OS { get; set; }
        public string Browser { get; set; }
        public string Device { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<UserSession> UserSessions { get; set; }



        public UserAgent()
        {
        }

        public UserAgent(string userAgent)
        {
            Value = userAgent;
            Parse();
        }

        public void Parse()
        {
            var dd = new DeviceDetector(Value);
            dd.SetCache(new DictionaryCache());
            dd.DiscardBotInformation();
            dd.SkipBotDetection();

            dd.Parse();

            if (dd.IsBot())
            {
                var bot = dd.GetBot();
                Device = bot.Success ? $"{bot.Match.Name} {bot.Match.Category}" : null;
            }
            else
            {
                var ci = dd.GetClient();
                var os = dd.GetOs();
                Device = dd.GetDeviceName();
                Brand = dd.GetBrandName();
                Model = dd.GetModel();
                Browser = ci.Success ? ci.Match.Name + " " + ci.Match.Version : null;
                OS = os.Success ? os.Match.Name + " " + os.Match.Version + " " + os.Match.Platform : null;
            }
        }
    }
}