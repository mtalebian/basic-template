using System.Collections.Generic;
using System.Data;

namespace Forms.Core
{
    public interface IGridBuilderService
    {
        IList<GridGroup> GetAllGroups(string projectId);
        GridGroup GetGroup(string projectId, int id);
        void Insert(GridGroup group);
        void Update(ref GridGroup group);
        void DeleteGroup(string projectId, int groupId);

        IList<Grid> GetGrids(string projectId, int groupId);
        Grid GetGrid(string projectId, string tableName);
        void SaveGrid(ref Grid item, IList<GridColumn> columns);
        void DeleteGrid(string projectId, string id);

        DataTable GetSchemaColumn(string tableName);
        IList<GridColumn> GetGridColumns(string projectId, string gridId);
        
        void Insert(GridColumn column);
        void Update(ref GridColumn column);
        void DeleteColumn(int id);
    }
}