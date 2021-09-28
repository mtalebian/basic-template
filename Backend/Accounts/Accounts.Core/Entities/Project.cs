using System.Collections.Generic;

namespace Accounts.Core
{
    public class Project
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Menu> Menus { get; set; }
        public virtual ICollection<MenuFolder> MenuFolders { get; set; }
        public virtual ICollection<AzObject> AzObjects { get; set; }
        public virtual ICollection<AzField> AzFields { get; set; }
    }
}