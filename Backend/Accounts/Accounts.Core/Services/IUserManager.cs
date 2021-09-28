using System.Collections.Generic;

namespace Accounts.Core
{
    public interface IUserManager<TUser> where TUser : User
    {
        List<TUser> GetAllUsers();
        void CreateUser(TUser user);
        void UpdateUser(TUser user);
        void DeleteUser(TUser user);

    }
}