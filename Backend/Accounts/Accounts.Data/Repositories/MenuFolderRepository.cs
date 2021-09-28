using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class MenuFolderRepository : Repository<MenuFolder, string, string>, IMenuFolderRepository
    {
        public MenuFolderRepository(AccountDbContext context) : base(context)
        {
        }
    }
}