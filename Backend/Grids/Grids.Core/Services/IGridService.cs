using System.Collections.Generic;
using System.Data;

namespace Forms.Core
{
    public interface IGridService
    {
        IList<GridGroup> GetAllGroups(string projectId);
        IList<Grid> GetGrids(string projectId, int groupId);
        Grid GetGrid(string projectId, string id);
        IList<GridColumn> GetGridColumns(string projectId, string gridId);
        IList<GridVariant> GetGridVariants(string projectId, string gridId);


        DataTable ExecuteSelect(Grid grid, IList<GridColumn> columns, Dictionary<string, object> filters, Dictionary<string, object> parameters);
        void ExecuteInsert(Grid grid, Dictionary<string, object> values);
        void ExecuteDelete(Grid grid, Dictionary<string, object> values);
        void ExecuteUpdate(Grid grid, Dictionary<string, object> values);

        GridVariant SaveGridVariant(GridVariant variant);
        void UpdateGridVaraints(IList<GridVariant> variants);
        void DeleteGridVariant(int serial);
    }
}