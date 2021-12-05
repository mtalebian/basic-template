using Common.Data.Schema;
using System;
using System.Data.Entity.Design.PluralizationServices;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
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
                var typ = GetCSharpTypeName(c.GetColumnType(), c.IsNullable);
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

        private object GetCSharpTypeName(Type type, bool nullable)
        {
            var q = nullable ? "?" : "";
            if (type == typeof(string)) return "string";
            if (type == typeof(int)) return "int" + q;
            if (type == typeof(Int64)) return "long" + q;
            if (type == typeof(Boolean)) return "bool" + q;
            if (type == typeof(DateTime)) return "DateTime" + q;
            if (type == typeof(byte)) return "byte" + q;
            if (type == typeof(byte[])) return "byte[]" + q;
            return type.Name + q;
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
            var singularNamespace = GetSingularName(nameSpaceName);
            FileName = singular + "Repository.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using {}.Core;".Replace("{}", nameSpaceName));
            sb.AppendLine("using Common.Data;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singular + "Repository : Repository<" + singular + ">, I" + singular + "Repository");
            sb.AppendLine("    {");
            sb.AppendLine("        public " + singular + "Repository(" + singularNamespace + "DbContext context) : base(context)");
            sb.AppendLine("        {");
            sb.AppendLine("        }");
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
            sb.AppendLine("using {}.Core;".Replace("{}", nameSpaceName));
            sb.AppendLine("using Microsoft.EntityFrameworkCore;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singular + "Config");
            sb.AppendLine("    {");
            sb.AppendLine("        public " + singular + "Config(ModelBuilder modelBuilder)");
            sb.AppendLine("        {");
            sb.AppendLine("            var helper = new ConfigHelper<" + singular + ">(modelBuilder, \"" + table.ToString() + "\");");

            var keys = table.Columns.Where(x => x.IsPK).Select(x => x.Name).ToArray();
            if (keys.Length == 1)
                sb.AppendLine("            helper.HasKey(x => x." + keys[0] + ");");
            else if (keys.Length > 1)
                sb.AppendLine("            helper.HasKey(x => new { x." + string.Join(", x.", keys) + " });");

            foreach (var c in table.Columns)
            {
                sb.AppendLine("            helper.IsAutoIncrement(x => x." + c.Name + ");");

                var typ = c.TypeSchema.InternalType.Name;
                if (typ.eq("char") || typ.eq("nchar") || typ.eq("varchar") || typ.eq("nvarchar"))
                {
                    sb.AppendLine("            helper." + typ + "(x => x." + c.Name + ", " + c.Length + ", " + (!c.IsNullable).ToJson() + ");");
                }
                else
                {
                    sb.AppendLine("            helper.IsRequired(x => x." + c.Name + ");");
                }
            }


            foreach (var tb in table.Schema.Tables)
            {
                if (table.ToString() != tb.ToString())
                {
                    foreach (var rel in tb.Relations)
                    {
                        if (table.ToString() == rel.Table2.ToString())
                        {
                            var singular1 = GetSingularName(rel.Table1.Name);
                            sb.AppendLine("");
                            sb.AppendLine("            helper.Entity()");
                            sb.AppendLine("               .HasOne(x => x." + singular1 + ")");
                            sb.AppendLine("               .WithMany(x => x." + table.Name + ")");
                            if (rel.Conditions.Count == 1)
                            {
                                sb.AppendLine("               .HasForeignKey(x => x." + rel.Conditions[0].Column2.Name + ");");
                            }
                            else
                            {
                                var rel_keys = rel.Conditions.Select(x => x.Column2.Name).ToArray();
                                sb.AppendLine("               .HasForeignKey(x => new { x." + string.Join(", x.", rel_keys) + " });");
                            }
                        }
                    }
                }
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
            var singular = GetSingularName(table.Name);
            var singularNamespace = GetSingularName(nameSpaceName);
            FileName = singularNamespace + "UnitOfWork.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using {}.Core;".Replace("{}", nameSpaceName));
            sb.AppendLine("using Common.Data;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singularNamespace + " : UnitOfWork, I" + singularNamespace + "UnitOfWork");
            sb.AppendLine("    {");
            sb.AppendLine("        public I" + singular + "Repository " + table.Name + " { get; }");
            sb.AppendLine("");
            sb.AppendLine("");
            sb.AppendLine("        public " + singularNamespace + "(" + singularNamespace + "DbContext context) : base(context)");
            sb.AppendLine("        {");
            sb.AppendLine("            " + table.Name + " = new " + singular + "Repository(context);");
            sb.AppendLine("        }");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            var code = sb.ToString();
            txtCode.Text = code;

            lbStatus.Visible = false;
        }


        public void GenerateDbContext(TableSchema table, string nameSpaceName)
        {
            var singular = GetSingularName(table.Name);
            var singularNamespace = GetSingularName(nameSpaceName);
            FileName = singularNamespace + "DbContext.cs";
            bOpen.Text = FileName;

            //-------
            var sb = new StringBuilder();
            sb.AppendLine("using {}.Core;".Replace("{}", nameSpaceName));
            sb.AppendLine("using Common.Data;");
            sb.AppendLine("using Common.Security;");
            sb.AppendLine("using Microsoft.EntityFrameworkCore;");
            sb.AppendLine("using Microsoft.Extensions.Options;");
            sb.AppendLine("");
            sb.AppendLine("namespace {}.Data".Replace("{}", nameSpaceName));
            sb.AppendLine("{");
            sb.AppendLine("    public class " + singularNamespace + "DbContext : DbContext");
            sb.AppendLine("    {");
            sb.AppendLine("");
            sb.AppendLine("        public " + singularNamespace + "DbContext(DbContextOptions<" + singularNamespace + "DbContext> options, ICurrentUserNameService currentUserNameService)");
            sb.AppendLine("            : base(options, currentUserNameService)");
            sb.AppendLine("        {");
            sb.AppendLine("        }");
            sb.AppendLine("");
            sb.AppendLine("        protected override void OnModelCreating(ModelBuilder modelBuilder)");
            sb.AppendLine("        {");
            sb.AppendLine("            base.OnModelCreating(modelBuilder);");
            sb.AppendLine("");
            sb.AppendLine("            new " + singular + "Config(modelBuilder);");
            sb.AppendLine("        }");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            var code = sb.ToString();
            txtCode.Text = code;

            lbStatus.Visible = false;
        }

    }
}
