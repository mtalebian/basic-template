using Common.Data;
using Forms.Core;

namespace Forms.Data
{
    public class GridColumnRepository : Repository<GridColumn>, IGridColumnRepository
    {
        public GridColumnRepository(GridsDbContext context) : base(context)
        {
        }
    }
}