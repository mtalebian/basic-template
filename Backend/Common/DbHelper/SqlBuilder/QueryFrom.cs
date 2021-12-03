using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data
{

    public struct QueryFrom
    {
        private string mJoinType;
        private string mName;
        private string mAlias;
        private string mJoinConditions;

        public string JoinType { get { return mJoinType; } }
        public string Name { get { return mName; } }
        public string Alias { get { return mAlias; } }
        public string JoinConditions { get { return mJoinConditions; } }



        public QueryFrom(string joinType, string name, string alias, string joinConditions)
        {
            this.mJoinType = joinType;
            this.mName = name;
            this.mAlias = alias;
            this.mJoinConditions = joinConditions;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is QueryFrom)) return false;
            return Equals((QueryFrom)obj);
        }

        public bool Equals(QueryFrom obj)
        {
            return
                JoinType == obj.JoinType &&
                Name == obj.Name &&
                Alias == obj.Alias &&
                mJoinConditions == obj.mJoinConditions;
        }

        public static bool operator ==(QueryFrom value1, QueryFrom value2)
        {
            return value1.Equals(value2);
        }

        public static bool operator !=(QueryFrom value1, QueryFrom value2)
        {
            return !value1.Equals(value2);
        }



        public override string ToString()
        {
            string s = Name;
            if (!string.IsNullOrEmpty(JoinType))
            {
                if (!string.IsNullOrEmpty(Alias))
                    s = string.Format("{0} {1} {2} ON ({3})", JoinType, Name, Alias, JoinConditions);
                else
                    s = string.Format("{0} {1} {2}", JoinType, Name, JoinConditions);
            }
            else
                if (!string.IsNullOrEmpty(Alias))
                    s = string.Format("{0} {1}", Name, Alias);
            return s;
        }

    }

}
