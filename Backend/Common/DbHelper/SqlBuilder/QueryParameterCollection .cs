using System;

namespace Common.Data
{

    public sealed class QueryParameterCollection : ReadonlyTypeEnumerable<QueryParameter>
    {
        public QueryParameter this[string name] { get { return (QueryParameter)List[IndexOf(name)]; } }



        public int IndexOf(string name)
        {
            for (int i = 0; i < Count; ++i)
                if (string.Equals(this[i].Name, name, StringComparison.OrdinalIgnoreCase) )
                    return i;
            return -1;
        }

        public QueryParameter Add(string name, object value)
        {
            QueryParameter p = new QueryParameter(name, value);
            List.Add(p);
            return p;
        }

        public QueryParameter Add(string name, object value, bool output)
        {
            QueryParameter p = new QueryParameter(name, value, output);
            List.Add(p);
            return p;
        }

        public void Remove(string name)
        {
            int i = IndexOf(name);
            if (i < 0) return;
            List.RemoveAt(i);
        }

    }

}