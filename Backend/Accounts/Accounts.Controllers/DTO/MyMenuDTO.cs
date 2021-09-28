using System.Collections.Generic;

namespace Accounts.Controllers
{
    public class MyMenuDTO
    {
        public IList<MenuFolderDTO> MenuFolders { get; set; }
        public IList<MenuDTO> Menus { get; set; }
    }
}