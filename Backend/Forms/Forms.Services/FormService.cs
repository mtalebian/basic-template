using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Forms.Services
{
    internal class FormService : IFormService
    {
        private readonly IFormUnitOfWork db;


        public FormService(IFormUnitOfWork db)
        {
            this.db = db;
        }


        public IList<Group> GetAllGroups(string projectId)
        {
            return db.Groups.Where(x => x.ProjectId == projectId);
        }

        public Table GetTable(string projectId, string name)
        {
            return db.Tables.FirstOrDefault(x => x.ProjectId == projectId && x.Name == name);
        }

        public Dictionary<string, object> ExecuteSelect(string tableName, Dictionary<string, object> values)
        {
            throw new NotImplementedException();
        }

        public void ExecuteInsert(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var parameters = new Dictionary<string, object>();
            var fields = new List<string>();
            foreach (var c in tb.Columns)
            {
                var v = values.ContainsKey(c.Name) ? values[c.Name] : null;
                if (v != null)
                {
                    fields.Add(c.Name);
                    AddParameter(parameters, c.Name, values);
                }
                else
                {
                    if (c.IsPK)
                    {
                        throw new Exception($"Value of column '{c.Name}' is null!");
                    }
                }
            }
            var qFields = string.Join(", ", fields);
            var qValues = "@" + string.Join(", @", fields);
            db.ExecuteSql($"insert {tableName} ({qFields}) values({qValues})", parameters);
        }

        public void ExecuteUpdate(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var parameters = new Dictionary<string, object>();
            var list = new List<string>();
            foreach (var c in tb.Columns)
            {
                if (!c.IsPK && values.ContainsKey(c.Name))
                {
                    var v = values[c.Name];
                    list.Add($"{c.Name} = @{c.Name}");
                    AddParameter(parameters, c.Name, values);
                }
            }
            var qSet = string.Join(", ", list);
            var qWhere = GetWhereClause(tb, parameters, values, true);
            var sql = $"update {tableName} set {qSet} {qWhere}";
            db.ExecuteSql(sql, parameters);
        }

        public void ExecuteDelte(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var parameters = new Dictionary<string, object>();
            var qWhere = GetWhereClause(tb, parameters, values, true);
            var sql = $"delete {tableName} {qWhere}";
            db.ExecuteSql(sql, parameters);
        }

        private static string GetWhereClause(Table tb, Dictionary<string, object> parameters, Dictionary<string, object> values, bool pkOnky)
        {
            var w = new List<string>();
            foreach (var c in tb.Columns)
            {
                if (pkOnky && (!values.ContainsKey(c.Name) || values[c.Name] == null))
                {
                    throw new Exception($"Value of column '{c.Name}' is empty!");
                }

                if (!pkOnky || c.IsPK)
                {
                    w.Add($"{c.Name} = @{c.Name}");
                    AddParameter(parameters, c.Name, values);
                }
            }
            if (w.Count < 1) throw new Exception("Where clause is empty!");
            return "where " + string.Join(" and ", w);
        }

        private static void AddParameter(Dictionary<string, object> parameters, string name, Dictionary<string, object> values)
        {
            if (!parameters.ContainsKey(name)) return;
            parameters.Add("@" + name, values[name]);
        }

    }
}