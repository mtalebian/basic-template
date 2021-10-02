using Common.Data;
using System.Collections.Generic;

namespace Forms.Core
{
    public interface IFormUnitOfWork : IUnitOfWork 
    {
        IColumnRepository Columns { get; }
        ITableRepository Tables { get; }
        IGroupRepository Groups { get; }
        ITextRepository Texts{ get; }

        void ExecuteSql(string sql, Dictionary<string, object> parameters);
    }
}