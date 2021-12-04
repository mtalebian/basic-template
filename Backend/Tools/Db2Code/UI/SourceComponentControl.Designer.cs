
namespace Db2Code
{
    partial class SourceComponentControl
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.sfEntity = new Db2Code.SrourceFileControl();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.sfIRepository = new Db2Code.SrourceFileControl();
            this.tabPage3 = new System.Windows.Forms.TabPage();
            this.sfRepository = new Db2Code.SrourceFileControl();
            this.tabPage6 = new System.Windows.Forms.TabPage();
            this.sfConfig = new Db2Code.SrourceFileControl();
            this.tabPage5 = new System.Windows.Forms.TabPage();
            this.sfUnitOfWork = new Db2Code.SrourceFileControl();
            this.label1 = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.txtNamespace = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtRoot = new System.Windows.Forms.TextBox();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.tabPage6.SuspendLayout();
            this.tabPage5.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage3);
            this.tabControl1.Controls.Add(this.tabPage6);
            this.tabControl1.Controls.Add(this.tabPage5);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 68);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(984, 506);
            this.tabControl1.TabIndex = 6;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.sfEntity);
            this.tabPage1.Location = new System.Drawing.Point(4, 25);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(976, 477);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Entity";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // sfEntity
            // 
            this.sfEntity.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfEntity.FileName = null;
            this.sfEntity.Folder = "";
            this.sfEntity.Location = new System.Drawing.Point(3, 3);
            this.sfEntity.Name = "sfEntity";
            this.sfEntity.Size = new System.Drawing.Size(970, 471);
            this.sfEntity.TabIndex = 0;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.sfIRepository);
            this.tabPage2.Location = new System.Drawing.Point(4, 25);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(976, 478);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "IRepository";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // sfIRepository
            // 
            this.sfIRepository.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfIRepository.FileName = null;
            this.sfIRepository.Folder = "";
            this.sfIRepository.Location = new System.Drawing.Point(3, 3);
            this.sfIRepository.Name = "sfIRepository";
            this.sfIRepository.Size = new System.Drawing.Size(970, 472);
            this.sfIRepository.TabIndex = 1;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.sfRepository);
            this.tabPage3.Location = new System.Drawing.Point(4, 25);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(976, 478);
            this.tabPage3.TabIndex = 2;
            this.tabPage3.Text = "Repository";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // sfRepository
            // 
            this.sfRepository.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfRepository.FileName = null;
            this.sfRepository.Folder = "";
            this.sfRepository.Location = new System.Drawing.Point(3, 3);
            this.sfRepository.Name = "sfRepository";
            this.sfRepository.Size = new System.Drawing.Size(970, 472);
            this.sfRepository.TabIndex = 1;
            // 
            // tabPage6
            // 
            this.tabPage6.Controls.Add(this.sfConfig);
            this.tabPage6.Location = new System.Drawing.Point(4, 25);
            this.tabPage6.Name = "tabPage6";
            this.tabPage6.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage6.Size = new System.Drawing.Size(976, 478);
            this.tabPage6.TabIndex = 5;
            this.tabPage6.Text = "Config";
            this.tabPage6.UseVisualStyleBackColor = true;
            // 
            // sfConfig
            // 
            this.sfConfig.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfConfig.FileName = null;
            this.sfConfig.Folder = "";
            this.sfConfig.Location = new System.Drawing.Point(3, 3);
            this.sfConfig.Name = "sfConfig";
            this.sfConfig.Size = new System.Drawing.Size(970, 472);
            this.sfConfig.TabIndex = 2;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.sfUnitOfWork);
            this.tabPage5.Location = new System.Drawing.Point(4, 25);
            this.tabPage5.Name = "tabPage5";
            this.tabPage5.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage5.Size = new System.Drawing.Size(976, 477);
            this.tabPage5.TabIndex = 4;
            this.tabPage5.Text = "UnitOfWork";
            this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // sfUnitOfWork
            // 
            this.sfUnitOfWork.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfUnitOfWork.FileName = null;
            this.sfUnitOfWork.Folder = "";
            this.sfUnitOfWork.Location = new System.Drawing.Point(3, 3);
            this.sfUnitOfWork.Name = "sfUnitOfWork";
            this.sfUnitOfWork.Size = new System.Drawing.Size(970, 471);
            this.sfUnitOfWork.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(17, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(83, 17);
            this.label1.TabIndex = 7;
            this.label1.Text = "Namespace";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.txtNamespace);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.txtRoot);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(984, 68);
            this.panel1.TabIndex = 9;
            // 
            // txtNamespace
            // 
            this.txtNamespace.FormattingEnabled = true;
            this.txtNamespace.Items.AddRange(new object[] {
            "Accounts",
            "Grids",
            "Messaging",
            "CommonServices",
            "Tamin"});
            this.txtNamespace.Location = new System.Drawing.Point(106, 6);
            this.txtNamespace.Name = "txtNamespace";
            this.txtNamespace.Size = new System.Drawing.Size(223, 24);
            this.txtNamespace.TabIndex = 9;
            this.txtNamespace.TextChanged += new System.EventHandler(this.txtNamespace_TextChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(62, 40);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(38, 17);
            this.label2.TabIndex = 7;
            this.label2.Text = "Root";
            // 
            // txtRoot
            // 
            this.txtRoot.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtRoot.Location = new System.Drawing.Point(106, 37);
            this.txtRoot.Name = "txtRoot";
            this.txtRoot.Size = new System.Drawing.Size(871, 22);
            this.txtRoot.TabIndex = 8;
            this.txtRoot.Text = "D:\\Prog\\Git\\basic-template\\Backend\\{}";
            // 
            // SourceComponentControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.panel1);
            this.Name = "SourceComponentControl";
            this.Size = new System.Drawing.Size(984, 574);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.tabPage6.ResumeLayout(false);
            this.tabPage5.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.TabPage tabPage3;
        private System.Windows.Forms.TabPage tabPage5;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel panel1;
        private SrourceFileControl sfEntity;
        private SrourceFileControl sfIRepository;
        private SrourceFileControl sfRepository;
        private SrourceFileControl sfUnitOfWork;
        private System.Windows.Forms.ComboBox txtNamespace;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtRoot;
        private System.Windows.Forms.TabPage tabPage6;
        private SrourceFileControl sfConfig;
    }
}
