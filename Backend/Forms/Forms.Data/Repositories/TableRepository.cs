using Forms.Core;
using Common.Data;

namespace Forms.Data
{
    public class TableRepository : Repository<Table>, ITableRepository
    {
        public TableRepository(FormDbContext context) : base(context)
        {
        }
    }
}