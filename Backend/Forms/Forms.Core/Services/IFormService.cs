using System.Collections.Generic;
using System.Data;

namespace Forms.Core
{
    public interface IFormService
    {
        IList<Group> GetAllGroups(string projectId);
        IList<Table> GetTables(string projectId, int groupId);
        Table GetTable(string projectId, string name);
        IList<Column> GetColumns(string projectId, string tableName);

        DataTable ExecuteSelect(Table table, IList<Column> columns, Dictionary<string, object[]> filters);
        void ExecuteInsert(string tableName, Dictionary<string, object> values);
        void ExecuteDelete(string tableName, Dictionary<string, object> values);
        void ExecuteUpdate(string tableName, Dictionary<string, object> values);
    }
}