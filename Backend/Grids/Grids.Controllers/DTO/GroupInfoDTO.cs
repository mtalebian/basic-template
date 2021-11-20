using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GroupInfoDTO
    {
        public IList<GroupMenuDTO> Groups { get; set; }
        public IList<GridMenuDTO> Grids { get; set; }
    }
}