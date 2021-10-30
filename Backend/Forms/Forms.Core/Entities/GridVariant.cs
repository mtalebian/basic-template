using Common.Data;
using System;

namespace Forms.Core
{
    public class GridVariant : FullAuditEntity
    {
        public int Serial { get; set; }

        public string ProjectId { get; set; }
        public string GridId { get; set; }

        public string FiltersData { get; set; }

        public bool IsPublic { get; set; }

    }
}