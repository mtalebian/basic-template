using Common.Data;

namespace Forms.Core
{
    public interface IFormUnitOfWork : IUnitOfWork
    {
        IColumnRepository Columns { get; }
        ITableRepository Tables { get; }
        IGroupRepository Groups { get; }
        ITextRepository Texts{ get; }
    }
}