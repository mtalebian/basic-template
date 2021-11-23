using Forms.Core;
using Common.Data;

namespace Forms.Data
{
    public class GridRepository : Repository<Grid>, IGridRepository
    {
        public GridRepository(GridsDbContext context) : base(context)
        {
        }
    }
}