using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounts.Core
{
    public interface IUserService
    {
        IList<User> GetUsers();
        User GetUser(string nationalCode);
        User GetUser(long UserId);
        User GetUserByUserName(string userName);
        void Insert(User user);
        User Update(User user);
        void DeleteUser(string nationalCode);
        void DeleteUser(long userId);

        void ChangePassword(long userId, string newPassword);

    }
}