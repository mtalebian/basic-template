
namespace Common.Data
{

    public struct QueryOrderBy
    {
        private string mExpr;

        public string Expr { get { return mExpr; } }


        public QueryOrderBy(string expr)
        {
            this.mExpr = expr;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryOrderBy))
                return false;

            return Equals((QueryOrderBy)obj);
        }

        public bool Equals(QueryOrderBy obj)
        {
            return Expr == obj.Expr;
        }

        public static bool operator ==(QueryOrderBy value1, QueryOrderBy value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryOrderBy value1, QueryOrderBy value2)
        {
            return !value1.Equals(value2);
        }

        public override string ToString()
        {
            return Expr;
        }

    }

}