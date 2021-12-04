using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class RelationSchema : DbObjectSchema
    {
        public TableSchema Table1 { get; set; }
        public TableSchema Table2 { get; set; }
        public TypeEnumerable<RelationField> Conditions { get; set; }
        public bool AllRecordsFromTable1 { get; set; }
        public bool AllRecordsFromTable2 { get; set; }




        public RelationSchema(string Name, TableSchema Table1, TableSchema Table2)
            : base(Name)
        {
            this.Conditions = new TypeEnumerable<RelationField>();
            this.Table1 = Table1;
            this.Table2 = Table2;
        }

        public override string ToString()
        {
            string s = "";
            foreach (RelationField rf in Conditions)
            {
                if (s.Length > 0) s += " & ";
                s += rf.ToString();
            }
            if (string.IsNullOrEmpty(Name)) return s;
            return "(" + s + ")";
        }
    }

}