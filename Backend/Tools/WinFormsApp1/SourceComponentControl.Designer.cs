
namespace WinFormsApp1
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
            this.sfEntity = new WinFormsApp1.SrourceFileControl();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.sfIRepository = new WinFormsApp1.SrourceFileControl();
            this.tabPage3 = new System.Windows.Forms.TabPage();
            this.sfRepository = new WinFormsApp1.SrourceFileControl();
            this.tabPage4 = new System.Windows.Forms.TabPage();
            this.sfDbContext = new WinFormsApp1.SrourceFileControl();
            this.tabPage5 = new System.Windows.Forms.TabPage();
            this.sfUnitOfWork = new WinFormsApp1.SrourceFileControl();
            this.label1 = new System.Windows.Forms.Label();
            this.txtName = new System.Windows.Forms.TextBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.tabPage4.SuspendLayout();
            this.tabPage5.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage3);
            this.tabControl1.Controls.Add(this.tabPage4);
            this.tabControl1.Controls.Add(this.tabPage5);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 35);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(861, 503);
            this.tabControl1.TabIndex = 6;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.sfEntity);
            this.tabPage1.Location = new System.Drawing.Point(4, 24);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(853, 475);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Entity";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // sfEntity
            // 
            this.sfEntity.BtnCopyIfNewVisible = true;
            this.sfEntity.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfEntity.FileName = null;
            this.sfEntity.Location = new System.Drawing.Point(3, 3);
            this.sfEntity.Name = "sfEntity";
            this.sfEntity.Size = new System.Drawing.Size(847, 469);
            this.sfEntity.TabIndex = 0;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.sfIRepository);
            this.tabPage2.Location = new System.Drawing.Point(4, 24);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(853, 475);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "IRepository";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // sfIRepository
            // 
            this.sfIRepository.BtnCopyIfNewVisible = false;
            this.sfIRepository.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfIRepository.FileName = null;
            this.sfIRepository.Location = new System.Drawing.Point(3, 3);
            this.sfIRepository.Name = "sfIRepository";
            this.sfIRepository.Size = new System.Drawing.Size(847, 469);
            this.sfIRepository.TabIndex = 1;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.sfRepository);
            this.tabPage3.Location = new System.Drawing.Point(4, 24);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(853, 475);
            this.tabPage3.TabIndex = 2;
            this.tabPage3.Text = "Repository";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // sfRepository
            // 
            this.sfRepository.BtnCopyIfNewVisible = false;
            this.sfRepository.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfRepository.FileName = null;
            this.sfRepository.Location = new System.Drawing.Point(3, 3);
            this.sfRepository.Name = "sfRepository";
            this.sfRepository.Size = new System.Drawing.Size(847, 469);
            this.sfRepository.TabIndex = 1;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.sfDbContext);
            this.tabPage4.Location = new System.Drawing.Point(4, 24);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage4.Size = new System.Drawing.Size(853, 475);
            this.tabPage4.TabIndex = 3;
            this.tabPage4.Text = "DbContext";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // sfDbContext
            // 
            this.sfDbContext.BtnCopyIfNewVisible = false;
            this.sfDbContext.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfDbContext.FileName = null;
            this.sfDbContext.Location = new System.Drawing.Point(3, 3);
            this.sfDbContext.Name = "sfDbContext";
            this.sfDbContext.Size = new System.Drawing.Size(847, 469);
            this.sfDbContext.TabIndex = 1;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.sfUnitOfWork);
            this.tabPage5.Location = new System.Drawing.Point(4, 24);
            this.tabPage5.Name = "tabPage5";
            this.tabPage5.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage5.Size = new System.Drawing.Size(853, 475);
            this.tabPage5.TabIndex = 4;
            this.tabPage5.Text = "UnitOfWork";
            this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // sfUnitOfWork
            // 
            this.sfUnitOfWork.BtnCopyIfNewVisible = false;
            this.sfUnitOfWork.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sfUnitOfWork.FileName = null;
            this.sfUnitOfWork.Location = new System.Drawing.Point(3, 3);
            this.sfUnitOfWork.Name = "sfUnitOfWork";
            this.sfUnitOfWork.Size = new System.Drawing.Size(847, 469);
            this.sfUnitOfWork.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(15, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(39, 15);
            this.label1.TabIndex = 7;
            this.label1.Text = "Name";
            // 
            // txtName
            // 
            this.txtName.Location = new System.Drawing.Point(60, 6);
            this.txtName.Name = "txtName";
            this.txtName.Size = new System.Drawing.Size(226, 23);
            this.txtName.TabIndex = 8;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.txtName);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(861, 35);
            this.panel1.TabIndex = 9;
            // 
            // SourceComponentControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.panel1);
            this.Name = "SourceComponentControl";
            this.Size = new System.Drawing.Size(861, 538);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false);
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
        private System.Windows.Forms.TabPage tabPage4;
        private System.Windows.Forms.TabPage tabPage5;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtName;
        private System.Windows.Forms.Panel panel1;
        private SrourceFileControl sfEntity;
        private SrourceFileControl sfIRepository;
        private SrourceFileControl sfRepository;
        private SrourceFileControl sfDbContext;
        private SrourceFileControl sfUnitOfWork;
    }
}
