using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{
    public class DbManagerParameterSchema : IDbManagerNamedObject<DbManagerParameterSchema>
    {
        public string Name { get; set; }
        public int RowNumber { get; set; }
        public int Length { get; set; }
        public int Precision { get; set; }
        public int Scale { get; set; }
        public string DataTypeName { get; set; }
        public bool IsNullable { get; set; }
        public string DefaultValue { get; set; }
        public DbManagerParameterMode Mode { get; set; }



        public DbManagerParameterSchema()
        {
        }

        public DbManagerParameterSchema(ParameterSchema schema)
        {
            Name = schema.Name;
            RowNumber = schema.RowNumber;
            Length = schema.Length;
            Precision = schema.Precision;
            Scale = schema.Scale;
            DataTypeName = schema.TypeSchema.Name;
            IsNullable = schema.IsNullable;
            DefaultValue = schema.DefaultValue;
            Mode = (DbManagerParameterMode)(int)schema.Mode;
        }

        internal static DbManagerParameterSchema[] Convert(ParameterSchemaCollection schema)
        {
            var list = new List<DbManagerParameterSchema>();
            foreach (var p in schema)
                list.Add(new DbManagerParameterSchema(p));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerParameterSchema obj2)
        {
            var list = new List<string>();
            if (RowNumber != obj2.RowNumber) list.Add("RowNumber = " + obj2.RowNumber);
            if (Length != obj2.Length) list.Add("Length = " + obj2.Length);
            if (Precision != obj2.Precision) list.Add("Precision = " + obj2.Precision);
            if (Scale != obj2.Scale) list.Add("Scale = " + obj2.Scale);
            if (DataTypeName != obj2.DataTypeName) list.Add("DataTypeName = " + obj2.DataTypeName);
            if (IsNullable != obj2.IsNullable) list.Add("IsNullable = " + obj2.IsNullable);
            if (DefaultValue != obj2.DefaultValue) list.Add("DefaultValue = " + obj2.DefaultValue);
            if (Mode != obj2.Mode) list.Add("Mode = " + obj2.Mode);
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }

        public override string ToString()
        {
            var dt = DataTypeName;
            if (dt.eq("decimal"))
                dt += "(" + Precision + ", " + Scale + ")";
            else if (dt.eq("char") || dt.eq("nchar") || dt.eq("varchar") || dt.eq("nvarchar") || dt.eq("binary"))
                dt += "(" + Length + ")";
            return string.Format("{0} ({1}, {2}null, {3})", Name, dt, IsNullable ? "" : "not ", Mode.ToString().ToUpper());
        }

    }

}