using System.Collections.Generic;
using Common.Data.Schema;
using System.Text;

namespace Common.Data
{

    public class DbManagerRelationSchema : IDbManagerOwnerNamedObject<DbManagerRelationSchema>
    {

        public string Owner { get; set; }
        public string Name { get; set; }
        public bool AllRecordsFromTable1 { get; set; }
        public bool AllRecordsFromTable2 { get; set; }
        public string Table1 { get; set; }
        public string Table2 { get; set; }

        public DbManagerRelationConditionSchema[] Conditions { get; set; }



        public DbManagerRelationSchema()
        {
            Conditions = new DbManagerRelationConditionSchema[0];
        }

        public DbManagerRelationSchema(RelationSchema rel)
        {
            Name = rel.Name;
            AllRecordsFromTable1 = rel.AllRecordsFromTable1;
            AllRecordsFromTable2 = rel.AllRecordsFromTable2;
            Table1 = rel.Table1.ToString();
            Table2 = rel.Table2.ToString();
            Conditions = DbManagerRelationConditionSchema.Convert(rel.Conditions);
        }

        public static DbManagerRelationSchema[] Convert(RelationSchemaCollection relations)
        {
            var list = new List<DbManagerRelationSchema>();
            foreach (var rel in relations)
                list.Add(new DbManagerRelationSchema(rel));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerRelationSchema obj2)
        {
            var list = new List<string>();
            if (AllRecordsFromTable1 != obj2.AllRecordsFromTable1) list.Add(AllRecordsFromTable1 ? "remove AllRecordsFromTable1" : "set AllRecordsFromTable1");
            if (AllRecordsFromTable2 != obj2.AllRecordsFromTable2) list.Add(AllRecordsFromTable2 ? "remove AllRecordsFromTable2" : "set AllRecordsFromTable2");
            if (Table1 != obj2.Table1) list.Add("Table1 = " + obj2.Table1);
            if (Table2 != obj2.Table2) list.Add("Table2 = " + obj2.Table2);
            var cs = Conditions.GetChangeScript(obj2.Conditions, "RELATION-CONTITION");
            if (!string.IsNullOrEmpty(cs))
                list.Add("-- change the " + ToString() + " to :  " + cs);
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(Owner)) return Name;
            return Owner + "." + Name;
        }
    }

}