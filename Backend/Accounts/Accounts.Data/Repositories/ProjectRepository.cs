using Accounts.Core;
using Common.Data;

namespace Accounts.Data
{
    public class ProjectRepository : Repository<Project, string>, IProjectRepository
    {
        public ProjectRepository(AccountDbContext context) : base(context)
        {
        }
    }
}