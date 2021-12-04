using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class SPColumnSchema : DbObjectSchema
    {
        public ProcedureSchema SP { get; set; }
        public int RowNumber { get; set; }
        public TypeSchema TypeSchema { get; set; }
        public int Length { get; set; }
        public int Precision { get; set; }
        public int Scale { get; set; }
        public bool IsNullable { get; set; }
        public int DataTypeID { get { return TypeSchema.InternalType.ID; } }
        public string DefaultValue { get; set; }



        public SPColumnSchema(ProcedureSchema SP, int RowNumber, string Name, string DataType, int Length, int Precision, int Scale, bool IsNullable, string DefaultValue)
            : base(Name)
        {
            this.SP = SP;
            this.RowNumber = RowNumber;
            this.TypeSchema = new TypeSchema(DataType);
            this.Length = Length;
            this.Precision = Precision;
            this.Scale = Scale;
            this.IsNullable = IsNullable;
            this.DefaultValue = DefaultValue;
        }

        public override string ToString()
        {
            return SP.Name + "." + Name;
        }
    }

}