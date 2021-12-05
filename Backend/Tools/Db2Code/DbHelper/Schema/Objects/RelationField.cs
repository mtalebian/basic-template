using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class RelationField
    {
        public ColumnSchema Column1 { get; set; }
        public ColumnSchema Column2 { get; set; }
        public TableSchema Table1 { get; set; }
        public TableSchema Table2 { get; set; }


        public RelationField(TableSchema table1, ColumnSchema column1, TableSchema table2, ColumnSchema column2)
        {
            this.Table1 = table1;
            this.Table2 = table2;
            this.Column1 = column1;
            this.Column2 = column2;
        }

        public override string ToString()
        {
            return Column1.ToString() + "=" + Column2.ToString();
        }
    }

}