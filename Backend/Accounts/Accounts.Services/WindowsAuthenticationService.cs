using Accounts.Core;
using Common;
using Microsoft.Extensions.Options;

namespace Accounts.Services
{
    internal class WindowsAuthenticationService<TUser> : FormAuthenticationService<TUser> where TUser : User
    {
        const string DefaultDomainName = "ikco.com";


        public WindowsAuthenticationService(IAccountUnitOfWork<TUser> db, IOptions<AccountsConfig> accountsConfig, IOptions<JwtConfig> jwtConfig) :
            base(db, accountsConfig, jwtConfig)
        {
        }

        private void GetDomainName(string userName, out string domainName, out string domainUser)
        {
            domainName = DefaultDomainName;
            domainUser = userName;
            if (userName.Contains('@'))
            {
                var p = userName.Split('@');
                domainName = p[1];
                domainUser = p[0];
            }
            else if (userName.Contains('\\'))
            {
                var p = userName.Split('\\');
                domainName = p[0];
                domainUser = p[1];
            }
        }


        public override bool VerifyPassword(TUser user, string password)
        {
            try
            {
                GetDomainName(user.UserName, out string domainName, out string domainUser);
                return WindowsUserInfo.IsValid(domainName, domainUser, password);
            }
            catch
            {
                return false;
            }
        }

    }
}
