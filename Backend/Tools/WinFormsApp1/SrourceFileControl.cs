using Common.Data.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WinFormsApp1
{
    public partial class SrourceFileControl : UserControl
    {
        public string FileName { get; set; }
        public bool BtnCopyIfNewVisible { get { return bCopyIfNew.Visible; } set { bCopyIfNew.Visible = value; } }
        public string FullName { get { return txtFolder.Text + "\\" + FileName; } }



        public SrourceFileControl()
        {
            InitializeComponent();
        }

        private void bEntity_Click(object sender, EventArgs e)
        {
            Process.Start(txtFolder.Text);
        }

        private void bCopy_Click(object sender, EventArgs e)
        {
            Clipboard.SetText(txtCode.Text);
        }

        private void bOpen_Click(object sender, EventArgs e)
        {
            Process.Start(FullName);
        }

        private void bCreateIfNew_Click(object sender, EventArgs e)
        {
            if (File.Exists(FullName))
            {
                MessageBox.Show("ERROR: File exists!", "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            File.WriteAllText(FullName, txtCode.Text);
            MessageBox.Show("Copied");
        }



        public void GenerateEntity(TableSchema table, string nameSpaceName)
        {
        }

        public void GenerateIRepository(TableSchema table)
        {
        }

        public void GenerateRepository(TableSchema table, string nameSpaceName)
        {
        }

        public void GenerateDbContext(TableSchema table, string nameSpaceName)
        {
        }

        public void GenerateUnitOfWork(TableSchema table, string nameSpaceName)
        {
        }

    }
}
