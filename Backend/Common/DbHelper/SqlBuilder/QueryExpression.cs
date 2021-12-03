using System;
using System.Data;
using System.Globalization;
using System.Text;


namespace Common.Data
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1708:IdentifiersShouldDifferByMoreThanCase")]
    public sealed class QueryExpression : QueryText
    {
        private QueryType mQueryType = QueryType.Select;
        private QueryFieldCollection mFields = new QueryFieldCollection();
        private QueryFromCollection mFrom = new QueryFromCollection();
        private QueryWhereCollection mWhere = new QueryWhereCollection();
        private QueryWhereCollection mHavings = new QueryWhereCollection();
        private QueryGroupByCollection mGroupBy = new QueryGroupByCollection();
        private QueryOrderByCollection mOrderBy = new QueryOrderByCollection();
        private QueryValueCollection mValues = new QueryValueCollection();

        public QueryType QueryType { get { return mQueryType; } }
        public override string CommandText
        {
            get
            {
                if (CommandType == CommandType.StoredProcedure) return mFrom[0].Name;
                return ToString();
            }
            set { throw new NotImplementedException(); }
        }
        public override CommandType CommandType
        {
            get { return QueryType == QueryType.SP ? CommandType.StoredProcedure : CommandType.Text; }
            set
            {
                if (value == CommandType.StoredProcedure)
                    mQueryType = QueryType.SP;
                throw new NotImplementedException();
            }
        }


        private QueryFieldCollection SelectList { get { return mFields; } }
        private QueryFromCollection FromList { get { return mFrom; } }
        private QueryWhereCollection WhereList { get { return mWhere; } }
        private QueryGroupByCollection GroupByList { get { return mGroupBy; } }
        private QueryWhereCollection HavingList { get { return mHavings; } }
        private QueryOrderByCollection OrderByList { get { return mOrderBy; } }
        private QueryValueCollection ValuesList { get { return mValues; } }

        public int SelectCount { get { return SelectList.Count; } }
        public int FromCount { get { return FromList.Count; } }
        public int WhereCount { get { return WhereList.Count; } }

        public static object INSERT(object tableName)
        {
            throw new NotImplementedException();
        }

        public int GroupByCount { get { return GroupByList.Count; } }
        public int HavingCount { get { return HavingList.Count; } }
        public int OrderByCount { get { return OrderByList.Count; } }
        public int ValuesCount { get { return ValuesList.Count; } }



        public QueryExpression(QueryType queryType)
            : base("")
        {
            this.mQueryType = queryType;
        }


        public string WhereClause()
        {
            return WhereList.ToString();
        }

        private string GetSelectQuery()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT ");
            for (int i = 0; i < mFields.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(mFields[i].ToString());
            }
            //----------------------
            sb.AppendLine();
            sb.Append("FROM ");
            for (int i = 0; i < FromCount; i++)
            {
                if (i > 0 && string.IsNullOrEmpty(mFrom[i].JoinType)) sb.Append(',');
                sb.Append(' ');
                sb.Append(mFrom[i].ToString());
            }
            //----------------------
            if (WhereCount > 0)
            {
                sb.AppendLine();
                sb.Append("WHERE ");
                sb.Append(WhereList.ToString());
            }
            //----------------------
            if (GroupByList.Count > 0)
            {
                sb.AppendLine();
                sb.Append("GROUP BY ");
                for (int i = 0; i < mGroupBy.Count; ++i)
                {
                    if (i > 0) sb.Append(", ");
                    sb.Append(mGroupBy[i].ToString());
                }
                if (HavingList.Count > 0)
                {
                    sb.AppendLine();
                    sb.Append("Having ");
                    sb.Append(HavingList.ToString());
                }
            }
            //----------------------
            if (OrderByList.Count > 0)
            {
                sb.AppendLine();
                sb.Append("ORDER BY ");
                for (int i = 0; i < mOrderBy.Count; ++i)
                {
                    if (i > 0) sb.Append(", ");
                    sb.Append(mOrderBy[i].ToString());
                }
            }
            return sb.ToString();
        }

        private string GetUpdateQuery()
        {
            if (WhereCount < 1 || mValues.Count < 1) return "";
            StringBuilder sb = new StringBuilder();
            //----------------------
            sb.Append("UPDATE ");
            sb.Append(mFrom[0].Name);
            //----------------------
            sb.AppendLine();
            sb.Append("SET ");
            for (int i = 0; i < mValues.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(mValues[i].FieldName);
                sb.Append('=');
                sb.Append(mValues[i].Value);
            }
            //----------------------
            if (FromCount > 1)
            {
                sb.AppendLine();
                sb.Append("FROM ");
                for (int i = 1; i < FromCount; i++)
                {
                    if (i > 2 && string.IsNullOrEmpty(mFrom[i].JoinType)) sb.Append(',');
                    sb.Append(' ');
                    sb.Append(mFrom[i].ToString());
                }
            }
            sb.AppendLine();
            sb.Append("WHERE ");
            sb.Append(WhereList.ToString());
            //----------------------
            return sb.ToString();
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
        public string GetInsertValues()
        {
            if (mValues.Count < 1) return "";
            StringBuilder sb = new StringBuilder();
            sb.Append(" (");
            for (int i = 0; i < mValues.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(mValues[i].Value);
            }
            sb.Append(')');
            return sb.ToString();
        }

        private string GetInsertQuery()
        {
            if (mValues.Count < 1) return "";
            StringBuilder sb = new StringBuilder();
            //----------------------
            sb.Append("INSERT INTO ");
            sb.Append(mFrom[0].Name);
            sb.Append(" (");
            for (int i = 0; i < mValues.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(mValues[i].FieldName);
            }
            sb.Append(')');
            //----------------------
            sb.AppendLine();
            sb.Append("VALUES (");
            for (int i = 0; i < mValues.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(mValues[i].Value);
            }
            sb.Append(')');
            //----------------------
            return sb.ToString();
        }

        private string GetDeleteQuery()
        {
            if (WhereCount < 1) return "";
            return string.Format("DELETE {0} WHERE {1}", mFrom[0].Name, WhereList.ToString());
        }


        private string GetSPQuery()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(mFrom[0].Name);
            sb.Append(" ");
            for (int i = 0; i < Parameters.Count; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(Parameters[i].Name);
                sb.Append("=");
                object value = Parameters[i].Value;
                if (value is string)
                {
                    value = string.Format("'{0}'", value.ToString().Replace("'", "''"));
                }
                if (value is bool)
                {
                    bool b = (bool)value;
                    value = b ? "1" : "0";
                }
                if (value is DateTime)
                {
                    DateTime dt = (DateTime)value;
                    value = "CONVERT(datetime, '" + dt.ToString("yyyy/MM/dd HH:mm:ss", new CultureInfo("en-US")) + "')";
                }
                if (value == null) value = "null";
                sb.Append(value);
            }
            return sb.ToString();
        }

        public QueryExpression select(string name)
        {
            return select(name, null);
        }

        public QueryExpression select(string name, string alias)
        {
            SelectList.Add(name, alias);
            return this;
        }

        public QueryExpression from(string name)
        {
            return from(name, null);
        }

        public QueryExpression from(string name, string alias)
        {
            FromList.Add(name, alias);
            return this;
        }

        public QueryExpression innerjoin(string tableName, string alias, string joinConditions)
        {
            FromList.Add("inner join", tableName, alias, joinConditions);
            return this;
        }

        public QueryExpression leftouterjoin(string tableName, string alias, string joinConditions)
        {
            FromList.Add("left outer join", tableName, alias, joinConditions);
            return this;
        }

        public QueryExpression rightouterjoin(string tableName, string alias, string joinConditions)
        {
            FromList.Add("right outer join", tableName, alias, joinConditions);
            return this;
        }

        public QueryExpression outerjoin(string tableName, string alias, string joinConditions)
        {
            FromList.Add("full outer join", tableName, alias, joinConditions);
            return this;
        }

        public QueryExpression value(string field, object fieldValue)
        {
            return value(field, fieldValue, true);
        }

        public QueryExpression value(string field, object fieldValue, bool quote, bool unicde = false)
        {
            ValuesList.Add(field, fieldValue, quote, unicde);
            return this;
        }

        public QueryExpression valueN(string field, object fieldValue)
        {
            return value(field, fieldValue, true, true);
        }

        public QueryExpression valueN(string field, object fieldValue, bool quote)
        {
            return value(field, fieldValue, quote, true);
        }


        public QueryExpression where(string expr)
        {
            WhereList.Add(expr);
            return this;
        }

        public QueryExpression where(string field, object value)
        {
            return where(field, value, true);
        }

        public QueryExpression where(string field, object value, bool quote)
        {
            WhereList.Add(field, value, quote);
            return this;
        }

        public QueryExpression whereN(string field, object value, bool quote = true)
        {
            WhereList.Add(field, "=", value, quote, true);
            return this;
        }

        public QueryExpression whereIfNotEmpty(string field, string value)
        {
            WhereList.AddIfNotEmpty(field, value);
            return this;
        }

        public QueryExpression where(string field, string oprand, object value, bool quote)
        {
            WhereList.Add(field, oprand, value, quote);
            return this;
        }

        public QueryExpression whereRange(string fieldName, object fromValue, object toValue)
        {
            WhereList.AddRange(fieldName, fromValue, toValue);
            return this;
        }

        public QueryExpression having(string expr)
        {
            HavingList.Add(expr);
            return this;
        }

        public QueryExpression having(string field, string value, bool quote)
        {
            HavingList.Add(field, value, quote);
            return this;
        }

        public QueryExpression having(string field, string oprand, string value, bool quote)
        {
            HavingList.Add(field, oprand, value, quote);
            return this;
        }

        public QueryExpression groupby(string fieldname)
        {
            GroupByList.Add(fieldname);
            return this;
        }

        public QueryExpression orderby(string expr)
        {
            OrderByList.Add(expr);
            return this;
        }


        [CLSCompliant(false)]
        public static QueryExpression SELECT()
        {
            return SELECT(null, null);
        }

        [CLSCompliant(false)]
        public static QueryExpression SELECT(string fields)
        {
            return SELECT(fields, null);
        }

        [CLSCompliant(false)]
        public static QueryExpression SELECT(string fields, string tableName)
        {
            var q = new QueryExpression(QueryType.Select);
            if (!string.IsNullOrEmpty(fields)) q.select(fields);
            if (!string.IsNullOrEmpty(tableName)) q.from(tableName);
            return q;
        }

        public static QueryExpression INSERT(string tableName)
        {
            var q = new QueryExpression(QueryType.Insert);
            if (!string.IsNullOrEmpty(tableName)) q.from(tableName);
            return q;
        }

        public static QueryExpression UPDATE(string tableName)
        {
            var q = new QueryExpression(QueryType.Update);
            if (!string.IsNullOrEmpty(tableName)) q.from(tableName);
            return q;
        }

        public static QueryExpression DELETE(string tableName)
        {
            var q = new QueryExpression(QueryType.Delete);
            if (!string.IsNullOrEmpty(tableName)) q.from(tableName);
            return q;
        }


        public void ClearSelects()
        {
            SelectList.Clear();
        }

        public string ToString(QueryType queryType)
        {
            switch (queryType)
            {
                case QueryType.SP: return GetSPQuery();
                case QueryType.Select: return GetSelectQuery();
                case QueryType.Insert: return GetInsertQuery();
                case QueryType.Update: return GetUpdateQuery();
                case QueryType.Delete: return GetDeleteQuery();
            }
            return "";
        }

        public override string ToString()
        {
            return ToString(mQueryType);
        }

    }

}