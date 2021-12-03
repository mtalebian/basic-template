using System.Text;

namespace Common.Data
{

    public sealed class QueryWhereCollection : ReadonlyTypeEnumerable<QueryWhere>
    {

        public void Add(string expr)
        {
            if (string.IsNullOrEmpty(expr)) return;
            List.Add(new QueryWhere(expr));
        }

        public void AddIfNotEmpty(string field, string value)
        {
            if (string.IsNullOrEmpty(value)) return;
            Add(field, "=", value, true);
        }

        public void Add(string field, object value, bool quote)
        {
            Add(field, "=", value, quote);
        }

        public void Add(string field, string oprand, object value, bool quote)
        {
            Add(field, oprand, value, quote, false);
        }

        public void Add(string field, string oprand, object value, bool quote, bool unicode)
        {
            if (string.IsNullOrEmpty(field)) return;
            if (value == null) return;
            var svalue = SqlEngine.ToDbValue(value, quote, unicode);
            if (svalue == null) return;
            //-----------------------
            string expr = string.Format("{0} {1} {2}", field, oprand, svalue);
            List.Add(new QueryWhere(expr));
        }

        public void AddRange(string fieldName, object fromValue, object toValue)
        {
            if (fromValue == toValue && fromValue != null)
                Add(fieldName, fromValue, true);
            else
            {
                if (fromValue != null) Add(fieldName, ">=", fromValue, true);
                if (toValue != null) Add(fieldName, "<=", toValue, true);
            }
        }

        public override string ToString()
        {
            if (Count < 1) return "";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < Count; i++)
            {
                if (i > 0) sb.Append(" AND ");
                string s = this[i].ToString();
                if (s[0] == '(') sb.Append(s);
                else
                {
                    sb.Append('(');
                    sb.Append(s);
                    sb.Append(')');
                }
            }
            return sb.ToString();
        }

    }

}