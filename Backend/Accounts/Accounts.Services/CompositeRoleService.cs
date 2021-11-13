using Accounts.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Accounts.Services
{
    internal class CompositeRoleService : ICompositeRoleService
    {
        private protected IAccountUnitOfWork<User> db { get; }
        public CompositeRoleService(IAccountUnitOfWork<User> db)
        {
            this.db = db;
        }

        public IList<CompositeRole> GetAllCompositeRoles(string projectId)
        {
            return db.CompositeRoles.Where(x=>x.ProjectId==projectId).ToList();
        }

        public CompositeRole GetCompositeRoleById(string projectId, string id)
        {
            return db.CompositeRoles.Where(x => x.ProjectId == projectId && x.Id == id).FirstOrDefault();
        }

        public void InsertCompositeRole(CompositeRole item)
        {
            db.CompositeRoles.Add(item);
            db.SaveChanges();
        }

        public CompositeRole UpdateCompositeRole(CompositeRole item)
        {
            db.CompositeRoles.Update(item);
            db.SaveChanges();
            return item;
        }

        public void DeleteCompositeRole(string projectId, string id)
        {
            var compositeRole = GetCompositeRoleById(projectId, id);
            if (compositeRole is null) throw new Exception("Record not found!");
            db.CompositeRoles.Remove(compositeRole);
            db.SaveChanges();
        }
    }
}
