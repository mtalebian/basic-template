using Forms.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Forms.Services
{
    internal class GridBuilderService : IGridBuilderService
    {
        private readonly IFormUnitOfWork db;


        public GridBuilderService(IFormUnitOfWork db)
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



        public IList<Grid> GetGrids(string projectId, int groupId)
        {
            return db.Grids.Where(x => x.ProjectId == projectId && x.GroupId == groupId);
        }

        public Grid GetGrid(string projectId, string id)
        {
            return db.Grids.FirstOrDefault(x => x.ProjectId == projectId && x.Id == id);
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

        public void SaveGrid(ref Grid item, IList<GridColumn> dataColumns)
        {
            var gr = item;
            gr = db.Grids.FirstOrDefault(x => x.ProjectId == gr.ProjectId && x.Id== gr.Id);
            if (gr == null)
            {
                db.Grids.Add(item);
                gr = item;
            }
            else
            {
                item.MapTo(gr);
                db.Grids.Update(gr);
                //---
                var columns = db.GridColumns.Where(x => x.ProjectId == gr.ProjectId && x.GridId == gr.Id);
                foreach (var _col in columns)
                {
                    if (!dataColumns.Any(x => x.Id == _col.Id))
                        db.GridColumns.Remove(_col);
                }
            }

            for (int i = 0; i < dataColumns.Count; i++)
            {
                var dataColumn = dataColumns[i];
                if (dataColumn.Id == 0)
                    db.GridColumns.Add(dataColumn);
                else
                {
                    var c = db.GridColumns.FirstOrDefault(x => x.Id == dataColumn.Id);
                    dataColumn.MapTo(c);
                    db.GridColumns.Update(c);
                }
            }

            db.SaveChanges();
            item = gr;
        }

        public void DeleteGrid(string projectId, string gridId)
        {
            var tb = db.Grids.FirstOrDefault(x => x.ProjectId == projectId && x.Id == gridId);
            var columns = db.GridColumns.Where(x => x.ProjectId == projectId && x.GridId == gridId);
            if (tb == null) throw new Exception("Record not found!");
            foreach (var c in columns)
            {
                db.GridColumns.Remove(c);
            }
            db.Grids.Remove(tb);
            db.SaveChanges();
        }



        public IList<GridColumn> GetGridColumns(string projectId, string gridId)
        {
            return db.GridColumns.Where(x => x.ProjectId == projectId && x.GridId == gridId).OrderBy(x => x.OrdinalPosition).ToList();
        }

        public void Insert(GridColumn item)
        {
            db.GridColumns.Add(item);
            db.SaveChanges();
        }

        public void Update(ref GridColumn item)
        {
            var c = item;
            c = db.GridColumns.FirstOrDefault(x => x.Id == c.Id);
            item.MapTo(c);
            db.GridColumns.Update(c);
            db.SaveChanges();
            item = c;
        }

        public void DeleteColumn(int id)
        {
            var item = db.GridColumns.FirstOrDefault(x => x.Id == id);
            if (item == null) throw new Exception("Record not found!");
            db.GridColumns.Remove(item);
            db.SaveChanges();
        }
    }
}