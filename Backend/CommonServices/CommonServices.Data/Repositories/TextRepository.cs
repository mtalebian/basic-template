using Common.Data;
using CommonServices.Core;

namespace CommonServices.Data
{
    public class TextRepository : Repository<Text>, ITextRepository
    {
        public TextRepository(CommonServiceDbContext context) : base(context)
        {
        }
    }
}