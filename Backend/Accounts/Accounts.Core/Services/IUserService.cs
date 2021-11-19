using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IUserService
    {
        IList<User> GetUsers();
        User GetUser(string nationalCode);
        User GetUser(int userId);
        User GetUserByUserName(string userName);
        void Insert(User user);
        User Update(User user);
        void DeleteUser(string nationalCode);
        void DeleteUser(int userId);

        void ChangePassword(int userId, string newPassword);

    }
}