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
                    cmp.Namespace = dic["Namespace"];
                    cmp.Root = dic["Root"];
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
                dic["Namespace"] = cmp.Namespace;
                dic["Root"] = cmp.Root;

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
                    cmp.Visible = false;
                }
                else
                {
                    cmp.Visible = true;
                    cmp.SetTableSchema(databaseControl1.SelectedTable);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
