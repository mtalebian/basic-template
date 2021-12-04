using System.Collections;
using System.Collections.Generic;

namespace Common
{

    public class ReadonlyTypeEnumerable<T> : IEnumerable<T>
    {
        private List<T> _List = new List<T>();
        protected IList<T> List { get { return _List; } }

        public T this[int index] { get { return (T)List[index]; } }

        public int Count { get { return List.Count; } }



        
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
