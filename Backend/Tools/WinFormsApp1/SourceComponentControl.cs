using Common.Data.Schema;
using System;
using System.Diagnostics;
using System.Windows.Forms;

namespace WinFormsApp1
{
    public partial class SourceComponentControl : UserControl
    {
        public TableSchema table { get; set; }



        public SourceComponentControl()
        {
            InitializeComponent();
        }


        public void SetTableSchema(TableSchema tableSchema)
        {
            this.table = tableSchema;
        }

        

    }
}
