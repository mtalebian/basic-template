using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Common.Data
{
    public interface IReadonlyRepository<TEntity, TKey> where TEntity : class
    {
        TEntity Get(TKey id);
        IList<TEntity> GetAll();
        IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
    }
}
