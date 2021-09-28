using System;

namespace Accounts.Core
{
    public class Menu
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string ParentId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string ApplicationId { get; set; }
        public bool OpenInNewTab { get; set; }
        public int SortOrder { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual MenuFolder Parent { get; set; }
        public virtual Application Application { get; set; }
        public virtual Project Project { get; set; }
    }
}