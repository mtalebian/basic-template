using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Forms.Services
{
    internal class FormDesignerService : IFormDesignerService
    {
        private readonly IFormUnitOfWork db;


        public FormDesignerService(IFormUnitOfWork db)
        {
            this.db = db;
        }


        public IList<Group> GetAllGroups(string projectId)
        {
            return db.Groups.Where(x => x.ProjectId == projectId);
        }

        public Group GetGroup(string projectId, int id)
        {
            return db.Groups.FirstOrDefault(x => x.ProjectId == projectId && x.Id == id);
        }

        public void Insert(Group item)
        {
            db.Groups.Add(item);
            db.SaveChanges();
        }

        public void Update(ref Group item)
        {
            var g = item;
            g = db.Groups.FirstOrDefault(x => x.ProjectId == g.ProjectId && x.Id == g.Id);
            item.MapTo(g);
            db.Groups.Update(g);
            db.SaveChanges();
            item = g;
        }

        public void DeleteGroup(string projectId, int id)
        {
            var g = db.Groups.FirstOrDefault(x => x.ProjectId == projectId && x.Id == id);
            db.Groups.Remove(g);
            db.SaveChanges();
        }



        public IList<Table> GetTables(string projectId, int groupId)
        {
            return db.Tables.Where(x => x.ProjectId == projectId && x.GroupId == groupId);
        }

        public Table GetTable(string projectId, string name)
        {
            return db.Tables.FirstOrDefault(x => x.ProjectId == projectId && x.Name == name);
        }

        public void Insert(Table item)
        {
            db.Tables.Add(item);
            db.SaveChanges();
        }

        public void Update(ref Table item)
        {
            var tb = item;
            tb = db.Tables.FirstOrDefault(x => x.ProjectId == tb.ProjectId && x.Name == tb.Name);
            item.MapTo(tb);
            db.Tables.Update(tb);
            db.SaveChanges();
            item = tb;
        }

        public void DeleteTable(string projectId, string name)
        {
            var item = db.Tables.FirstOrDefault(x => x.ProjectId == projectId && x.Name == name);
            if (item == null) throw new Exception("Record not found!");
            db.Tables.Remove(item);
            db.SaveChanges();
        }



        public IList<Column> GetColumns(string projectId, string tableName)
        {
            return db.Columns.Where(x => x.ProjectId == projectId && x.TableName == tableName);
        }

        public void Insert(Column item)
        {
            db.Columns.Add(item);
            db.SaveChanges();
        }

        public void Update(ref Column item)
        {
            var c = item;
            c = db.Columns.FirstOrDefault(x => x.Id == c.Id);
            item.MapTo(c);
            db.Columns.Update(c);
            db.SaveChanges();
            item = c;
        }

        public void DeleteColumn(int id)
        {
            var item = db.Columns.FirstOrDefault(x => x.Id == id);
            if (item == null) throw new Exception("Record not found!");
            db.Columns.Remove(item);
            db.SaveChanges();
        }
    }
}