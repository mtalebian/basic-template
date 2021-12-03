using Common.Data.Schema;
using System;
using System.Data;
using System.Text;

namespace Common.Data
{

    public class DbManagerDataSchema
    {
        public DbManagerTableSchema[] Tables { get; set; }
        public DbManagerTableSchema[] Views { get; set; }
        public DbManagerProcedureSchema[] Procedures { get; set; }
        public DbManagerProcedureSchema[] Functions { get; set; }



        public DbManagerDataSchema()
        {
        }


        public DbManagerDataSchema(DataSchema schema)
        {
            Tables = DbManagerTableSchema.Convert(schema.Tables);
            Views = DbManagerTableSchema.Convert(schema.Views);
            Procedures = DbManagerProcedureSchema.Convert(schema.Procedures);
            Functions = DbManagerProcedureSchema.Convert(schema.Functions);
        }

        public string GetChangeScript(DbManagerDataSchema schema)
        {
            var sb = new StringBuilder();
            var cs = Tables.GetChangeScript(schema.Tables, "TABLE");
            if (!string.IsNullOrEmpty(cs))
            {
                sb.AppendLine("-------------------");
                sb.AppendLine("-- Compare Tables");
                sb.AppendLine("-------------------");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            //----------------------
            cs = Views.GetChangeScript(schema.Views, "VIEW");
            if (!string.IsNullOrEmpty(cs))
            {
                sb.AppendLine("-------------------");
                sb.AppendLine("-- Compare Views");
                sb.AppendLine("-------------------");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            //----------------------
            cs = Procedures.GetChangeScript(schema.Procedures, "PROCEDURE");
            if (!string.IsNullOrEmpty(cs))
            {
                sb.AppendLine("-------------------");
                sb.AppendLine("-- Compare Procedures");
                sb.AppendLine("-------------------");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            //----------------------
            cs = Functions.GetChangeScript(schema.Functions, "FUNCTION");
            if (!string.IsNullOrEmpty(cs))
            {
                sb.AppendLine("-------------------");
                sb.AppendLine("-- Compare Functions");
                sb.AppendLine("-------------------");
                sb.AppendLine(cs);
                sb.AppendLine("");
            }
            return sb.Length > 0 ? sb.ToString() : null;
        }

        public DbManagerTableSchema FindTable(string tbName)
        {
            foreach (var tb in Tables)
                if (tb.ToString().eq(tbName))
                    return tb;
            return null;
        }


    }

}