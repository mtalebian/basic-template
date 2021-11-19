using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class UserRepository<TUser>: Repository<TUser, int>, IUserRepository<TUser> where TUser : User
    {
        public UserRepository(AccountDbContext context) : base(context)
        {
        }
    }
}