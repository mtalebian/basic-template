using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class ApplicationService : IApplicationService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public ApplicationService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }
        public Application GetApplication(string id)
        {
            return db.Applications.FirstOrDefault(x => x.Id == id);
        }
        public Application GetApplicationByTitle(string title)
        {
            return db.Applications.Where(x => x.Title == title).FirstOrDefault();
        }
    }
}
