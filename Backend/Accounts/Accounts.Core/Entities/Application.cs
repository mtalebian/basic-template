using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class Application
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Menu> Menus { get; set; }
        public virtual ICollection<Role> Roles { get; set; }
    }
}