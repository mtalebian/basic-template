using System;
using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GridVariantDTO
    {
        public int Serial { get; set; }

        public string Title { get; set; }
        public bool IsPublic { get; set; }
        public bool AutoApply { get; set; }
        public string FiltersData { get; set; }
        public string ColumnsData { get; set; }
        public string SortsData { get; set; }

        [IgnoreSourceMap]
        public string CreatedBy { get; set; }

        [IgnoreSourceMap]
        public DateTime CreatedAt { get; set; }

        [IgnoreSourceMap]
        public string ModifiedBy { get; set; }

        [IgnoreSourceMap]
        public DateTime ModifiedAt { get; set; }
    }
}