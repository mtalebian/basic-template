using System;
using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridDTO
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public bool Filterable { get; set; }
        public bool HasFilterVariant { get; set; }
        
        public string TableName { get; set; }
        public bool FlexLayout { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }

        public string AzSelect { get; set; }
        public string AzEdit { get; set; }
        public string AzInsert { get; set; }
        public string AzUpdate { get; set; }
        public string AzDelete { get; set; }


        [IgnoreSourceMap]
        public string CreatedBy { get; set; }

        [IgnoreSourceMap]
        public DateTime CreatedAt { get; set; }

        [IgnoreSourceMap]
        public string ModifiedBy { get; set; }

        [IgnoreSourceMap]
        public DateTime ModifiedAt { get; set; }

        [IgnoreMap]
        public IList<GridColumnDTO> DataColumns { get; set; }


    }
}