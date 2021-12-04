
namespace WinFormsApp1
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
            this.databaseControl1 = new WinFormsApp1.DatabaseControl();
            this.splitter1 = new System.Windows.Forms.Splitter();
            this.tabControl2 = new System.Windows.Forms.TabControl();
            this.tabPage4 = new System.Windows.Forms.TabPage();
            this.sourceComponentControl1 = new WinFormsApp1.SourceComponentControl();
            this.tabControl2.SuspendLayout();
            this.tabPage4.SuspendLayout();
            this.SuspendLayout();
            // 
            // databaseControl1
            // 
            this.databaseControl1.ConnectionString = "";
            this.databaseControl1.Dock = System.Windows.Forms.DockStyle.Left;
            this.databaseControl1.Location = new System.Drawing.Point(0, 0);
            this.databaseControl1.Name = "databaseControl1";
            this.databaseControl1.Schema = null;
            this.databaseControl1.Size = new System.Drawing.Size(464, 603);
            this.databaseControl1.TabIndex = 0;
            this.databaseControl1.TablesLoaded += new System.EventHandler(this.databaseControl1_TablesLoaded);
            this.databaseControl1.TableSelectionChanged += new System.EventHandler(this.databaseControl1_TableSelectionChanged);
            // 
            // splitter1
            // 
            this.splitter1.Location = new System.Drawing.Point(464, 0);
            this.splitter1.Name = "splitter1";
            this.splitter1.Size = new System.Drawing.Size(6, 603);
            this.splitter1.TabIndex = 1;
            this.splitter1.TabStop = false;
            // 
            // tabControl2
            // 
            this.tabControl2.Controls.Add(this.tabPage4);
            this.tabControl2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl2.Location = new System.Drawing.Point(470, 0);
            this.tabControl2.Name = "tabControl2";
            this.tabControl2.SelectedIndex = 0;
            this.tabControl2.Size = new System.Drawing.Size(774, 603);
            this.tabControl2.TabIndex = 6;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.sourceComponentControl1);
            this.tabPage4.Location = new System.Drawing.Point(4, 29);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage4.Size = new System.Drawing.Size(766, 570);
            this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "tabPage4";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // sourceComponentControl1
            // 
            this.sourceComponentControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sourceComponentControl1.Location = new System.Drawing.Point(3, 3);
            this.sourceComponentControl1.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.sourceComponentControl1.Name = "sourceComponentControl1";
            this.sourceComponentControl1.Size = new System.Drawing.Size(760, 564);
            this.sourceComponentControl1.TabIndex = 0;
            this.sourceComponentControl1.table = null;
            // 
            // FrmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1244, 603);
            this.Controls.Add(this.tabControl2);
            this.Controls.Add(this.splitter1);
            this.Controls.Add(this.databaseControl1);
            this.Name = "FrmMain";
            this.Text = "Form1";
            this.tabControl2.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private DatabaseControl databaseControl1;
        private System.Windows.Forms.Splitter splitter1;
        private System.Windows.Forms.TabControl tabControl2;
        private System.Windows.Forms.TabPage tabPage4;
        private SourceComponentControl sourceComponentControl1;
    }
}

