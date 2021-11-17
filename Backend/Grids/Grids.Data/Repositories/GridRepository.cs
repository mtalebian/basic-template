using Forms.Core;
using Common.Data;

namespace Forms.Data
{
    public class GridRepository : Repository<Grid>, ITableRepository
    {
        public GridRepository(FormDbContext context) : base(context)
        {
        }
    }
}