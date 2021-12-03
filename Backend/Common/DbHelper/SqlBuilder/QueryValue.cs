using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public struct QueryValue
    {
        private string mFieldName;
        private object mValue;

        public string FieldName { get { return mFieldName; } }
        public object Value { get { return mValue; } }


        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryValue))
                return false;

            return Equals((QueryValue)obj);
        }

        public bool Equals(QueryValue obj)
        {
            return FieldName == obj.FieldName && Value == obj.Value;
        }

        public static bool operator ==(QueryValue value1, QueryValue value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryValue value1, QueryValue value2)
        {
            return !value1.Equals(value2);
        }

        public QueryValue(string fieldName, object value)
        {
            this.mFieldName = fieldName;
            this.mValue = value;
        }


    }


}