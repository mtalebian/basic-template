using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public struct QueryWhere
    {
        private string mExpr;
        public string Expr { get { return mExpr; } }


        public QueryWhere(string expr)
        {
            this.mExpr = expr;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryWhere))
                return false;

            return Equals((QueryWhere)obj);
        }

        public bool Equals(QueryWhere obj)
        {
            return Expr == obj.Expr && Expr == obj.Expr;
        }

        public static bool operator ==(QueryWhere value1, QueryWhere value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryWhere value1, QueryWhere value2)
        {
            return !value1.Equals(value2);
        }

        public override string ToString()
        {
            return Expr;
        }
    }


}
