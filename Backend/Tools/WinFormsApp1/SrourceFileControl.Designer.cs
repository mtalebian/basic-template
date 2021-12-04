
namespace WinFormsApp1
{
    partial class SrourceFileControl
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SrourceFileControl));
            this.txtCode = new System.Windows.Forms.TextBox();
            this.bCopyIfNew = new System.Windows.Forms.Button();
            this.bOpen = new System.Windows.Forms.Button();
            this.bEntity = new System.Windows.Forms.Button();
            this.txtFolder = new System.Windows.Forms.TextBox();
            this.bCopy = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // txtCode
            // 
            this.txtCode.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtCode.Location = new System.Drawing.Point(8, 80);
            this.txtCode.Multiline = true;
            this.txtCode.Name = "txtCode";
            this.txtCode.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.txtCode.Size = new System.Drawing.Size(837, 420);
            this.txtCode.TabIndex = 11;
            this.txtCode.WordWrap = false;
            // 
            // bReplace
            // 
            this.bCopyIfNew.Location = new System.Drawing.Point(264, 37);
            this.bCopyIfNew.Name = "bReplace";
            this.bCopyIfNew.Size = new System.Drawing.Size(124, 34);
            this.bCopyIfNew.TabIndex = 8;
            this.bCopyIfNew.Text = "Create If New";
            this.bCopyIfNew.UseVisualStyleBackColor = true;
            this.bCopyIfNew.Click += new System.EventHandler(this.bCreateIfNew_Click);
            // 
            // bOpen
            // 
            this.bOpen.Location = new System.Drawing.Point(133, 37);
            this.bOpen.Name = "bOpen";
            this.bOpen.Size = new System.Drawing.Size(75, 34);
            this.bOpen.TabIndex = 9;
            this.bOpen.Text = "Open";
            this.bOpen.UseVisualStyleBackColor = true;
            this.bOpen.Click += new System.EventHandler(this.bOpen_Click);
            // 
            // bEntity
            // 
            this.bEntity.Location = new System.Drawing.Point(6, 37);
            this.bEntity.Name = "bEntity";
            this.bEntity.Size = new System.Drawing.Size(75, 34);
            this.bEntity.TabIndex = 10;
            this.bEntity.Text = "Browse";
            this.bEntity.UseVisualStyleBackColor = true;
            this.bEntity.Click += new System.EventHandler(this.bEntity_Click);
            // 
            // txtFolder
            // 
            this.txtFolder.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtFolder.Location = new System.Drawing.Point(8, 6);
            this.txtFolder.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.txtFolder.Name = "txtFolder";
            this.txtFolder.Size = new System.Drawing.Size(837, 23);
            this.txtFolder.TabIndex = 7;
            // 
            // bCopy
            // 
            this.bCopy.Image = ((System.Drawing.Image)(resources.GetObject("bCopy.Image")));
            this.bCopy.Location = new System.Drawing.Point(87, 37);
            this.bCopy.Name = "bCopy";
            this.bCopy.Size = new System.Drawing.Size(40, 34);
            this.bCopy.TabIndex = 9;
            this.bCopy.UseVisualStyleBackColor = true;
            this.bCopy.Click += new System.EventHandler(this.bCopy_Click);
            // 
            // SrourceFileControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.txtCode);
            this.Controls.Add(this.bCopyIfNew);
            this.Controls.Add(this.bCopy);
            this.Controls.Add(this.bOpen);
            this.Controls.Add(this.bEntity);
            this.Controls.Add(this.txtFolder);
            this.Name = "SrourceFileControl";
            this.Size = new System.Drawing.Size(852, 507);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtCode;
        private System.Windows.Forms.Button bCopyIfNew;
        private System.Windows.Forms.Button bOpen;
        private System.Windows.Forms.Button bEntity;
        private System.Windows.Forms.TextBox txtFolder;
        private System.Windows.Forms.Button bCopy;
    }
}
