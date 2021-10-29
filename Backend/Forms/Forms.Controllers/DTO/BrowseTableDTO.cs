using System.Collections.Generic;

namespace Forms.Controllers
{
    public class BrowseTableDTO
    {
        public GridDTO Schema { get; set; }
        public IList<Dictionary<string, object>> Data { get; set; }

    }
}