using System;
using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridViewDTO
    {
        public string Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        
        public bool Filterable { get; set; } 
        public bool HasFilterVariant { get; set; } 
        
        public bool CanInsert { get; set; } 
        public bool CanUpdate { get; set; } 
        public bool CanDelete { get; set; }

        public int PageSize { get; set; }
        public bool HideCheckbox { get; set; }
        public bool ShowTableInfo { get; set; }
        public bool EnableGrouping { get; set; }


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

        [IgnoreMap]
        public IList<GridVariantDTO> Variants { get; set; }

    }
}