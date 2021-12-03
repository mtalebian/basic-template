using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public struct QueryField
    {
        private string mFieldName;
        private string mAlias;

        public string FieldName { get { return mFieldName; } }
        public string Alias { get { return mAlias; } }


        public QueryField(string fieldName, string alias)
        {
            this.mFieldName = fieldName;
            this.mAlias = alias;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryField))
                return false;

            return Equals((QueryField)obj);
        }

        public bool Equals(QueryField obj)
        {
            return FieldName == obj.FieldName && Alias == obj.Alias;
        }

        public static bool operator ==(QueryField value1, QueryField value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryField value1, QueryField value2)
        {
            return !value1.Equals(value2);
        }    

        public override string ToString()
        {
            if (string.IsNullOrEmpty(Alias)) return FieldName;
            return FieldName + " as " + Alias;
        }

    }


}
