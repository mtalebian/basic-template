using Forms.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Forms.Services
{
    public static class FilterParser
    {

        public static void AddFilter(List<string> where, IList<GridColumn> columns, Dictionary<string, object> filters)
        {
            if (filters == null) return;
            foreach (var filter in filters)
            {
                var name = filter.Key;
                var column = columns.FirstOrDefault(x => x.Name == name);
                var elem = (JsonElement)filter.Value;
                switch (elem.ValueKind)
                {
                    case JsonValueKind.True:
                        where.Add($"{name}=1");
                        break;

                    case JsonValueKind.False:
                        where.Add($"{name}=0");
                        break;

                    case JsonValueKind.Number:
                        where.Add($"{name}={elem.GetDouble()}");
                        break;

                    case JsonValueKind.String:
                        var s = elem.GetString();
                        if (!string.IsNullOrEmpty(s))
                        {
                            var exclude = s[0] == '!';
                            if (exclude)
                            {
                                s = s.Substring(1);
                            }
                            var expr = ParseStringValue(name, s, column.IsString, column.IsUnicode);
                            where.Add(exclude ? $"not ({expr})" : expr);
                        }
                        break;

                    case JsonValueKind.Array:
                        AddMultiValueFilter(where, column, elem);
                        break;

                    default:
                        throw new Exception($"Error in AddFilter(): Unexpected value {elem.ValueKind}: {elem.ToString()}");
                }
            }
        }

        private static void AddMultiValueFilter(List<string> where, GridColumn column, JsonElement elem)
        {
            var includes = new List<string>();
            var excludes = new List<string>();
            var name = column.Name;
            var n = elem.GetArrayLength();

            for (int i = 0; i < n; i++)
            {
                var value = elem[i];
                switch (value.ValueKind)
                {
                    case JsonValueKind.String:
                        var s = value.ToString();
                        if (!string.IsNullOrEmpty(s))
                        {
                            var list = includes;
                            if (s[0] == '!')
                            {
                                list = excludes;
                                s = s.Substring(1);
                            }
                            var expr = ParseStringValue(name, s, column.IsString, column.IsUnicode);
                            list.Add(expr);
                        }
                        break;

                    case JsonValueKind.Number:
                        includes.Add($"{name}={value.GetDouble()}");
                        break;

                    case JsonValueKind.True:
                        includes.Add($"{name}=1");
                        break;

                    case JsonValueKind.False:
                        includes.Add($"{name}=0");
                        break;

                    default:
                        throw new Exception($"Error in AddMultiValueFilter(): Unexpected value {elem.ValueKind}: {elem.ToString()}");
                }
            }

            if (includes.Count > 0)
            {
                var expr = string.Join(" and ", includes);
                where.Add(expr);
            }

            if (excludes.Count > 0)
            {
                var expr = string.Join(" or ", excludes);
                where.Add($"not({expr})");
            }
        }


        private static string ParseStringValue(string name, string filter, bool quote, bool unicode)
        {
            if (filter.eq("<EMPTY>"))
            {
                return quote ? $"({name} is NULL or {name}='')" : $"{name} is NULL";
            }

            switch (filter[0])
            {
                case '=': return $"{name}={DbValue(filter.Substring(1), quote, unicode)}";

                case '*':
                    filter = filter.Replace('*', '%');
                    return $"{name} like {DbValue(filter.Substring(1), quote, unicode)}";

                case '>':
                    if (filter.Length > 1 && filter[1] == '=')
                        return $"{name}>={DbValue(filter.Substring(2), quote, unicode)}";
                    return $"{name}>{DbValue(filter.Substring(1), quote, unicode)}";

                case '<':
                    if (filter.Length > 1 && filter[1] == '=')
                        return $"{name}<={DbValue(filter.Substring(2), quote, unicode)}";
                    return $"{name}<{DbValue(filter.Substring(1), quote, unicode)}";


                default:
                    if (filter.Length > 1 && filter[filter.Length - 1] == '*')
                    {
                        filter = filter.Replace('*', '%');
                        return $"{name} like {DbValue(filter.Substring(1), quote, unicode)}";
                    }
                    else
                    {
                        var i = filter.IndexOf("...");
                        if (i >= 0)
                        {
                            var v1 = DbValue(filter.Substring(0, i), quote, unicode);
                            var v2 = DbValue(filter.Substring(i + 4), quote, unicode);
                            return $"({name} >={v1} and {name} <={v2})";
                        }
                        return $"{name}={DbValue(filter, quote, unicode)}";
                    }
            }
        }

        public static object DbValue(string v, bool quote, bool unicode)
        {
            if (v == null) return "Null";
            v = v.Replace("'", "''");
            if (!quote) return v;
            var N = unicode ? "N" : "";
            return $"{N}'{v}'";
        }
    }
}