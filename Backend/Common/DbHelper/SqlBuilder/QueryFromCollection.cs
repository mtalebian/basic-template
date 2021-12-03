
namespace Common.Data
{

    public sealed class QueryFromCollection : ReadonlyTypeEnumerable<QueryFrom>
    {
        

        public void AddWithNoLock(string tableName)
        {
            Add(null, tableName + " with (nolock)", null, null);
        }

        public void Add(string tableName)
        {
            Add(null, tableName, null, null);
        }

        public void AddWithNoLock(string tableName, string alias)
        {
            Add(null, tableName, alias + " with (nolock)", null);
        }

        public void Add(string tableName, string alias)
        {
            Add(null, tableName, alias, null);
        }

        public void AddWithNoLock(string joinType, string tableName, string alias, string joinConditions)
        {
            Add(joinType, tableName, alias + " with (nolock)", joinConditions);
        }
        
        public void Add(string joinType, string tableName, string alias, string joinConditions)
        {
            List.Add(new QueryFrom(joinType, tableName, alias, joinConditions));
        }

    }

}