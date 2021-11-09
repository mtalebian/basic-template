using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class AzFieldService : IAzFieldService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        private readonly AccountsConfig _AccountsConfig;
        public AzFieldService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<User> db)
        {
            this.db = db;
            this._AccountsConfig = accountsConfig.Value;
        }
        public IList<AzField> GetAzFieldsByObjectId(string projectId,string objectId)
        {
            return db.AzFields.Where(x => x.Project.Id == projectId && x.AzObjectFields.Any(x=>x.ObjectId==objectId)).ToList();
        }
        public AzField GetAzField(string id)
        {
            return db.AzFields.FirstOrDefault(x => x.Id == id);
        }
    }
}
