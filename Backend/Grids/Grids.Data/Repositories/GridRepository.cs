using Forms.Core;
using Common.Data;

namespace Forms.Data
{
    public class GridRepository : Repository<Grid>, ITableRepository
    {
        public GridRepository(GridsDbContext context) : base(context)
        {
        }
    }
}