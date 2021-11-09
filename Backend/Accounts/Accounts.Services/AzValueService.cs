using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class AzValueService : IAzValueService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public AzValueService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }
      
        public IList<AzValue> GetAzValueByAuthorizationId(int id)
        {
            return db.AzValues.Where(x => x.AuthorizationId == id).ToList();
        }

        public AzValue GetAzValue(int serial)
        {
            return db.AzValues.Where(x => x.Serial == serial).FirstOrDefault();
        }
        public void InsertAzValue(AzValue item)
        {
            db.AzValues.Add(item);
            db.SaveChanges();
        }
        public void DeleteAzValue(int serial)
        {
            var azValue = GetAzValue(serial);
            if (azValue is null) throw new Exception("Record not found!");
            db.AzValues.Remove(azValue);
            db.SaveChanges();
        }
        public void DeleteAzValues(IList<AzValue> azValues)
        {
            db.AzValues.RemoveRange(azValues);
            db.SaveChanges();
        }
    }
}
