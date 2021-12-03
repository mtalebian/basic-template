using Common.Data;

namespace CommonServices.Core
{
    public interface ICommonServiceUnitOfWork : IUnitOfWork
    {
        ITextRepository Texts { get; }
        INumberRangeRepository NumberRanges { get; }
    }
}