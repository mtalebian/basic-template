using Forms.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Forms.Data
{
    public class GridGroupRepository : Repository<GridGroup>, IGridGroupRepository
    {
        public GridGroupRepository(GridsDbContext context) : base(context)
        {
        }
    }
}