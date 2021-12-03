
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
            this.tabPage3 = new System.Windows.Forms.TabPage();
            this.txtRepositoryFolder = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtIRepositoryFolder = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtEntitiesFolder = new System.Windows.Forms.TextBox();
            this.tabPage4 = new System.Windows.Forms.TabPage();
            this.label4 = new System.Windows.Forms.Label();
            this.txtDbContextFile = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.txtUnitOfWorkFile = new System.Windows.Forms.TextBox();
            this.tabControl2.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.SuspendLayout();
            // 
            // databaseControl1
            // 
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
            this.tabControl2.Controls.Add(this.tabPage3);
            this.tabControl2.Controls.Add(this.tabPage4);
            this.tabControl2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl2.Location = new System.Drawing.Point(470, 0);
            this.tabControl2.Name = "tabControl2";
            this.tabControl2.SelectedIndex = 0;
            this.tabControl2.Size = new System.Drawing.Size(774, 603);
            this.tabControl2.TabIndex = 6;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.txtUnitOfWorkFile);
            this.tabPage3.Controls.Add(this.label5);
            this.tabPage3.Controls.Add(this.txtDbContextFile);
            this.tabPage3.Controls.Add(this.label4);
            this.tabPage3.Controls.Add(this.txtRepositoryFolder);
            this.tabPage3.Controls.Add(this.label3);
            this.tabPage3.Controls.Add(this.txtIRepositoryFolder);
            this.tabPage3.Controls.Add(this.label1);
            this.tabPage3.Controls.Add(this.label2);
            this.tabPage3.Controls.Add(this.txtEntitiesFolder);
            this.tabPage3.Location = new System.Drawing.Point(4, 29);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(766, 570);
            this.tabPage3.TabIndex = 0;
            this.tabPage3.Text = "Folders";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // txtRepositoryFolder
            // 
            this.txtRepositoryFolder.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtRepositoryFolder.Location = new System.Drawing.Point(160, 92);
            this.txtRepositoryFolder.Name = "txtRepositoryFolder";
            this.txtRepositoryFolder.Size = new System.Drawing.Size(598, 27);
            this.txtRepositoryFolder.TabIndex = 7;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(28, 95);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(126, 20);
            this.label3.TabIndex = 6;
            this.label3.Text = "Repository Folder";
            // 
            // txtIRepositoryFolder
            // 
            this.txtIRepositoryFolder.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtIRepositoryFolder.Location = new System.Drawing.Point(160, 57);
            this.txtIRepositoryFolder.Name = "txtIRepositoryFolder";
            this.txtIRepositoryFolder.Size = new System.Drawing.Size(598, 27);
            this.txtIRepositoryFolder.TabIndex = 5;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(51, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(103, 20);
            this.label1.TabIndex = 2;
            this.label1.Text = "Entities Folder";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(24, 60);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(130, 20);
            this.label2.TabIndex = 4;
            this.label2.Text = "IRepository Folder";
            // 
            // txtEntitiesFolder
            // 
            this.txtEntitiesFolder.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtEntitiesFolder.Location = new System.Drawing.Point(160, 22);
            this.txtEntitiesFolder.Name = "txtEntitiesFolder";
            this.txtEntitiesFolder.Size = new System.Drawing.Size(598, 27);
            this.txtEntitiesFolder.TabIndex = 3;
            // 
            // tabPage4
            // 
            this.tabPage4.Location = new System.Drawing.Point(4, 29);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage4.Size = new System.Drawing.Size(619, 531);
            this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "tabPage4";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(47, 147);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(107, 20);
            this.label4.TabIndex = 6;
            this.label4.Text = "DbContext File";
            // 
            // txtDbContextFile
            // 
            this.txtDbContextFile.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtDbContextFile.Location = new System.Drawing.Point(160, 144);
            this.txtDbContextFile.Name = "txtDbContextFile";
            this.txtDbContextFile.Size = new System.Drawing.Size(598, 27);
            this.txtDbContextFile.TabIndex = 7;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(41, 182);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(113, 20);
            this.label5.TabIndex = 6;
            this.label5.Text = "UnitOfWork File";
            // 
            // txtUnitOfWorkFile
            // 
            this.txtUnitOfWorkFile.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtUnitOfWorkFile.Location = new System.Drawing.Point(160, 179);
            this.txtUnitOfWorkFile.Name = "txtUnitOfWorkFile";
            this.txtUnitOfWorkFile.Size = new System.Drawing.Size(598, 27);
            this.txtUnitOfWorkFile.TabIndex = 7;
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
            this.tabPage3.ResumeLayout(false);
            this.tabPage3.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private DatabaseControl databaseControl1;
        private System.Windows.Forms.Splitter splitter1;
        private System.Windows.Forms.TabControl tabControl2;
        private System.Windows.Forms.TabPage tabPage3;
        private System.Windows.Forms.TextBox txtUnitOfWorkFile;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox txtDbContextFile;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtRepositoryFolder;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtIRepositoryFolder;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtEntitiesFolder;
        private System.Windows.Forms.TabPage tabPage4;
    }
}

