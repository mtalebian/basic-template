using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Common.Data
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        DbSet<TEntity> Entities { get; }

        IList<TEntity> GetAll();
        Task<List<TEntity>> GetAllAsync();

        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
                
        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);

        IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
        Task<List<TEntity>> WhereAsync(Expression<Func<TEntity, bool>> predicate);

        bool Any(Expression<Func<TEntity, bool>> predicate);
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);


        EntityEntry<TEntity> Add(TEntity entity);
        ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity);

        void AddRange(IEnumerable<TEntity> entity);
        Task AddRangeAsync(IEnumerable<TEntity> entities);

        void Update(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entity);

        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entity);
    }



    public interface IRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
    }


    public interface IRepository<TEntity, TKey> : IBaseRepository<TEntity> where TEntity : class
    {
        TEntity Get(TKey id);
        ValueTask<TEntity> GetAsync(TKey id);
    }


    public interface IRepository<TEntity, TKey1, TKey2> : IBaseRepository<TEntity> where TEntity : class
    {
        TEntity Get(TKey1 key1, TKey2 key2);
        ValueTask<TEntity> GetAsync(TKey1 key1, TKey2 key2);
    }


    public interface IRepository<TEntity, TKey1, TKey2, TKey3> : IBaseRepository<TEntity> where TEntity : class
    {
        TEntity Get(TKey1 key1, TKey2 key2, TKey3 key3);
        ValueTask<TEntity> GetAsync(TKey1 key1, TKey2 key2, TKey3 key3);
    }
}
