
namespace Common.Data
{

    public sealed class QueryOrderByCollection : ReadonlyTypeEnumerable<QueryOrderBy>
    {
        
        public void Add(string expr)
        {
            if (string.IsNullOrEmpty(expr)) return;
            List.Add(new QueryOrderBy(expr));
        }

        public void Add(string fieldName, bool Ascending)
        {
            string expr = string.Format("{0} {1}", fieldName, Ascending ? " ASC" : "DESC");
            List.Add(new QueryOrderBy(expr));
        }

    }

}