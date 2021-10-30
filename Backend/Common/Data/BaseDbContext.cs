using Common.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Common.Data
{
    public class BaseDbContext : DbContext
    {
        private ICurrentUserNameService _CurrentUserNameService;


        public BaseDbContext(DbContextOptions options, ICurrentUserNameService currentUserNameService) : base(options)
        {
            _CurrentUserNameService = currentUserNameService;
        }



        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSave();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            OnBeforeSave();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }



        protected virtual void OnBeforeSave()
        {
            var entries = ChangeTracker.Entries();            
            var user_name = _CurrentUserNameService.UserName;
            var list = entries.ToList();
            foreach (var entry in list)
            {
                if (entry.Entity is IHasCreator)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            entry.CurrentValues["CreatedAt"] = DateTime.UtcNow;
                            entry.CurrentValues["CreatedBy"] = user_name;
                            break;
                    }
                }

                if (entry.Entity is IHasModifier)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                        case EntityState.Modified:
                            entry.CurrentValues["ModifiedAt"] = DateTime.UtcNow;
                            entry.CurrentValues["ModifiedBy"] = user_name;
                            break;
                    }
                }
            }
        }


    }
}