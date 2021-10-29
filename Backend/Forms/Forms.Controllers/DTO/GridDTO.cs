using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridDTO
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string TableName { get; set; }

        public bool FlexLayout { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }

        public IList<GridColumnDTO> DataColumns { get; set; }

    }
}