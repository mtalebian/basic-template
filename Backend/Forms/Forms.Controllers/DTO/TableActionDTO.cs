using System.Collections.Generic;

namespace Forms.Controllers
{
    public class TableActionDTO
    {
        public string Name { get; set; }
        public string TableName { get; set; }
        public Dictionary<string, object> Values{ get; set; }
    }
}