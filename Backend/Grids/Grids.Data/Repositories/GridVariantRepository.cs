using Forms.Core;
using Common.Data;

namespace Forms.Data
{
    public class GridVariantRepository : Repository<GridVariant>, IGridVariantRepository
    {
        public GridVariantRepository(FormDbContext context) : base(context)
        {
        }
    }
}