using Common.Data;
using CommonServices.Core;

namespace CommonServices.Data
{
    public class NumberRangeRepository : Repository<NumberRange>, INumberRangeRepository
    {
        public NumberRangeRepository(CommonServiceDbContext context) : base(context)
        {
        }
    }
}