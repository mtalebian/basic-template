using Common.Security;
using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;

namespace Forms.Services
{
    internal class AzService : IAzService
    {
        public IAzCheck AzCheck { get; }



        public AzService(IAzCheck azCheck)
        {
            AzCheck = azCheck;
        }

        public bool HasPermission(string azText, string userName, Dictionary<string, object> values)
        {
            if (azText == "*" && userName.eq("admin")) return true;
            var parameters = ConvertToParameters(values);
            return Validate(azText, userName, null, parameters).Length == 0;
        }


        private string[] Validate(string authorizationText, string userName, string applicationId, Dictionary<string, string> parameters)
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
            return AzCheck.Validate(userName, objectId, values);
        }

        private string GetParameterValue(string key, string userName, string applicationId, Dictionary<string, string> parameters)
        {
            if (string.IsNullOrEmpty(key) || key[0] != '@') return key;
            if (key.eq("@userName")) return userName;
            if (key.eq("@applicationId")) return applicationId;
            if (parameters.ContainsKey(key)) return parameters[key];
            return key;
        }

        private Dictionary<string, string> ConvertToParameters(Dictionary<string, object> values)
        {
            var res = new Dictionary<string, string>();
            if (values == null) return res;
            foreach (var k in values.Keys)
            {
                var j = (JsonElement)values[k];
                switch (j.ValueKind)
                {
                    case JsonValueKind.Array: res.Add(k, null); break;
                    case JsonValueKind.String: res.Add(k, j.GetString()); break;
                    case JsonValueKind.Number: res.Add(k, j.GetDouble().ToString()); break;
                    case JsonValueKind.True: res.Add(k, "1"); break;
                    case JsonValueKind.False: res.Add(k, "0"); break;
                    default: res.Add(k, null); break;
                }
            }
            return res;
        }

    }
}