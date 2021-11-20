using Accounts.Core;
using Common.Security;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Accounts.Services
{
    internal class AzCheckService : IAzCheck
    {
        private protected IAccountUnitOfWork<User> db { get; }


        public AzCheckService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }

        public string[] Validate(string userName, string objectId, Dictionary<string, string> values)
        {
            if (userName.eq("admin") && objectId == "*" && values.Count == 0)
            {
                return new string[0];
            }
            var res = new List<string>();
            var user = db.Users.FirstOrDefault(x => x.UserName == userName);
            var list = db.AzValues.GetAzValues(user.Id, objectId);
            if (list.Count == 0) res.Add(objectId);
            foreach (var k in values.Keys)
            {
                var v = values[k];
                if (!list.Any(x => x.FieldId.eq(k) && x.Value.eq(v)))
                    res.Add($"{objectId}, {k} = {v}");
            }
            return res.ToArray();
        }

    }
}