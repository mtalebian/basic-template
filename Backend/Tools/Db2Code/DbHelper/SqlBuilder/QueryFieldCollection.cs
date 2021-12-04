
namespace Common.Data
{

    public sealed class QueryFieldCollection : ReadonlyTypeEnumerable<QueryField>
    {
                
        public void All()
        {
            Add("*", null);
        }

        public void Add(string name)
        {
            Add(name, null);
        }

        public void Add(string name, string alias)
        {
            List.Add(new QueryField(name, alias));
        }


        public void Clear()
        {
            List.Clear();
        }
    }

}
