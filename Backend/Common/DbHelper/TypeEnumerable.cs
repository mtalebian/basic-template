using System.Collections;
using System.Collections.Generic;

namespace Common
{

    public class TypeEnumerable<T> : IEnumerable<T>
    {
        private List<T> _List = new List<T>();
        protected IList<T> List { get { return _List; } }

        public T this[int index] { get { return (T)List[index]; } }

        public int Count { get { return List.Count; } }



        public void Add(T value)
        {
            List.Add(value);
        }

        public void Remove(T value)
        {
            List.Add(value);
        }

        public void Clear()
        {
            List.Clear();
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
