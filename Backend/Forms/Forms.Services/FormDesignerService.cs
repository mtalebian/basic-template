using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
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

        public DataTable GetSchemaColumn(string tableName)
        {
            var sql = "SELECT t.TABLE_SCHEMA+'.'+t.TABLE_NAME as TableName" +
                ", c.COLUMN_NAME as Name" +
                ", c.DATA_TYPE as DataType" +
                ", c.IS_NULLABLE as IsNull" +
                ", c.CHARACTER_MAXIMUM_LENGTH as MaxLen" +
                ", c.COLUMN_DEFAULT as DefaultValue" +
                ", c.ORDINAL_POSITION as OrdinalPosition\r\n" +
                ", isnull((SELECT 1\r\n" +
                "   FROM information_schema.table_constraints tc\r\n" +
                "       INNER JOIN information_schema.key_column_usage kc ON kc.Constraint_Name = tc.Constraint_Name AND kc.Constraint_schema = tc.Constraint_schema\r\n" +
                "   where CONSTRAINT_TYPE='PRIMARY KEY' and tc.TABLE_SCHEMA=t.TABLE_SCHEMA and tc.TABLE_NAME=t.TABLE_NAME and kc.COLUMN_NAME=c.COLUMN_NAME\r\n" +
                "  ), 0) as IsPK\r\n" +
                "FROM information_schema.TABLES t\r\n" +
                "      inner join INFORMATION_SCHEMA.COLUMNS c on t.TABLE_SCHEMA=c.TABLE_SCHEMA and t.TABLE_NAME=c.TABLE_NAME\r\n" +
                "where t.TABLE_SCHEMA+'.'+t.TABLE_NAME = '" + tableName.Replace("'", "") + "'";
            return db.GetDataTable(sql);
        }

        public void SaveTable(ref Table item, IList<Column> dataColumns)
        {
            var tb = item;
            tb = db.Tables.FirstOrDefault(x => x.ProjectId == tb.ProjectId && x.Name == tb.Name);
            if (tb == null)
            {
                db.Tables.Add(item);
                tb = item;
            }
            else
            {
                item.MapTo(tb);
                db.Tables.Update(tb);
                //---
                var columns = db.Columns.Where(x => x.ProjectId == tb.ProjectId && x.TableName == tb.Name);
                foreach (var _col in columns)
                {
                    if (!dataColumns.Any(x => x.Id == _col.Id))
                        db.Columns.Remove(_col);
                }
            }

            for (int i = 0; i < dataColumns.Count; i++)
            {
                var dataColumn = dataColumns[i];
                if (dataColumn.Id == 0)
                    db.Columns.Add(dataColumn);
                else
                {
                    var c = db.Columns.FirstOrDefault(x => x.Id == dataColumn.Id);
                    dataColumn.MapTo(c);
                    db.Columns.Update(c);
                }
            }

            db.SaveChanges();
            item = tb;
        }

        public void DeleteTable(string projectId, string name)
        {
            var tb = db.Tables.FirstOrDefault(x => x.ProjectId == projectId && x.Name == name);
            var columns = db.Columns.Where(x => x.ProjectId == projectId && x.TableName == name);
            if (tb == null) throw new Exception("Record not found!");
            foreach (var c in columns)
            {
                db.Columns.Remove(c);
            }
            db.Tables.Remove(tb);
            db.SaveChanges();
        }



        public IList<Column> GetColumns(string projectId, string tableName)
        {
            return db.Columns.Where(x => x.ProjectId == projectId && x.TableName == tableName).OrderBy(x => x.OrdinalPosition).ToList(); 
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