using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class ProcedureSchema : DbObjectSchema
    {
        internal DataSchema Schema { get; set; }
        private ParameterSchemaCollection mParameters { get; set; }
        private ColumnSchemaCollection mColumns { get; set; }

        public string Catalog { get; set; }
        public string Owner { get; set; }
        public bool IsFunction { get; set; }
        public ParameterSchemaCollection Parameters
        {
            get
            {
                if (mParameters == null)
                {
                    mParameters = new ParameterSchemaCollection();
                    Schema.Internal_GetSPParams(this);
                }
                return mParameters;
            }
        }
        public ColumnSchemaCollection Columns
        {
            get
            {
                if (mColumns == null)
                {
                    mColumns = new ColumnSchemaCollection();
                    Schema.Internal_GetSPColumns(this);
                }
                return mColumns;
            }
        }




        public ProcedureSchema(DataSchema Schema, string Catalog, string Owner, string Name, bool IsFunction)
            : base(Name)
        {
            this.Schema = Schema;
            this.Catalog = Catalog;
            this.Owner = Owner;
            this.IsFunction = IsFunction;
        }
        
        public void Refresh()
        {
            if (mColumns != null) mColumns.Clear();
            mColumns = null;
            mParameters = null;
        }
        
        public override string ToString()
        {
            if (string.IsNullOrEmpty(Owner)) return Name;
            return Owner + "." + Name;
        }
    }

}