using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace System
{
    public static class DataExtensions
    {
        public static bool IsEmpty(this Array self)
        {
            return self == null || self.Length == 0;
        }

        public static bool IsEmpty<T>(this List<T> self)
        {
            return self == null || self.Count == 0;
        }

        public static bool IsEmpty(this DataTable tb)
        {
            return tb == null || tb.Rows.Count == 0;
        }


        public static string AsString(this Dictionary<string, object> src, string key)
        {
            return src.ContainsKey(key) ? src[key] as string : null;
        }

        public static int AsInt(this Dictionary<string, object> src, string key, int defaultValue)
        {
            return src.ContainsKey(key) ? src[key].ToInt(defaultValue) : defaultValue;
        }

        public static int? AsInt(this Dictionary<string, object> src, string key)
        {
            return src.ContainsKey(key) ? src[key].ToInt() : null;
        }

        public static bool AsBool(this Dictionary<string, object> src, string key, bool defaultValue)
        {
            return src.ContainsKey(key) ? src[key].ToBool(defaultValue) : defaultValue;
        }

        public static Dictionary<string, object> AsDictionary(this Dictionary<string, object> src, string key)
        {
            return src.ContainsKey(key) ? src[key] as Dictionary<string, object> : null;
        }

        public static Dictionary<string, object>[] AsDictionaryArray(this Dictionary<string, object> src, string key)
        {
            return src.ContainsKey(key) ? src[key] as Dictionary<string, object>[] : null;
        }


        public static string AsString(this DataRowView source, string fieldName, string defaultValue)
        {
            if (source == null) return null;
            var v = source.AsString(fieldName);
            return string.IsNullOrEmpty(v) ? defaultValue : v;
        }

        public static string AsString(this DataRowView source, string fieldName)
        {
            if (source == null) return null;
            if (string.IsNullOrEmpty(fieldName)) return null;
            if (!source.DataView.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToString(source[fieldName]);
        }

        public static DateTime? AsDateTime(this DataRowView source, string fieldName)
        {
            if (source == null) return null;
            if (string.IsNullOrEmpty(fieldName)) return null;
            if (!source.DataView.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToDateTime(source[fieldName]);
        }

        public static int? AsInt(this DataRowView source, string fieldName)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return null;
            if (!source.DataView.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToInt32(source[fieldName]);
        }

        public static int AsInt(this DataRowView source, string fieldName, int defaultValue)
        {
            var v = AsInt(source, fieldName);
            return v ?? defaultValue;
        }

        public static int? AsInt(this DataRow source, string fieldName)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return null;
            if (!source.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToInt32(source[fieldName]);
        }

        public static int AsInt(this DataRow source, string fieldName, int defaultValue)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return defaultValue;
            if (!source.Table.Columns.Contains(fieldName)) return defaultValue;
            return Common.Convert.ToInt32(source[fieldName], defaultValue);
        }

        public static Int64? AsInt64(this DataRow source, string fieldName)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return null;
            if (!source.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToInt64(source[fieldName]);
        }

        public static Int64 AsInt64(this DataRow source, string fieldName, Int64 defaultValue)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return defaultValue;
            if (!source.Table.Columns.Contains(fieldName)) return defaultValue;
            return Common.Convert.ToInt64(source[fieldName], default);
        }

        public static string AsString(this DataRow source, string fieldName)
        {
            if (source == null || string.IsNullOrEmpty(fieldName)) return null;
            if (!source.Table.Columns.Contains(fieldName)) return null;
            return Common.Convert.ToString(source[fieldName]);
        }


        public static string AsString(this DataRow r, string fieldName, string defaultValue)
        {
            if (r.IsNull(fieldName)) return defaultValue;
            return r[fieldName].ToString();
        }

        public static bool IsNullOrEmpty(this DataTable tb)
        {
            return tb == null || tb.Rows.Count == 0;
        }

        public static bool IsNullOrEmpty(this DataRow row)
        {
            if (row == null) return true;
            var itemArray = row.ItemArray;
            if (itemArray == null)
                return true;
            return itemArray.All(x => x == null || string.IsNullOrEmpty(x.ToString().Trim()));
        }

        public static string GenerateCreateScript(this DataTable tb)
        {
            var sb = new StringBuilder();
            sb.Append("/*\r\n");
            foreach (DataColumn c in tb.Columns)
                sb.Append(c.ColumnName + ", ");
            sb.Append("*/\r\n");
            sb.Append("CREATE TABLE " + tb.TableName + "\r\n(");
            foreach (DataColumn c in tb.Columns)
            {
                sb.Append(c.ColumnName);
                sb.Append("  ");
                sb.Append(GetDbTypeScript(c) + " ");
                sb.Append(c.AllowDBNull ? "NULL" : "NOT NULL");
                sb.Append(",\r\n");
            }
            sb.Append(")");
            return sb.ToString();
        }

        private static string GetDbTypeScript(DataColumn c)
        {
            //if (c.DataType == typeof(byte[]) || c.DataType == typeof(Image))
            //    return "image";
            if (c.DataType == typeof(bool))
                return "bit";
            if (c.DataType == typeof(DateTime))
                return "datetime";
            if (c.DataType == typeof(decimal))
                return "decimal";
            if (c.DataType == typeof(int))
                return "int";
            if (c.DataType == typeof(float) || c.DataType == typeof(double))
                return "float";
            if (c.DataType == typeof(string))
                return "varchar(" + c.MaxLength + ")";
            return c.DataType.Name;
        }

        public static void ExportToCSV(this DataTable tb, string fname, bool cellAsText, string listSeparator = null)
        {
            var FieldSeparator = string.IsNullOrEmpty(listSeparator) ? System.Globalization.CultureInfo.CurrentCulture.TextInfo.ListSeparator : listSeparator;
            using var fs = new StreamWriter(fname, false, Encoding.UTF8);
            for (int i = 0; i < tb.Columns.Count; i++)
            {
                if (i > 0) Write(fs, FieldSeparator, false);
                Write(fs, tb.Columns[i].ColumnName, true);
            }
            Write(fs, "\r\n", false);
            //-------------------
            foreach (DataRow r in tb.Rows)
                if (r.RowState == DataRowState.Added)
                {
                    for (int i = 0; i < tb.Columns.Count; i++)
                    {
                        if (i > 0) Write(fs, FieldSeparator, false);
                        var v = r.IsNull(i) ? null : r[i].ToString();
                        if (v != null && cellAsText) v = "=\"\"" + v.Replace("\"", "\"\"") + "\"\"";
                        Write(fs, "\"" + v + "\"", false);
                    }
                    Write(fs, "\r\n", false);
                }
        }

        private static void Write(TextWriter fs, string text, bool quote)
        {
            if (text == null) text = "";
            //if (MaxFieldLength > 0 && text.Length > MaxFieldLength) text = text.Substring(0, MaxFieldLength);
            if (quote) text = "\"" + text.Replace("\"", "\"\"") + "\"";
            fs.Write(text);
        }

        public static void ExportToCSV(this DataTable tb, StringBuilder sb, bool cellAsText, string listSeparator)
        {
            for (int i = 0; i < tb.Columns.Count; i++)
            {
                if (i > 0) Write(sb, listSeparator, false);
                Write(sb, tb.Columns[i].ColumnName, true);
            }
            Write(sb, "\r\n", false);
            //-------------------
            foreach (DataRow r in tb.Rows)
                if (r.RowState == DataRowState.Added)
                {
                    for (int i = 0; i < tb.Columns.Count; i++)
                    {
                        if (i > 0) Write(sb, listSeparator, false);
                        var v = r.IsNull(i) ? null : r[i].ToString();
                        if (v != null && cellAsText) v = "=\"\"" + v.Replace("\"", "\"\"") + "\"\"";
                        Write(sb, "\"" + v + "\"", false);
                    }
                    Write(sb, "\r\n", false);
                }
        }

        private static void Write(StringBuilder sb, string text, bool quote)
        {
            if (text == null) text = "";
            //if (MaxFieldLength > 0 && text.Length > MaxFieldLength) text = text.Substring(0, MaxFieldLength);
            if (quote) text = "\"" + text.Replace("\"", "\"\"") + "\"";
            sb.Append(text);
        }

        public static DataSet ToDataSet(this DataTable tb)
        {
            var ds = new DataSet();
            if (string.IsNullOrEmpty(tb.TableName)) tb.TableName = "Table1";
            ds.Tables.Add(tb);
            return ds;
        }

        public static DateTime? FromSapDate(this DataTable tb, string dateFieldName, string timeFieldName)
        {
            if (tb.Rows.Count < 1) return null;
            return tb.Rows[0].FromSapDate(dateFieldName, timeFieldName);
        }

        public static DateTime? FromSapDate(this DataRow r, string dateFieldName, string timeFieldName)
        {
            var sd = r.AsString(dateFieldName);
            var st = timeFieldName == null ? "000000" : r.AsString(timeFieldName);
            var dy = sd.Substring(0, 4).ToInt(0);
            var dm = sd.Substring(4, 2).ToInt(0);
            var dd = sd.Substring(6, 2).ToInt(0);
            var th = st.Substring(0, 2).ToInt(0);
            var tm = st.Substring(2, 2).ToInt(0);
            var ts = st.Substring(4, 2).ToInt(0);
            return new DateTime(dy, dm, dd, th, tm, ts);
        }

        public static bool AsBool(this DataTable tb, string fieldName)
        {
            return (bool)tb.Rows[0][fieldName];
        }

        public static string AsString(this DataTable tb, string fieldName)
        {
            if (tb.Rows.Count < 1) return null;
            return tb.Rows[0].AsString(fieldName);
        }

        public static int? AsInt(this DataTable tb, string fieldName)
        {
            if (tb.Rows.Count < 1) return null;
            return tb.Rows[0].AsInt(fieldName);
        }

        public static int AsInt(this DataTable tb, string fieldName, int defaultValue)
        {
            if (tb.Rows.Count < 1) return defaultValue;
            return tb.Rows[0].AsInt(fieldName, defaultValue);
        }

        public static Int64? AsInt64(this DataTable tb, string fieldName)
        {
            if (tb.Rows.Count < 1) return null;
            return tb.Rows[0].AsInt64(fieldName);
        }

        public static Int64 AsInt64(this DataTable tb, string fieldName, Int64 defaultValue)
        {
            if (tb.Rows.Count < 1) return default;
            return tb.Rows[0].AsInt64(fieldName, defaultValue);
        }

        public static string AsCSV(this DataTable tb, string fieldName)
        {
            if (tb.Rows.Count < 1) return null;
            var sb = new StringBuilder();
            foreach (DataRow r in tb.Rows)
            {
                if (sb.Length > 0) sb.Append(',');
                sb.Append(r.AsString(fieldName));
            }
            return tb.Rows[0].AsString(fieldName);
        }

        public static List<Dictionary<string, object>> ToJSON(this DataTable dt)
        {
            return ToJSON(dt, null);
        }

        public static List<Dictionary<string, object>> ToJSON(this DataTable dt, string fields)
        {
            var table = new List<Dictionary<string, object>>();
            foreach (DataRow dr in dt.Rows)
                table.Add(dr.ToJSON(fields));
            return table;
        }

        public static List<Dictionary<string, object>> ToJSON(this DataRow[] rows)
        {
            var table = new List<Dictionary<string, object>>();
            foreach (DataRow dr in rows)
                table.Add(dr.ToJSON());
            return table;
        }

        public static Dictionary<string, object> ToJSON(this DataRow dr)
        {
            return ToJSON(dr, null);
        }

        public static Dictionary<string, object> ToJSON(this DataRow dr, string fields)
        {
            var dic = new Dictionary<string, object>();
            if (string.IsNullOrEmpty(fields))
            {
                foreach (DataColumn col in dr.Table.Columns)
                    dic.Add(col.ColumnName, dr.IsNull(col) ? null : dr[col]);
            }
            else
            {
                foreach (var f in fields.Replace(" ", "").Split(','))
                    dic.Add(f, dr.IsNull(f) ? null : dr[f]);
            }
            return dic;
        }

        public static List<object> ToJSONScalar(this DataTable tb, string fieldName)
        {
            var list = new List<object>();
            foreach (DataRow r in tb.Rows)
            {
                var v = r.IsNull(fieldName) ? null : r[fieldName];
                list.Add(v);
            }
            return list;
        }


        public static List<Dictionary<string, object>> ConvertColumnToInt64(this List<Dictionary<string, object>> list, string key, Int64 defaultValue)
        {
            foreach (var dic in list)
            {
                dic[key] = dic.ContainsKey(key) ? dic[key].ToInt64(defaultValue) : defaultValue;
            }
            return list;
        }




        public static DataTable ToTable<T>(this IEnumerable<T> list)
        {
            var type = typeof(T);
            var properties = type.GetProperties();
            var dataTable = new DataTable(typeof(T).Name);
            foreach (var info in properties)
            {
                dataTable.Columns.Add(new DataColumn(info.Name, Nullable.GetUnderlyingType(info.PropertyType) ?? info.PropertyType));
            }

            foreach (var entity in list)
            {
                var values = new object[properties.Length];
                for (int i = 0; i < properties.Length; i++)
                {
                    values[i] = properties[i].GetValue(entity);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        public static List<T> MapTo<T>(this DataTable tb) where T : class, new()
        {
            var properties = typeof(T).GetProperties();
            var list = new List<T>();
            foreach (DataRow row in tb.Rows)
            {
                var obj = new T();
                Map(row, obj, properties);
                list.Add(obj);
            }
            return list;
        }


        public static T MapTo<T>(this DataRow row) where T : class, new()
        {
            var obj = new T();
            Map(row, obj, typeof(T).GetProperties());
            return obj;
        }

        public static T MapTo<T>(this DataRow row, T obj)
        {
            Map(row, obj, typeof(T).GetProperties());
            return obj;
        }

        private static void Map(DataRow row, object obj, PropertyInfo[] properties)
        {
            foreach (DataColumn c in row.Table.Columns)
            {
                var value = row[c.ColumnName];
                try
                {
                    var pi = properties.Where(x => x.Name == c.ColumnName).FirstOrDefault();
                    if (pi?.SetMethod != null)
                    {
                        if (row.IsNull(pi.Name))
                            pi.SetValue(obj, null);
                        else if (pi.PropertyType == typeof(bool) && c.DataType == typeof(int))
                            pi.SetValue(obj, (int)value != 0);
                        else
                            pi.SetValue(obj, value);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error on Mapping {obj.GetType().FullName} . {c.ColumnName}  / value: {value}.\r\n {ex.Message}");
                }
            }
        }


        public static IList<T> MapTo<T>(this IEnumerable src) where T : class, new()
        {
            var list = new List<T>();
            if (src == null) return list;
            var properties = typeof(T).GetProperties();
            foreach (var item in src)
            {
                var obj = new T();
                MapObject(item, obj, properties);
                list.Add(obj);
            }
            return list;
        }

        public static T MapTo<T>(this object src) where T : class, new()
        {
            var obj = new T();
            MapObject(src, obj, typeof(T).GetProperties());
            return obj;
        }

        public static T MapTo<T>(this object src, T targetObj) where T : class
        {
            MapObject(src, targetObj, typeof(T).GetProperties());
            return targetObj;
        }

        private static void MapObject<T>(this object src, T dest, PropertyInfo[] properties) where T : class
        {
            foreach (var srcProp in src.GetType().GetProperties())
            {
                var aProp = srcProp.GetCustomAttribute(typeof(IgnoreMapAttribute));
                var aType = srcProp.PropertyType.GetCustomAttribute(typeof(IgnoreMapAttribute));
                if (aProp == null && aType == null)
                {
                    var value = srcProp.GetValue(src);
                    var pi = properties.Where(x => x.Name == srcProp.Name).FirstOrDefault();
                    try
                    {
                        if (pi?.SetMethod != null)
                        {
                            if (srcProp.PropertyType != pi.PropertyType)
                                throw new Exception($"Invalid type {srcProp.PropertyType.Name} => {pi.PropertyType.Name}");
                            if (value == null)
                                pi.SetValue(dest, null);
                            else
                                pi.SetValue(dest, value);
                        }
                    }
                    catch (Exception ex)
                    {
                        var destPropName = pi == null ? "?" : pi.Name;
                        throw new Exception($"Error in Mapping {src?.GetType().Name}.{srcProp?.Name} => {dest?.GetType().Name}.{destPropName}: {ex.Message}");
                    }
                }
            }
        }


    }
}