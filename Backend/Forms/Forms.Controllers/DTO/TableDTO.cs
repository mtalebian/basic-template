using System.Collections.Generic;

namespace Forms.Controllers
{
    public class TableDTO
    {
        public string Name { get; set; }

        public string Title { get; set; }
        public string SingularTitle { get; set; }
        public string Description { get; set; }

        public bool Sortable { get; set; }
        public bool Filterable { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }
    }
}