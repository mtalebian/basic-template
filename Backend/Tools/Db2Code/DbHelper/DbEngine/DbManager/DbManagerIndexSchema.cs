using System;
using System.Collections.Generic;
using Common.Data.Schema;
using System.Text;

namespace Common.Data
{

    public class DbManagerIndexSchema : IDbManagerNamedObject<DbManagerIndexSchema>
    {
        public string Name { get; set; }
        public DbManagerIndexColumnSchema[] Columns { get; set; }



        public DbManagerIndexSchema()
        {
            Columns = new DbManagerIndexColumnSchema[0];
        }

        public DbManagerIndexSchema(IndexSchema idx)
        {
            this.Name = idx.Name;
            Columns = DbManagerIndexColumnSchema.Convert(idx.Columns);
        }


        internal static DbManagerIndexSchema[] Convert(IndexSchemaCollection indexes)
        {
            var list = new List<DbManagerIndexSchema>();
            foreach (var idx in indexes)
                list.Add(new DbManagerIndexSchema(idx));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerIndexSchema obj2)
        {
            return Columns.GetChangeScript(obj2.Columns, "INDEX-COLUMN");
        }

        public override string ToString()
        {
            return Name;
        }

        internal string GetScriptAsCreate(DbManagerTableSchema tb)
        {
            var sb = new StringBuilder();
            sb.AppendLine(string.Format("CREATE INDEX [{0}] ON [{1}].[{2}]", Name, tb.Owner, tb.Name));
            sb.AppendLine("(");
            foreach (var c in Columns)
            {
                sb.AppendLine(string.Format("    [{0}] ASC, ", c.Name));
            }
            sb.AppendLine(")");
            return sb.ToString();
        }
    }

}