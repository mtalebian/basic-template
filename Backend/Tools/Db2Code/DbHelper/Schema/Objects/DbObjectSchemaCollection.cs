using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace Common.Data.Schema
{

    public class DbObjectSchemaCollection<T> : IEnumerable<T> where T : DbObjectSchema
    {
        internal List<T> List { get; private set; }

        public T this[int index] { get { return (T)List[index]; } }
        public T this[string name]
        {
            get
            {
                var i = IndexOf(name);
                return i < 0 ? null : (T)List[i];
            }
        }

        public int Count { get { return List.Count; } }





        public DbObjectSchemaCollection()
        {
            List = new List<T>();
        }

        public virtual int IndexOf(string name)
        {
            for (int i = 0; i < Count; ++i)
            {
                DbObjectSchema s = (DbObjectSchema)List[i];
                if (string.Equals(s.Name, name, StringComparison.OrdinalIgnoreCase))
                    return i;
            }
            return -1;
        }


        public void Add(T item)
        {
            List.Add(item);
        }

        public void Remove(T item)
        {
            List.Remove(item);
        }

        public T Find(string name)
        {
            int i = IndexOf(name);
            return i >= 0 ? this[i] : null;
        }

        public bool Contains(string name)
        {
            if (name == null) return false;
            name = name.Trim();
            if (name.Length > 2 && name[0] == '[' && name[name.Length - 1] == ']')
                name = name.Substring(1, name.Length - 2).Trim();
            return IndexOf(name) >= 0;
        }

        public override string ToString()
        {
            return GetType().Name + " (Count:" + Count.ToString() + ")";
        }

        public void Clear()
        {
            List.Clear();
        }

        public void Sort()
        {
            List.Sort(comparison);
        }

        public void Sort(Comparison<T> comparison)
        {
            List.Sort(comparison);
        }

        private int comparison(T x, T y)
        {
            return string.Compare(x.Name, y.Name);
        }

        public IEnumerator<T> GetEnumerator()
        {
            return List.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return List.GetEnumerator();
        }
    }
}