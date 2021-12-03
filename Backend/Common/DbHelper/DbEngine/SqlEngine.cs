using System;
using System.Globalization;

namespace Common.Data
{

    public static class SqlEngine
    {

        public static string GetQuoted(string value, bool unicode)
        {
            if (value == null) throw new ArgumentNullException("value");
            return string.Format("{0}'{1}'", unicode ? "N" : "", value.Replace("'", "''"));
        }

        public static string ToDbValue(bool value)
        {
            return value ? "1" : "0";
        }

        public static string ToDbValue(bool? value)
        {
            return !value.HasValue ? null : ToDbValue(value.Value);
        }

        public static string ToDbValue(DateTime value)
        {
            return "CONVERT(datetime, '" + value.ToString("yyyy/MM/dd HH:mm:ss", new CultureInfo("en-US")) + "')";
        }

        public static string ToDbValue(DateTime? value)
        {
            return !value.HasValue ? null : ToDbValue(value.Value);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        public static string ToDbValue(object value, bool quote)
        {
            return ToDbValue(value, quote, false);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        public static string ToDbValue(object value, bool quote, bool unicode)
        {
            if (value == null) return null;
            if (value is string)
            {
                string svalue = (string)value;
                if (quote) return GetQuoted(svalue, unicode);
                return svalue.Replace("'", "''");
            }
            //-------------------
            if (value is bool?) return ToDbValue((bool?)value);
            if (value is bool) return ToDbValue((bool)value);
            //-------------------
            if (value is DateTime?) return ToDbValue((DateTime?)value);
            if (value is DateTime) return ToDbValue((DateTime)value);
            //-------------------
            if (value is sbyte?)
            {
                sbyte? v = (sbyte?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is byte?)
            {
                byte? v = (byte?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is char?)
            {
                char? v = (char?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            //-------------------
            if (value is Int16?)
            {
                Int16? v = (Int16?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is Int32?)
            {
                Int32? v = (Int32?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is Int64?)
            {
                Int64? v = (Int64?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            //-------------------
            if (value is UInt16?)
            {
                UInt16? v = (UInt16?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is UInt32?)
            {
                UInt32? v = (UInt32?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is UInt64?)
            {
                UInt64? v = (UInt64?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            //-------------------
            if (value is double?)
            {
                double? v = (double?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            if (value is float?)
            {
                float? v = (float?)value;
                return !v.HasValue ? null : v.Value.ToString();
            }
            return value.ToString();
        }

    }


}