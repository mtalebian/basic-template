using System;
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

        [IgnoreMap]
        public virtual ICollection<Menu> Menus { get; set; }

        [IgnoreMap]
        public virtual ICollection<MenuFolder> SubFolders { get; set; }

        [IgnoreMap]
        public virtual MenuFolder Parent { get; set; }

        [IgnoreMap]
        public virtual Project Project { get; set; }
    }
}