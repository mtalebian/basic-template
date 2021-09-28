using System.Collections.Generic;

namespace Accounts.Core
{
    public class MenuFolder
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string ParentId { get; set; }
        public string Title { get; set; }
        public int SortOrder { get; set; }

        public virtual ICollection<Menu> Menus { get; set; }
        public virtual ICollection<MenuFolder> SubFolders { get; set; }
        public virtual MenuFolder Parent { get; set; }
        public virtual Project Project { get; set; }
    }
}