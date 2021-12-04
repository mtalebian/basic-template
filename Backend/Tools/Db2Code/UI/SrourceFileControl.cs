using Common.Data.Schema;
using System;
using System.Data.Entity.Design.PluralizationServices;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Db2Code
{
    public partial class SrourceFileControl : UserControl
    {
        public string FileName { get; set; }
        public string Folder { get { return txtFolder.Text; } set { txtFolder.Text = value; } }
        public string FullName { get { return txtFolder.Text + "\\" + FileName; } }



        public SrourceFileControl()
        {
            InitializeComponent();
        }

        private void bEntity_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start(txtFolder.Text);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void bCopy_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(txtCode.Text))
                Clipboard.Clear();
            else Clipboard.SetText(txtCode.Text);
        }

        private void bOpen_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start(FullName);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message + "\r\n" + FullName);
            }
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
            FileName = GetSingularName(table.Name) + ".cs";
            bOpen.Text = FileName;
            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using System;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Core".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + GetSingularName(table.Name));
            sb.AppendLine("    {");

            var last_was_pk = true;
            foreach (var c in table.Columns)
            {
                if (!c.IsPK && last_was_pk)
                {
                    last_was_pk = false;
                    sb.AppendLine("");
                }
                var typ = GetTypeName(c.GetColumnType());
                sb.AppendLine($"        public {typ} {c.Name} {{ get; set; }}");
            }

            foreach (var tb in table.Schema.Tables)
            {
                if (table.ToString() != tb.ToString())
                {
                    foreach (var rel in tb.Relations)
                    {
                        if (table.ToString() == rel.Table2.ToString())
                        {
                            var singular = GetSingularName(rel.Table1.Name);
                            sb.AppendLine("");
                            sb.AppendLine("        [IgnoreMap]");
                            sb.AppendLine("        public virtual " + singular + " " + singular + " { get; set; }");
                        }
                    }
                }
            }

            foreach (var r in table.Relations)
            {

                sb.AppendLine("");
                sb.AppendLine("        [IgnoreMap]");
                sb.AppendLine("        public virtual ICollection<" + GetSingularName(r.Table2.Name) + "> " + r.Table2.Name + " { get; set; }");
            }

            sb.AppendLine("    }");
            sb.AppendLine("}");
            var code = sb.ToString();
            if (table.Relations.Count > 0)
            {
                code = code.Replace("using System;", "using System;\r\nusing System.Collections.Generic;");
            }
            txtCode.Text = code;

            UpdateStatus();
        }

        private object GetTypeName(Type type)
        {
            if (type == typeof(string)) return "string";
            if (type == typeof(int)) return "int";
            if (type == typeof(DateTime)) return "DateTime";
            return type.Name;
        }


        private string GetSingularName(string name)
        {
            var srv = PluralizationService.CreateService(new CultureInfo("en"));
            return srv.Singularize(name);
        }

        private void UpdateStatus()
        {
            if (!File.Exists(FullName))
            {
                lbStatus.Text = "NEW";
                lbStatus.ForeColor = Color.Blue;
            }
            else
            {
                var s = File.ReadAllText(FullName);
                if (s.Trim() == txtCode.Text.Trim())
                {
                    lbStatus.Text = "EQUAL";
                    lbStatus.ForeColor = Color.Green;
                }
                else
                {
                    lbStatus.Text = "CHANGED !";
                    lbStatus.ForeColor = Color.Red;
                }
            }
        }


        public void GenerateIRepository(TableSchema table, string nameSpaceName)
        {
            var singular = GetSingularName(table.Name);
            FileName = "I" + singular + "Repository.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using Common.Data;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Core".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public interface I" + singular + "Repository : IRepository<" + singular + ">");
            sb.AppendLine("    {");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            var code = sb.ToString();
            txtCode.Text = code;

            UpdateStatus();
        }

        public void GenerateRepository(TableSchema table, string nameSpaceName)
        {
            var singular = GetSingularName(table.Name);
            FileName = singular + "Repository.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using Common.Data;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singular + "Repository : Repository<" + singular + ">, I" + singular + "RepositoryIRepository");
            sb.AppendLine("    {");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            var code = sb.ToString();
            txtCode.Text = code;

            UpdateStatus();
        }

        public void GenerateConfig(TableSchema table, string nameSpaceName)
        {
            var singular = GetSingularName(table.Name);
            FileName = singular + "Config.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using {}.Core".Replace("{}", nameSpaceName));
            sb.AppendLine("using Microsoft.EntityFrameworkCore;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singular + "Config");
            sb.AppendLine("    {");
            sb.AppendLine("        public " + singular + "Config(ModelBuilder modelBuilder)");
            sb.AppendLine("        {");
            sb.AppendLine("            var helper = new ConfigHelper<Application>(modelBuilder, \"" + table.ToString() + "\");");
            foreach (var c in table.Columns)
            {
                if (c.IsPK)
                {
                    sb.AppendLine("            helper.HasKey(x => x.Id);");
                }
            }

            foreach (var c in table.Columns)
            {
                sb.AppendLine("            helper." + c.TypeSchema.InternalType.Name + "(x => x." + c.Name + ", " + c.Length + ", " + (!c.IsNullable).ToJson() + ");");
            }

            sb.AppendLine("        }");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            var code = sb.ToString();
            txtCode.Text = code;

            UpdateStatus();
        }

        public void GenerateUnitOfWork(TableSchema table, string nameSpaceName)
        {
        }

    }
}
