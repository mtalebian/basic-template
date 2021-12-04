
namespace Common.Data
{

    public sealed class QueryGroupByCollection : ReadonlyTypeEnumerable<QueryGroupBy>
    {
        
        public void Add(string fieldName)
        {
            List.Add(new QueryGroupBy(fieldName));
        }

    }

}