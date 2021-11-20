using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridFilterDTO
    {
        public Dictionary<string, object> Parameters { get; set; }
        public Dictionary<string, object> Filters { get; set; }

    }
}