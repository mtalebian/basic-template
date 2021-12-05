
namespace Db2Code
{
    partial class FrontControl
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrontControl));
            this.panel1 = new System.Windows.Forms.Panel();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabTable = new System.Windows.Forms.TabPage();
            this.panel2 = new System.Windows.Forms.Panel();
            this.tabFormik = new System.Windows.Forms.TabPage();
            this.txtCode = new System.Windows.Forms.TextBox();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.panel3 = new System.Windows.Forms.Panel();
            this.tabCommon = new System.Windows.Forms.TabPage();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.tabControl1.SuspendLayout();
            this.tabTable.SuspendLayout();
            this.tabFormik.SuspendLayout();
            this.tabCommon.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(916, 71);
            this.panel1.TabIndex = 0;
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabCommon);
            this.tabControl1.Controls.Add(this.tabTable);
            this.tabControl1.Controls.Add(this.tabFormik);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 71);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(916, 551);
            this.tabControl1.TabIndex = 1;
            // 
            // tabTable
            // 
            this.tabTable.Controls.Add(this.txtCode);
            this.tabTable.Controls.Add(this.panel2);
            this.tabTable.Location = new System.Drawing.Point(4, 22);
            this.tabTable.Name = "tabTable";
            this.tabTable.Padding = new System.Windows.Forms.Padding(3);
            this.tabTable.Size = new System.Drawing.Size(908, 525);
            this.tabTable.TabIndex = 0;
            this.tabTable.Text = "Table";
            this.tabTable.UseVisualStyleBackColor = true;
            // 
            // panel2
            // 
            this.panel2.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel2.Location = new System.Drawing.Point(3, 3);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(902, 55);
            this.panel2.TabIndex = 1;
            // 
            // tabFormik
            // 
            this.tabFormik.Controls.Add(this.textBox1);
            this.tabFormik.Controls.Add(this.panel3);
            this.tabFormik.Location = new System.Drawing.Point(4, 22);
            this.tabFormik.Name = "tabFormik";
            this.tabFormik.Padding = new System.Windows.Forms.Padding(3);
            this.tabFormik.Size = new System.Drawing.Size(908, 525);
            this.tabFormik.TabIndex = 1;
            this.tabFormik.Text = "Formik";
            this.tabFormik.UseVisualStyleBackColor = true;
            // 
            // txtCode
            // 
            this.txtCode.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtCode.Location = new System.Drawing.Point(3, 58);
            this.txtCode.Margin = new System.Windows.Forms.Padding(2);
            this.txtCode.Multiline = true;
            this.txtCode.Name = "txtCode";
            this.txtCode.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.txtCode.Size = new System.Drawing.Size(902, 464);
            this.txtCode.TabIndex = 12;
            this.txtCode.WordWrap = false;
            // 
            // textBox1
            // 
            this.textBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.textBox1.Location = new System.Drawing.Point(3, 58);
            this.textBox1.Margin = new System.Windows.Forms.Padding(2);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBox1.Size = new System.Drawing.Size(902, 464);
            this.textBox1.TabIndex = 14;
            this.textBox1.WordWrap = false;
            // 
            // panel3
            // 
            this.panel3.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel3.Location = new System.Drawing.Point(3, 3);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(902, 55);
            this.panel3.TabIndex = 13;
            // 
            // tabCommon
            // 
            this.tabCommon.Controls.Add(this.textBox2);
            this.tabCommon.Location = new System.Drawing.Point(4, 22);
            this.tabCommon.Name = "tabCommon";
            this.tabCommon.Padding = new System.Windows.Forms.Padding(3);
            this.tabCommon.Size = new System.Drawing.Size(908, 525);
            this.tabCommon.TabIndex = 2;
            this.tabCommon.Text = "Common";
            this.tabCommon.UseVisualStyleBackColor = true;
            // 
            // textBox2
            // 
            this.textBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.textBox2.Location = new System.Drawing.Point(3, 3);
            this.textBox2.Margin = new System.Windows.Forms.Padding(2);
            this.textBox2.Multiline = true;
            this.textBox2.Name = "textBox2";
            this.textBox2.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBox2.Size = new System.Drawing.Size(902, 519);
            this.textBox2.TabIndex = 15;
            this.textBox2.Text = resources.GetString("textBox2.Text");
            this.textBox2.WordWrap = false;
            // 
            // FrontControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.panel1);
            this.Name = "FrontControl";
            this.Size = new System.Drawing.Size(916, 622);
            this.tabControl1.ResumeLayout(false);
            this.tabTable.ResumeLayout(false);
            this.tabTable.PerformLayout();
            this.tabFormik.ResumeLayout(false);
            this.tabFormik.PerformLayout();
            this.tabCommon.ResumeLayout(false);
            this.tabCommon.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabTable;
        private System.Windows.Forms.TabPage tabFormik;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.TextBox txtCode;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.TabPage tabCommon;
        private System.Windows.Forms.TextBox textBox2;
    }
}
