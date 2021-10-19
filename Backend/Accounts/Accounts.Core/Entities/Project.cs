using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class Project
    {
        public string Id { get; set; }

        public string Title { get; set; }

        [IgnoreMap]
        public virtual ICollection<Menu> Menus { get; set; }

        [IgnoreMap]
        public virtual ICollection<MenuFolder> MenuFolders { get; set; }

        [IgnoreMap]
        public virtual ICollection<AzObject> AzObjects { get; set; }

        [IgnoreMap]
        public virtual ICollection<AzField> AzFields { get; set; }
    }
}