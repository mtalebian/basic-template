using Common.Data;
using Forms.Core;

namespace Forms.Data
{
    public class GridColumnRepository : Repository<GridColumn>, IGridColumnRepository
    {
        public GridColumnRepository(FormDbContext context) : base(context)
        {
        }
    }
}