using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Accounts.Data
{
    public class MenuRepository : Repository<Menu, string, string>, IMenuRepository
    {
        public MenuRepository(AccountDbContext context) : base(context)
        {
        }
    }
}