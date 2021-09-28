using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Common.Data
{
    public class ReadonlyRepository<TEntity, TKey> : IReadonlyRepository<TEntity, TKey> where TEntity : class
    {
        protected virtual DbContext Context { get; }

        public DbSet<TEntity> Entities { get { return Context.Set<TEntity>(); } }



        public ReadonlyRepository(DbContext context)
        {
            Context = context;
        }


        public virtual TEntity Get(TKey key)
        {
            return Entities.Find(key);
        }

        public virtual IList<TEntity> GetAll()
        {
            return Entities.ToList();
        }

        public virtual IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate).ToList();
        }
    }
}