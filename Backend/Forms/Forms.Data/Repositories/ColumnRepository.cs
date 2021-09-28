using Common.Data;
using Forms.Core;

namespace Forms.Data
{
    public class ColumnRepository : Repository<Column>, IColumnRepository
    {
        public ColumnRepository(FormDbContext context) : base(context)
        {
        }
    }
}