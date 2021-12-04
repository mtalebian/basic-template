using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Db2Code
{
    public partial class FrmMain : Form
    {
        private const string SettingsFileName = "project.settings";

        public FrmMain()
        {
            InitializeComponent();

            if (File.Exists(SettingsFileName))
            {
                try
                {
                    var j = File.ReadAllText(SettingsFileName);
                    var dic = JsonConvert.DeserializeObject<Dictionary<string, string>>(j);
                    databaseControl1.ConnectionString = dic["ConnectionString"];
                    //txtEntitiesFolder.Text = dic["EntitiesFolder"];
                    //txtIRepositoryFolder.Text = dic["IRepositoryFolder"];
                    //txtRepositoryFolder.Text = dic["RepositoryFolder"];
                    //txtUnitOfWorkFile.Text = dic["UnitOfWorkFile"];
                    //txtDbContextFile.Text = dic["DbContextFile"];
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            try
            {
                var dic = new Dictionary<string, string>();
                dic["ConnectionString"] = databaseControl1.ConnectionString;
                //dic["EntitiesFolder"] = txtEntitiesFolder.Text;
                //dic["IRepositoryFolder"] = txtIRepositoryFolder.Text;
                //dic["RepositoryFolder"] = txtRepositoryFolder.Text;
                //dic["UnitOfWorkFile"] = txtUnitOfWorkFile.Text;
                //dic["DbContextFile"] = txtDbContextFile.Text;
                var j = JsonConvert.SerializeObject(dic);
                File.WriteAllText(SettingsFileName, j);
                base.OnFormClosed(e);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void databaseControl1_TablesLoaded(object sender, EventArgs e)
        {
            try
            {
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void databaseControl1_TableSelectionChanged(object sender, EventArgs e)
        {
            try
            {
                if (databaseControl1.SelectedTable == null)
                {
                    cmpAccounts.Visible = false;
                }
                else
                {
                    cmpAccounts.Visible = true;
                    cmpAccounts.SetTableSchema(databaseControl1.SelectedTable);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
