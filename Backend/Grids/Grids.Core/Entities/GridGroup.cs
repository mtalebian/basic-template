using System;
using System.Collections.Generic;

namespace Forms.Core
{
    public class GridGroup
    {
        public string ProjectId { get; set; }
        public int Id { get; set; }

        public int? ParentId { get; set; }
        public string Title { get; set; }

        [IgnoreMap]
        public ICollection<Grid> Tables { get; set; }
        
        [IgnoreMap]
        public GridGroup Parent { get; set; }
        
        [IgnoreMap]
        public ICollection<GridGroup> Children { get; set; }
    }
}