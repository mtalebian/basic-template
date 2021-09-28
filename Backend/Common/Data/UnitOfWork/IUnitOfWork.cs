using System.Threading.Tasks;

namespace Common.Data
{
    public interface IUnitOfWork
    {
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
