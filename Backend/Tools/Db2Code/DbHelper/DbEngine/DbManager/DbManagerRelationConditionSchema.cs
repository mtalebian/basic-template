using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{

    public class DbManagerRelationConditionSchema: IDbManagerNamedObject<DbManagerRelationConditionSchema>
    {
        public string Table1 { get; set; }
        public string Column1 { get; set; }
        public string Table2 { get; set; }
        public string Column2 { get; set; }

        public string Name { get { return ToString(); } }



        public DbManagerRelationConditionSchema()
        {
        }

        public DbManagerRelationConditionSchema(RelationField cond)
        {
            Table1 = cond.Table1.ToString();
            Table2 = cond.Table2.ToString();
            Column1 = cond.Column1.ToString();
            Column2 = cond.Column2.ToString();
        }

        public static DbManagerRelationConditionSchema[] Convert(TypeEnumerable<RelationField> conditions)
        {
            var list = new List<DbManagerRelationConditionSchema>();
            foreach (var cond in conditions)
                list.Add(new DbManagerRelationConditionSchema(cond));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerRelationConditionSchema obj2)
        {
            var list = new List<string>();
            if (Table1 != obj2.Table1) list.Add("Table1 = " + obj2.Table1);
            if (Column1 != obj2.Column1) list.Add("Column1 = " + obj2.Column1);
            if (Table2 != obj2.Table2) list.Add("Table2 = " + obj2.Table2);
            if (Column2 != obj2.Column2) list.Add("Column2 = " + obj2.Column2);
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }

        public override string ToString()
        {
            return string.Format("{0}.{1} = {2}.{3}", Table1, Column1, Table2, Column2);
        }
    }

}