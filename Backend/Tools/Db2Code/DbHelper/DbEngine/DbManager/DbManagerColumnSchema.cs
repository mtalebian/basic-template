using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{

    public class DbManagerColumnSchema : IDbManagerNamedObject<DbManagerColumnSchema>
    {
        public string Name { get; set; }
        public bool IsPK { get; set; }
        public string DataTypeName { get; set; }
        public int Length { get; set; }
        public int Precision { get; set; }
        public int Scale { get; set; }
        public bool IsAutoIncrement { get; set; }
        public bool IsNullable { get; set; }
        public string DefaultValue { get; set; }



        public DbManagerColumnSchema()
        {
        }

        public DbManagerColumnSchema(ColumnSchema cs)
        {
            IsPK = cs.IsPK;
            Name = cs.Name;
            DataTypeName = cs.TypeSchema.InternalType.ToString();
            Length = cs.Length;
            Precision = cs.Precision;
            Scale = cs.Scale;
            IsAutoIncrement = cs.IsAutoIncrement;
            IsNullable = cs.IsNullable;
            DefaultValue = cs.DefaultValue;
        }

        public static DbManagerColumnSchema[] Convert(ColumnSchemaCollection columns)
        {
            var list = new List<DbManagerColumnSchema>();
            foreach (var item in columns)
                list.Add(new DbManagerColumnSchema(item));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerColumnSchema obj2)
        {
            var list = new List<string>();
            if (IsPK != obj2.IsPK) list.Add(IsPK ? "remove PK" : "set PK");
            if (DataTypeName != obj2.DataTypeName) list.Add("DATA-TYPE = '" + obj2.DataTypeName + "'");
            if (Length != obj2.Length) list.Add("LENGTH = " + obj2.Length);
            if (Precision != obj2.Precision) list.Add("PRECISION = " + obj2.Precision);
            if (Scale != obj2.Scale) list.Add("SCALE = " + obj2.Scale);
            if (IsAutoIncrement != obj2.IsAutoIncrement) list.Add(IsAutoIncrement ? "remove AUTOINCREMENT" : "set AUTOINCREMENT");
            if (IsNullable != obj2.IsNullable) list.Add(IsNullable ? "remove NULLABLE" : "set NULLABLE");
            if (DefaultValue != obj2.DefaultValue) list.Add("DEFAULT-VALUE = '" + obj2.DefaultValue + "'");
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }


        public string GetSqlType()
        {
            var dt = DataTypeName;
            if (dt.eq("decimal")) return dt + "(" + Precision + ", " + Scale + ")";
            if (dt.eq("char") || dt.eq("nchar") || dt.eq("varchar") || dt.eq("nvarchar") || dt.eq("binary"))
                return dt + "(" + (Length == int.MaxValue ? "MAX" : Length.ToString()) + ")";
            return dt;
        }

        public override string ToString()
        {
            var dt = DataTypeName;
            if (dt.eq("decimal"))
                dt += "(" + Precision + ", " + Scale + ")";
            else if (dt.eq("char") || dt.eq("nchar") || dt.eq("varchar") || dt.eq("nvarchar") || dt.eq("binary"))
                dt += "(" + Length + ")";
            return string.Format("{0} ({1}, {2}null{3})", Name, dt.ToLower(), IsNullable ? "" : "not ", IsAutoIncrement ? ", IDENTITY" : "");
        }

    }

}