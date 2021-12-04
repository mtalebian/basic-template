using System;
using System.Globalization;

namespace Common.Data
{

    public sealed class QueryValueCollection : ReadonlyTypeEnumerable<QueryValue>
    {


        public void Add(string fieldName, object value, bool quote)
        {
            Add(fieldName, value, quote, false);
        }

        public void Add(string fieldName, object value, bool quote, bool unicode)
        {
            if (value == null) return;
            if (value is string)
            {
                if (quote)
                    value = string.Format("{0}'{1}'", unicode ? "N" : "", value.ToString().Replace("'", "''"));
            }
            if (value is bool)
            {
                bool b = (bool)value;
                value = b ? "1" : "0";
            }
            else if (value is DateTime)
            {
                DateTime dt = (DateTime)value;
                value = "CONVERT(datetime, '" + dt.ToString("yyyy/MM/dd HH:mm:ss", new CultureInfo("en-US")) + "')";
            }
            else if (value is TimeSpan)
            {
                TimeSpan t = (TimeSpan)value;
                value = "'" + t.ToString() + "'";
            }
            if (value is DBNull) value = "NULL";
            if (value is DbGetDate) value = ((DbGetDate)value).ToString();
            List.Add(new QueryValue(fieldName, value));
        }

        public void AddNullValue(string fieldName)
        {
            List.Add(new QueryValue(fieldName, "Null"));
        }


    }

}