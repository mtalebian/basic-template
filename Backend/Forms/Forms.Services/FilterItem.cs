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
    public class FilterItem
    {
        public bool Include { get; set; }
        public string Expr { get; set; }


        public FilterItem()
        {
        }

        public static FilterItem Parse(string name, string filter, bool quote, bool unicode)
        {
            if (string.IsNullOrEmpty(filter)) return null;
            var item = new FilterItem { Include = true };

            switch (filter[0])
            {
                case '!':
                    var result = Parse(name, filter.Substring(1), quote, unicode);
                    result.Include = false;
                    return result;

                case '=':
                    item.Expr = $"{name}={DbValue(filter.Substring(1), quote, unicode)}";
                    return item;

                case '*':
                    filter = filter.Replace('*', '%');
                    item.Expr = $"{name} like {DbValue(filter.Substring(1), quote, unicode)}";
                    return item;

                case '>':
                    if (filter.Length > 1 && filter[1] == '=')
                        item.Expr = $"{name}>={DbValue(filter.Substring(2), quote, unicode)}";
                    else
                        item.Expr = $"{name}>{DbValue(filter.Substring(1), quote, unicode)}";
                    return item;

                case '<':
                    if (filter.Length > 1 && filter[1] == '=')
                        item.Expr = $"{name}>={DbValue(filter.Substring(2), quote, unicode)}";
                    else
                        item.Expr = $"{name}<{DbValue(filter.Substring(1), quote, unicode)}";
                    return item;


                default:
                    if (filter.Length > 1 && filter[filter.Length - 1] == '*')
                    {
                        filter = filter.Replace('*', '%');
                        item.Expr = $"{name} like {DbValue(filter.Substring(1), quote, unicode)}";
                        return item;
                    }
                    else 
                    {
                        var i = filter.IndexOf("...");
                        if (i >= 0)
                        {
                            var v1 = DbValue(filter.Substring(0, i), quote, unicode);
                            var v2 = DbValue(filter.Substring(i+4), quote, unicode);
                            item.Expr = $"({name} >={v1} and {name} <={v2})";
                            return item;
                        }
                        item.Expr = $"{name}={DbValue(filter, quote, unicode)}";
                        return item;
                    }
            }

        }

        private static object DbValue(string v, bool quote, bool unicode)
        {
            if (v == null) return "Null";
            v = v.Replace("'", "''");
            if (!quote) return v;
            var N = unicode ? "N" : "";
            return $"{N}'{v}'";
        }
    }
}