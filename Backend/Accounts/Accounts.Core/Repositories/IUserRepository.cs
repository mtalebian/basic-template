using Common.Data;

namespace Accounts.Core
{
    public interface IUserRepository<TUser>  : IRepository<TUser, long> where TUser : User
    {
    }
}