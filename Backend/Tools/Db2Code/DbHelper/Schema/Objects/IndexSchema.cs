using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class IndexSchema : DbObjectSchema
    {
        public TableSchema Table { get; internal set; }
        public string ConstraintName { get; set; }
        public string TypeDesc { get; set; }
        
        public bool IsClustered { get { return TypeDesc.eq("CLUSTERED"); } }

        private IndexColumnSchemaCollection _Columns = null;
        public IndexColumnSchemaCollection Columns
        {
            get
            {
                if (_Columns == null) _Columns = Table.Schema.GetIndexColumns(Table, ConstraintName);
                return _Columns;
            }
        }


        public IndexSchema(TableSchema table, string name, string constraintName, string typeDesc)
            : base(name)
        {
            this.Table = table;
            this.ConstraintName = constraintName;
            this.TypeDesc = typeDesc;
        }


    }

}