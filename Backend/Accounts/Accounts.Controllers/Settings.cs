using Microsoft.AspNetCore.Http;

namespace Accounts.Controllers
{
    public static class Settings
    {
        public const int DefaultExpiry = 10 * 60;
        public const string RefTokenCookieName = "x-refresh-token";
        public const string SessionIdCookieName = "x-session-id";


        public static CookieOptions GetCookieOption()
        {
            return new CookieOptions() { HttpOnly = true };
            //return new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Unspecified };
        }

    }
}
