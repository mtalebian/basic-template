using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class Application
    {
        public string Id { get; set; }

        public string Title { get; set; }

        [IgnoreMap]
        public virtual ICollection<Menu> Menus { get; set; }

        [IgnoreMap]
        public virtual ICollection<Role> Roles { get; set; }
    }
}
