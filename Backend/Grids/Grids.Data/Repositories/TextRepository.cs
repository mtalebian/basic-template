using Common.Data;
using Forms.Core;

namespace Forms.Data
{
    public class TextRepository : Repository<Text>, ITextRepository
    {
        public TextRepository(GridsDbContext context) : base(context)
        {
        }
    }
}