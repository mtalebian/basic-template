using System.Collections.Generic;

namespace Forms.Controllers
{
    public class BrowseTableDTO
    {
        public TableDTO Schema { get; set; }
        public IList<Dictionary<string, string>> Data { get; set; }

    }
}