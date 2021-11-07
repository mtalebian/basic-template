using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Accounts.Data
{
    public class AzObjectFieldRepository : Repository<AzObjectField, string, string>, IAzObjectFieldRepository
    {
        private AccountDbContext db;
        public AzObjectFieldRepository(AccountDbContext context) : base(context)
        {
            db = context;
        }
        public IList<AzObjectField> GetAll(string projectId)
        {
            return Entities.Include(x=>x.AzField).Include(z=>z.AzObject).Where(x => x.AzObject.Project.Id == projectId).ToList();
        }


    }
}