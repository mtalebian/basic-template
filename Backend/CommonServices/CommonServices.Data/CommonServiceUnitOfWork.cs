using Common.Data;
using CommonServices.Core;

namespace CommonServices.Data
{
    public class CommonServiceUnitOfWork : UnitOfWork, ICommonServiceUnitOfWork
    {
        private readonly CommonServiceDbContext context;

        public ITextRepository Texts { get; }
        public INumberRangeRepository NumberRanges { get; }


        public CommonServiceUnitOfWork(CommonServiceDbContext context) : base(context)
        {
            this.context = context;
            Texts = new TextRepository(context);
            NumberRanges = new NumberRangeRepository(context);
        }
    }
}