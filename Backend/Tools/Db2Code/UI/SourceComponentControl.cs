using Common.Data.Schema;
using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace Db2Code
{
    public partial class SourceComponentControl : UserControl
    {
        public TableSchema table { get; set; }
        public string Namespace { get { return txtNamespace.Text; } set { txtNamespace.Text = value; } }



        public SourceComponentControl()
        {
            InitializeComponent();
        }


        public void SetTableSchema(TableSchema tableSchema)
        {
            this.table = tableSchema;
            sfEntity.GenerateEntity(table, txtNamespace.Text);
            sfIRepository.GenerateIRepository(table, txtNamespace.Text);
            sfRepository.GenerateRepository(table, txtNamespace.Text);
            sfConfig.GenerateConfig(table, txtNamespace.Text);
            sfUnitOfWork.GenerateUnitOfWork(table, txtNamespace.Text);
        }

        private void txtNamespace_TextChanged(object sender, EventArgs e)
        {
            var root = txtRoot.Text.Replace("{}", txtNamespace.Text);
            sfEntity.Folder = Path.Combine(root, txtNamespace.Text + ".Core", "Entities");
            sfIRepository.Folder = Path.Combine(root, txtNamespace.Text + ".Core", "Repositories");
            sfRepository.Folder = Path.Combine(root, txtNamespace.Text + ".Data", "Repositories");
            sfConfig.Folder = Path.Combine(root, txtNamespace.Text + ".Data", "Configs");
            sfUnitOfWork.Folder = Path.Combine(root, txtNamespace.Text + ".Data");
        }
    }
}
