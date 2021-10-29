using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridActionDTO
    {
        public string Name { get; set; }
        public string GridId { get; set; }
        public Dictionary<string, object> Values{ get; set; }
    }
}