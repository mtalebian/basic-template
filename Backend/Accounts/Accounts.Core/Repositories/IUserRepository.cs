using Common.Data;

namespace Accounts.Core
{
    public interface IUserRepository<TUser>  : IRepository<TUser, int> where TUser : User
    {
    }
}