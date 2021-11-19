using Accounts.Core;
using Common.Security;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Accounts.Services
{
    internal class AzCheckService : IAzCheckService
    {
        private protected IAccountUnitOfWork<User> db { get; }


        public AzCheckService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }

        public string[] Validate(string authorizationText, string userName, string applicationId, Dictionary<string, string> parameters)
        {
            if (string.IsNullOrEmpty(authorizationText)) return new string[] { "AzCheck: Authorization not defined!" };
            var p = authorizationText.Split(',');
            var objectId = p[0];
            var values = new Dictionary<string, string>();
            for (int i = 0; i < values.Count; i++)
            {
                var nv = p[i].Split('=');
                if (nv.Length != 2) throw new Exception($"AzCheck: Invalid authorization text '{authorizationText}'");
                var n = nv[0].Trim();
                var v = nv[1].Trim();
                if (string.IsNullOrEmpty(n)) throw new Exception($"AzCheck: Invalid authorization text '{authorizationText}'");
                if (string.IsNullOrEmpty(v)) throw new Exception($"AzCheck: Invalid authorization text '{authorizationText}'");
                values[n] = GetParameterValue(v, userName, applicationId, parameters);

            }
            return Validate(userName, objectId, values);
        }

        public string GetParameterValue(string key, string userName, string applicationId, Dictionary<string, string> parameters)
        {
            if (string.IsNullOrEmpty(key) || key[0] != '@') return key;
            if (key.eq("@userName")) return userName;
            if (key.eq("@applicationId")) return applicationId;
            if (parameters.ContainsKey(key)) return parameters[key];
            return key;
        }

        public string[] Validate(string userName, string objectId, Dictionary<string, string> values)
        {
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