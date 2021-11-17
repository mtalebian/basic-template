using Common.Data;

namespace Forms.Core
{
    public interface IFormUnitOfWork : IUnitOfWork
    {
        IGridVariantRepository GridVariants { get; }
        IGridColumnRepository GridColumns { get; }
        ITableRepository Grids { get; }
        IGroupRepository Groups { get; }
        ITextRepository Texts { get; }
    }
}