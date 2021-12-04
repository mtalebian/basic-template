using Common.Data.Schema;
using System.Collections.Generic;
using System;
using System.Text;

namespace Common.Data
{

    public class DbManagerTableSchema : IDbManagerOwnerNamedObject<DbManagerTableSchema>
    {
        public string Owner { get; set; }
        public string Name { get; set; }
        public DbManagerColumnSchema[] Fields { get; set; }
        public DbManagerIndexSchema[] Indexes { get; set; }
        public DbManagerRelationSchema[] Relations { get; set; }



        public DbManagerTableSchema()
        {
            Fields = new DbManagerColumnSchema[0];
            Indexes = new DbManagerIndexSchema[0];
            Relations = new DbManagerRelationSchema[0];
        }

        public DbManagerTableSchema(TableSchema ts)
        {
            Owner = ts.Owner;
            Name = ts.Name;
            Fields = DbManagerColumnSchema.Convert(ts.Columns);
            Indexes = DbManagerIndexSchema.Convert(ts.Indexes);
            Relations = DbManagerRelationSchema.Convert(ts.Relations);
        }


        public DbManagerColumnSchema[] GetPKFields()
        {
            var list = new List<DbManagerColumnSchema>();
            foreach (var f in Fields)
                if (f.IsPK) list.Add(f);
            return list.ToArray();
        }


        public static DbManagerTableSchema[] Convert(TableSchemaCollection tables)
        {
            var list = new List<DbManagerTableSchema>();
            if (tables != null)
                foreach (var ts in tables)
                    list.Add(new DbManagerTableSchema(ts));
            list.Sort(comparison);
            return list.ToArray();
        }

        private static int comparison(DbManagerTableSchema x, DbManagerTableSchema y)
        {
            return string.Compare(x.Name, y.Name);
        }


        public string GetChangeScript(DbManagerTableSchema obj2)
        {
            var sb = new StringBuilder();
            var cs = Fields.GetChangeScript(obj2.Fields, "COLUMN");
            if (!string.IsNullOrEmpty(cs))
            {
                //sb.AppendLine("---- COMPARE COLUMNS ----");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            //----------------
            cs = Indexes.GetChangeScript(obj2.Indexes, "INDEX");
            if (!string.IsNullOrEmpty(cs))
            {
                //sb.AppendLine("---- COMPARE INDEXES ----");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            //----------------
            cs = Relations.GetChangeScript(obj2.Relations, "RELATIONS");
            if (!string.IsNullOrEmpty(cs))
            {
                //sb.AppendLine("---- COMPARE RELATIONS ----");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            return sb.Length > 0 ? sb.ToString() : null;
        }

        public string GetScriptAsCreate()
        {
            var sb = new StringBuilder();
            //var pks = new List<string>();
            sb.AppendLine(string.Format("CREATE TABLE [{0}].[{1}](", Owner, Name));
            //------------
            foreach (var c in Fields)
            {
                var s = string.Format("    [{0}] {1}", c.Name, c.GetSqlType());
                if (c.IsAutoIncrement) s += " IDENTITY(1,1)";
                s += c.IsNullable ? " NOT NULL" : " NULL";
                if (!string.IsNullOrWhiteSpace(c.DefaultValue))
                    s += string.Format("CONSTRAINT [DF_{0}_{1}] DEFAULT {2}", ToString(), c.Name, c.DefaultValue);
                sb.AppendLine(s + ",");
                //if (c.IsPK) pks.Add("[" + c.Name + "] ASC");
            }
            //------------
            //if (pks.Count > 0)
            //{
            //    sb.AppendLine(string.Format("    CONSTRAINT [PK_{0}] PRIMARY KEY CLUSTERED ({1}) WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON[PRIMARY]", ToString(), string.Join(", ", pks)));
            //}
            //------------
            sb.AppendLine(")");
            sb.AppendLine();
            foreach (var idx in Indexes)
            {
                var s = idx.GetScriptAsCreate(this);
                sb.AppendLine(s);
                sb.AppendLine();
            }

            sb.AppendLine();
            return sb.ToString();
        }


        public override string ToString()
        {
            if (string.IsNullOrEmpty(Owner) || Owner.eq("dbo")) return Name;
            return Owner + "." + Name;
        }

    }
}

