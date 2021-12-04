using System;
using Common.Data.Schema;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public static class DbManagerHelper
    {

        public static string GetChangeScript<T>(this IEnumerable<T> obj1, IEnumerable<T> obj2, string dbObjectType) where T : IDbManagerNamedObject<T>
        {
            var sb = new StringBuilder();
            foreach (var a in obj1)
            {
                var b = obj2.FindByName(a);
                if (b == null) sb.AppendLine("-- drop " + dbObjectType + " '" + a.ToString() + "'");
                else
                {
                    var cs = a.GetChangeScript(b);
                    if (!string.IsNullOrEmpty(cs))
                    {
                        sb.AppendLine("-- " + dbObjectType + ":  '" + a.ToString() + "'");
                        sb.AppendLine(cs);
                    }
                }
            }
            //-------------
            foreach (var b in obj2)
            {
                var a = obj1.FindByName(b);
                if (a == null) sb.AppendLine("-- add " + dbObjectType + " '" + b.ToString() + "'");
            }
            return sb.Length > 0 ? sb.ToString() : null;
        }

        public static T FindByName<T>(this IEnumerable<T> list, IDbManagerNamedObject<T> obj) where T : IDbManagerNamedObject<T>
        {
            foreach (var item in list)
                if (obj.Name.eq(item.Name))
                    return item;
            return default(T);
        }

        public static T FindByName<T>(this IEnumerable<T> list, IDbManagerOwnerNamedObject<T> obj) where T : IDbManagerOwnerNamedObject<T>
        {
            foreach (var item in list)
                if (obj.Owner.eq(item.Owner) && obj.Name.eq(item.Name))
                    return item;
            return default(T);
        }



        public static T FindByName<T>(this IEnumerable<T> list, string name) where T : IDbManagerNamedObject<T>
        {
            foreach (var item in list)
                if (item.Name.eq(name))
                    return item;
            return default(T);
        }

    }
}