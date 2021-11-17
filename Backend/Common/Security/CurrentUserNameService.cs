using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Common.Security
{
    public class CurrentUserNameService : ICurrentUserNameService
    {
        //private readonly HttpContext Context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public string UserName
        {
            get
            {
                //return Context.User.Identity.Name;
                return _httpContextAccessor.HttpContext.User.Identity.Name;
            }
        }


        public CurrentUserNameService(IHttpContextAccessor httpContextAccessor)
        {
            //Context = context;
            _httpContextAccessor = httpContextAccessor;
        }
    }
}
