
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
            this.databaseControl1 = new Db2Code.DatabaseControl();
            this.cmpAccounts = new Db2Code.SourceComponentControl();
            this.SuspendLayout();
            // 
            // splitter1
            // 
            this.splitter1.Location = new System.Drawing.Point(522, 0);
            this.splitter1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.splitter1.Name = "splitter1";
            this.splitter1.Size = new System.Drawing.Size(7, 602);
            this.splitter1.TabIndex = 1;
            this.splitter1.TabStop = false;
            // 
            // databaseControl1
            // 
            this.databaseControl1.ConnectionString = "";
            this.databaseControl1.Dock = System.Windows.Forms.DockStyle.Left;
            this.databaseControl1.Location = new System.Drawing.Point(0, 0);
            this.databaseControl1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.databaseControl1.Name = "databaseControl1";
            this.databaseControl1.Schema = null;
            this.databaseControl1.Size = new System.Drawing.Size(522, 602);
            this.databaseControl1.TabIndex = 0;
            this.databaseControl1.TablesLoaded += new System.EventHandler(this.databaseControl1_TablesLoaded);
            this.databaseControl1.TableSelectionChanged += new System.EventHandler(this.databaseControl1_TableSelectionChanged);
            // 
            // cmpAccounts
            // 
            this.cmpAccounts.Dock = System.Windows.Forms.DockStyle.Fill;
            this.cmpAccounts.Location = new System.Drawing.Point(529, 0);
            this.cmpAccounts.Margin = new System.Windows.Forms.Padding(3, 5, 3, 5);
            this.cmpAccounts.Name = "cmpAccounts";
            this.cmpAccounts.Namespace = "Accounts";
            this.cmpAccounts.Size = new System.Drawing.Size(871, 602);
            this.cmpAccounts.TabIndex = 2;
            this.cmpAccounts.table = null;
            this.cmpAccounts.Visible = false;
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1400, 602);
            this.Controls.Add(this.cmpAccounts);
            this.Controls.Add(this.splitter1);
            this.Controls.Add(this.databaseControl1);
            this.Font = new System.Drawing.Font("Consolas", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "FrmMain";
            this.Text = "Form1";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.ResumeLayout(false);

        }

        #endregion
        private DatabaseControl databaseControl1;
        private System.Windows.Forms.Splitter splitter1;
        private SourceComponentControl cmpAccounts;
    }
}

