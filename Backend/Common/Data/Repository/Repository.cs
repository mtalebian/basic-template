using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Common.Data
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected virtual DbContext Context { get; }

        public DbSet<TEntity> Entities { get { return Context.Set<TEntity>(); } }



        public BaseRepository(DbContext context)
        {
            Context = context;
        }


        public virtual IList<TEntity> GetAll()
        {
            return Entities.ToList();
        }

        public virtual Task<List<TEntity>> GetAllAsync()
        {
            return Entities.ToListAsync();
        }


        public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.FirstOrDefault(predicate);
        }

        public virtual Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.FirstOrDefaultAsync(predicate);
        }


        public virtual TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.SingleOrDefault(predicate);
        }

        public virtual Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.SingleOrDefaultAsync(predicate);
        }


        public virtual IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).ToList();
        }

        public virtual Task<List<TEntity>> WhereAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).ToListAsync();
        }

        public virtual bool Any(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Any(predicate);
        }

        public virtual Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.AnyAsync(predicate);
        }




        public virtual EntityEntry<TEntity> Add(TEntity entity)
        {
            return Entities.Add(entity);
        }

        public virtual ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity)
        {
            return Entities.AddAsync(entity);
        }


        public virtual void AddRange(IEnumerable<TEntity> entities)
        {
            Entities.AddRange(entities);
        }

        public virtual Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            return Entities.AddRangeAsync(entities);
        }


        public virtual void Update(TEntity entity)
        {
            Entities.Update(entity);
        }

        public virtual void UpdateRange(IEnumerable<TEntity> entities)
        {
            Entities.UpdateRange(entities);
        }


        public virtual void Remove(TEntity entity)
        {
            Entities.Remove(entity);
        }

        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            Entities.RemoveRange(entities);
        }

        public virtual IList<TEntity> SqlQuery(string sql, params object[] parameters)
        {
            return Entities.FromSqlRaw(sql, parameters).ToList();
        }
    }



    public class Repository<TEntity> : BaseRepository<TEntity>, IRepository<TEntity> where TEntity : class
    {
        public Repository(DbContext context) : base(context)
        {
        }
    }


    public class Repository<TEntity, TKey> : BaseRepository<TEntity>, IRepository<TEntity, TKey> where TEntity : class
    {
        public Repository(DbContext context) : base(context)
        {
        }

        public virtual TEntity Get(TKey key)
        {
            return Entities.Find(key);
        }

        public virtual ValueTask<TEntity> GetAsync(TKey key)
        {
            return Entities.FindAsync(key);
        }
    }



    public class Repository<TEntity, TKey1, TKey2> : BaseRepository<TEntity>, IRepository<TEntity, TKey1, TKey2> where TEntity : class
    {
        public Repository(DbContext context) : base(context)
        {
        }

        public virtual TEntity Get(TKey1 key1, TKey2 key2)
        {
            return Entities.Find(key1, key2);
        }

        public virtual ValueTask<TEntity> GetAsync(TKey1 key1, TKey2 key2)
        {
            return Entities.FindAsync(key1, key2);
        }
    }



    public class Repository<TEntity, TKey1, TKey2, TKey3> : BaseRepository<TEntity>, IRepository<TEntity, TKey1, TKey2, TKey3> where TEntity : class
    {
        public Repository(DbContext context) : base(context)
        {
        }

        public virtual TEntity Get(TKey1 key1, TKey2 key2, TKey3 key3)
        {
            return Entities.Find(key1, key2, key3);
        }

        public virtual ValueTask<TEntity> GetAsync(TKey1 key1, TKey2 key2, TKey3 key3)
        {
            return Entities.FindAsync(key1, key2, key3);
        }
    }
}