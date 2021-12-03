using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public struct QueryGroupBy
    {
        private string mFieldName;

        public string FieldName { get { return mFieldName; } }


        public QueryGroupBy(string fieldName)
        {
            this.mFieldName = fieldName;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryGroupBy)) return false;
            return Equals((QueryGroupBy)obj);
        }

        public bool Equals(QueryGroupBy obj)
        {
            return FieldName == obj.FieldName;
        }

        public static bool operator ==(QueryGroupBy value1, QueryGroupBy value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryGroupBy value1, QueryGroupBy value2)
        {
            return !value1.Equals(value2);
        }



        public override string ToString()
        {
            return FieldName;
        }
    }


}