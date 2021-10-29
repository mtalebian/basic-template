using System.Collections.Generic;
using System.Data;

namespace Forms.Core
{
    public interface IGridService
    {
        IList<Group> GetAllGroups(string projectId);
        IList<Grid> GetGrids(string projectId, int groupId);
        Grid GetGrid(string projectId, string id);
        IList<GridColumn> GetGridColumns(string projectId, string gridId);

        DataTable ExecuteSelect(Grid table, IList<GridColumn> columns, Dictionary<string, object[]> filters);
        void ExecuteInsert(string projectId, string tableName, Dictionary<string, object> values);
        void ExecuteDelete(string projectId, string tableName, Dictionary<string, object> values);
        void ExecuteUpdate(string projectId, string tableName, Dictionary<string, object> values);
    }
}