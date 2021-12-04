using System;
using System.Collections.Generic;
using System.Text;
using Common.Data.Schema;

namespace Common.Data
{

    public class DbManagerProcedureSchema : IDbManagerOwnerNamedObject<DbManagerProcedureSchema>
    {
        public string Owner { get; set; }
        public string Name { get; set; }
        public bool IsFunction { get; set; }

        public DbManagerParameterSchema[] Parameters { get; set; }
        //public DbManagerColumnSchema[] Columns { get; set; }




        public DbManagerProcedureSchema()
        {
            Parameters = new DbManagerParameterSchema[0];
            //Columns = new DbManagerColumnSchema[0];
        }

        public DbManagerProcedureSchema(ProcedureSchema schema)
        {
            Owner = schema.Owner;
            Name = schema.Name;
            IsFunction = schema.IsFunction;
            Parameters = DbManagerParameterSchema.Convert(schema.Parameters);
            //Columns = DbManagerColumnSchema.Convert(schema.Columns);
        }



        public override string ToString()
        {
            if (string.IsNullOrEmpty(Owner)) return Name;
            return Owner + "." + Name;
        }

        public static DbManagerProcedureSchema[] Convert(ProcedureSchemaCollection procedures)
        {
            var list = new List<DbManagerProcedureSchema>();
            if (procedures != null)
                foreach (var item in procedures)
                    list.Add(new DbManagerProcedureSchema(item));
            list.Sort(comparison);
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerProcedureSchema obj2)
        {
            var list = new List<string>();
            if (IsFunction != obj2.IsFunction) list.Add(IsFunction ? "remove IsFunction" : "set IsFunction");
            var cs = Parameters.GetChangeScript(obj2.Parameters, "PARAMETER");
            if (!string.IsNullOrEmpty(cs))
                list.Add("-- change the " + ToString() + " to :  " + cs);
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }


        private static int comparison(DbManagerProcedureSchema x, DbManagerProcedureSchema y)
        {
            return string.Compare(x.Name, y.Name);
        }

    }

}