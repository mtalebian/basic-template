using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Common.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        protected virtual DbContext Context { get; }



        public UnitOfWork(DbContext context)
        {
            Context = context;
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }
        
        public Task<int> SaveChangesAsync()
        {
            return Context.SaveChangesAsync();
        }
    }
}
