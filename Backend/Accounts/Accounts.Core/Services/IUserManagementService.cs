using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IUserManagementService<TUser> where TUser : User
    {
        IList<User> GetUsers();
        User GetUser(string nationalCode);
        void Insert(User user);
        User Update(User user);
        void DeleteUser(string nationalCode);

        void ChangePassword(long userId, string newPassword);

    }
}