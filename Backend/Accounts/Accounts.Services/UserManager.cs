using Accounts.Core;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace Accounts.Services
{
    internal class UserManagerService<TUser> where TUser : User
    {
        protected IAccountUnitOfWork<TUser> db { get; }
        private readonly AccountsConfig _AccountsConfig;


        public UserManagerService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<TUser> db)
        {
            this.db = db;
            _AccountsConfig = accountsConfig.Value;
        }


    }
}