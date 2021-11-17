using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Common.Data
{
    public interface IUnitOfWork
    {
        DataTable GetDataTable(string sql);
        void ExecuteSql(string sql);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
