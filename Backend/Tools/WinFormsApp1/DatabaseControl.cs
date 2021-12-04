using Common.Data;
using Common.Data.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WinFormsApp1
{
    public partial class DatabaseControl : UserControl
    {
        private DbHelper dbh { get; set; }

        public DataSchema Schema { get; set; }
        public TableSchema SelectedTable { get { return treeView1.SelectedNode?.Tag as TableSchema; } }
        public string ConnectionString { get { return txtConnection.Text; } set { txtConnection.Text = value; } }

        public event EventHandler TablesLoaded;
        public event EventHandler TableSelectionChanged;



        public DatabaseControl()
        {
            InitializeComponent();
        }

        ~DatabaseControl()
        {
            dbh?.Close();
        }

        private void bGo_Click(object sender, EventArgs e)
        {
            try
            {
                dbh?.Close();
                dbh = new DbHelper("System.Data.SqlClient", txtConnection.Text);
                Schema = dbh.Schema;
                UpdateTree(treeView1.Nodes, dbh.Schema.Tables);
                TablesLoaded?.Invoke(this, EventArgs.Empty);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void UpdateTree(TreeNodeCollection nodes, TableSchemaCollection tables)
        {
            var counter = 0;
            nodes.Clear();
            foreach (var schema in tables.Select(x => x.Owner).Distinct())
            {
                var nSchema = CreateNode(schema, null);
                nodes.Add(nSchema);
                foreach (var tb in tables.Where(x => string.Equals(x.Owner, schema, StringComparison.OrdinalIgnoreCase)))
                {
                    var n = CreateNode(tb.Name, tb);
                    nSchema.Nodes.Add(n);
                    counter += 1;
                }
            }
            if (counter < 50) treeView1.ExpandAll();
        }

        private TreeNode CreateNode(string title, TableSchema tb)
        {
            var n = new TreeNode(title);
            n.Tag = tb;
            return n;
        }

        private void treeView1_AfterSelect(object sender, TreeViewEventArgs e)
        {
            TableSelectionChanged?.Invoke(this, EventArgs.Empty);
        }

    }
}
