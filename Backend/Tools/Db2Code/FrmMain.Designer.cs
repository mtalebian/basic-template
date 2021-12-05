
namespace Db2Code
{
    partial class FrmMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.splitter1 = new System.Windows.Forms.Splitter();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.cmp = new Db2Code.ComponentControl();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.frontControl1 = new Db2Code.FrontControl();
            this.databaseControl1 = new Db2Code.DatabaseControl();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.SuspendLayout();
            // 
            // splitter1
            // 
            this.splitter1.Location = new System.Drawing.Point(523, 0);
            this.splitter1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.splitter1.Name = "splitter1";
            this.splitter1.Size = new System.Drawing.Size(7, 602);
            this.splitter1.TabIndex = 1;
            this.splitter1.TabStop = false;
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(530, 0);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(870, 602);
            this.tabControl1.TabIndex = 3;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.cmp);
            this.tabPage1.Location = new System.Drawing.Point(4, 26);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(862, 572);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Backend";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // cmp
            // 
            this.cmp.Dock = System.Windows.Forms.DockStyle.Fill;
            this.cmp.Location = new System.Drawing.Point(3, 3);
            this.cmp.Margin = new System.Windows.Forms.Padding(3, 5, 3, 5);
            this.cmp.Name = "cmp";
            this.cmp.Namespace = "Accounts";
            this.cmp.Root = "D:\\Prog\\Git\\basic-template\\Backend\\{}";
            this.cmp.Size = new System.Drawing.Size(856, 566);
            this.cmp.TabIndex = 2;
            this.cmp.table = null;
            this.cmp.Visible = false;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.frontControl1);
            this.tabPage2.Location = new System.Drawing.Point(4, 26);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(862, 572);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Front";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // frontControl1
            // 
            this.frontControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.frontControl1.Location = new System.Drawing.Point(3, 3);
            this.frontControl1.Margin = new System.Windows.Forms.Padding(4);
            this.frontControl1.Name = "frontControl1";
            this.frontControl1.Size = new System.Drawing.Size(856, 566);
            this.frontControl1.TabIndex = 0;
            // 
            // databaseControl1
            // 
            this.databaseControl1.ConnectionString = "";
            this.databaseControl1.Dock = System.Windows.Forms.DockStyle.Left;
            this.databaseControl1.Location = new System.Drawing.Point(0, 0);
            this.databaseControl1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.databaseControl1.Name = "databaseControl1";
            this.databaseControl1.Schema = null;
            this.databaseControl1.Size = new System.Drawing.Size(523, 602);
            this.databaseControl1.TabIndex = 0;
            this.databaseControl1.TablesLoaded += new System.EventHandler(this.databaseControl1_TablesLoaded);
            this.databaseControl1.TableSelectionChanged += new System.EventHandler(this.databaseControl1_TableSelectionChanged);
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1400, 602);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.splitter1);
            this.Controls.Add(this.databaseControl1);
            this.Font = new System.Drawing.Font("Consolas", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "FrmMain";
            this.Text = "Db2Code";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private DatabaseControl databaseControl1;
        private System.Windows.Forms.Splitter splitter1;
        private ComponentControl cmp;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TabPage tabPage2;
        private FrontControl frontControl1;
    }
}

