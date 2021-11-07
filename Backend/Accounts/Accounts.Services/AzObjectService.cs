using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class AzObjectService : IAzObjectService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        private readonly AccountsConfig _AccountsConfig;
        public AzObjectService(IOptions<AccountsConfig> accountsConfig, IAccountUnitOfWork<User> db)
        {
            this.db = db;
            this._AccountsConfig = accountsConfig.Value;
        }


        public IList<AzObject> GetAzObjects(string projectId)
        {
           return db.AzObjects.Where(x => x.Project.Id == projectId && x.AzObjectFields.Any()).ToList();
        }

        public AzObject GetAzObjectById(string projectId, string id)
        {
            return db.AzObjects.FirstOrDefault(x => x.Project.Id == projectId && x.Id == id);
        }
    }
}
