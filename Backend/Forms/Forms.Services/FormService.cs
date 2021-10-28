using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;

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

        public IList<Table> GetTables(string projectId, int groupId)
        {
            return db.Tables.Where(x => x.ProjectId == projectId && x.GroupId == groupId);
        }

        public Table GetTable(string projectId, string name)
        {
            return db.Tables.FirstOrDefault(x => x.ProjectId == projectId && x.Name == name);
        }

        public IList<Column> GetColumns(string projectId, string tableName)
        {
            return db.Columns.Where(x => x.ProjectId == projectId && x.TableName == tableName).OrderBy(x => x.OrdinalPosition).ToList();
        }

        public DataTable ExecuteSelect(Table table, IList<Column> columns, Dictionary<string, object[]> filters)
        {
            var fields = columns.Select(x => x.Name).ToArray();
            var where = new List<string>();
            var sql = $"select {string.Join(",", fields)} from {table.Name}";
            db.GetDataTable(sql);
            if (filters != null)
            {
                foreach (var filter in filters.Where(x => x.Value != null && x.Value.Length > 1))
                {
                    var c = columns.FirstOrDefault(x => x.Name == filter.Key);
                    if (c != null && !string.IsNullOrEmpty(c.Filter))
                    {
                        var rop = filter.Value[0] as string;
                        var values = filter.Value.Skip(1).ToArray();
                        switch (rop)
                        {
                            case "=":
                            case "<>":
                                where.Add("(" + string.Join(" OR ", values.Select(x => ToDbCondition(c, rop, x))) + ")");
                                break;

                            case "<":
                            case "<=":
                            case ">":
                            case ">=":
                                where.Add(ToDbCondition(c, rop, values[0]));
                                break;

                            case "in":
                                where.Add(ToDbCondition(c, ">=", values[0]));
                                where.Add(ToDbCondition(c, "<=", values[1]));
                                break;

                            case "!in":
                                where.Add(ToDbCondition(c, "<=", values[0]));
                                where.Add(ToDbCondition(c, ">=", values[1]));
                                break;

                            default:
                                break;
                        }
                    }
                }
            }
            if (where.Count > 0) sql += " where" + string.Join(" AND ", where);
            return db.GetDataTable(sql);
        }

        private string ToDbCondition(Column c, string rop, object v)
        {
            if (v == null)
            {
                if (rop == "=") return $"{c.Name} is null";
                if (rop == "<>") return $"{c.Name} is not null";
            }
            var s = $"{v}";
            if (c.DataType == "varchar" || c.DataType == "nvarchar")
            {
                s = s.Replace("'", "''");
            }
            return $"{c.Name} {rop} '{s}";
        }

        public void ExecuteInsert(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var fields = new List<string>();
            var fields_value = new List<string>();
            var columns = db.Columns.Where(x => x.ProjectId == tb.ProjectId && x.TableName == tb.Name);
            foreach (var c in columns)
            {
                var v = values.ContainsKey(c.Name) ? values[c.Name] : null;
                if (v != null)
                {
                    fields.Add(c.Name);
                    fields_value.Add(GetDbValue(c, values));
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
            var qValues = string.Join(", ", fields_value);
            db.ExecuteSql($"insert {tableName} ({qFields}) values({qValues})");
        }

        public void ExecuteUpdate(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var list = new List<string>();
            var columns = db.Columns.Where(x => x.ProjectId == tb.ProjectId && x.TableName == tb.Name);
            foreach (var c in columns)
            {
                if (!c.IsPK && values.ContainsKey(c.Name))
                {
                    list.Add($"{c.Name} = " + GetDbValue(c, values));
                }
            }
            var qSet = string.Join(", ", list);
            var qWhere = GetWhereClause(tb, values, true);
            var sql = $"update {tableName} set {qSet} {qWhere}";
            db.ExecuteSql(sql);
        }

        private string GetDbValue(Column c, Dictionary<string, object> values)
        {
            var v = values[c.Name];
            if (v == null) return "Null";
            if (v is JsonElement)
            {
                var j = (JsonElement)v;
                switch (j.ValueKind)
                {
                    case JsonValueKind.Undefined: return "Null";
                    case JsonValueKind.Object: throw new Exception("Invalid value for property: " + c.Name);
                    case JsonValueKind.Array: throw new Exception("Invalid value for property: " + c.Name);
                    case JsonValueKind.String:
                        v = j.GetString();
                        break;

                    case JsonValueKind.Number:
                        v = j.GetInt64();
                        break;

                    case JsonValueKind.True:
                        v = j.GetBoolean();
                        break;

                    case JsonValueKind.False:
                        v = j.GetBoolean();
                        break;

                    case JsonValueKind.Null:
                        return "Null";

                    default:
                        throw new Exception("Unhandled ValueKind: " + j.ValueKind);
                }
            }
            var s = v as string;
            if (!string.IsNullOrEmpty(s) && s.ToLower() == "null") return s;
            if (c.DataType == "bit")
            {
                if (v is bool) return !(bool)v ? "0" : "1";
                if (v is int) return 0 == (int)v ? "0" : "1";
                return !string.IsNullOrEmpty(s) && s.ToLower() == "true" || s == "1" ? "1" : "0";
            }
            if (c.DataType == "varchar" || c.DataType == "text")
            {
                return "'" + s.Replace("'", "''") + "'";
            }
            if (c.DataType == "nvarchar" || c.DataType == "ntext")
            {
                return "N'" + s.Replace("'", "''") + "'";
            }
            if (c.DataType == "datetime")
            {
                throw new Exception("DateTime type is not handled!!");
            }
            return v.ToString().Replace("'", "");
        }

        public void ExecuteDelete(string tableName, Dictionary<string, object> values)
        {
            var tb = db.Tables.FirstOrDefault(x => x.Name == tableName);
            if (tb == null) throw new Exception($"Table '{tableName}' not found!");
            var qWhere = GetWhereClause(tb, values, true);
            var sql = $"delete {tableName} {qWhere}";
            db.ExecuteSql(sql);
        }

        private string GetWhereClause(Table tb, Dictionary<string, object> values, bool pkOnky)
        {
            var w = new List<string>();
            var columns = db.Columns.Where(x => x.ProjectId == tb.ProjectId && x.TableName == tb.Name);
            foreach (var c in columns)
            {
                if (pkOnky && (!values.ContainsKey(c.Name) || values[c.Name] == null))
                {
                    throw new Exception($"Value of column '{c.Name}' is empty!");
                }

                if (!pkOnky || c.IsPK)
                {
                    w.Add($"{c.Name} = " + GetDbValue(c, values));
                }
            }
            if (w.Count < 1) throw new Exception("Where clause is empty!");
            return "where " + string.Join(" and ", w);
        }

    }
}