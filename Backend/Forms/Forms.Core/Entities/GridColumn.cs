using System;

namespace Forms.Core
{
    public class GridColumn
    {
        public int Id { get; set; }

        public string ProjectId { get; set; }
        public string GridId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public bool IsPK { get; set; }
        public bool IsNull { get; set; }
        public string DataType { get; set; }
        public int? MaxLen { get; set; }
        public string DefaultValue { get; set; }
        public int? Width { get; set; }
        
        public string Filter { get; set; }
        public bool FilterRequired { get; set; }
        
        public string CheckGrid { get; set; }
        public string CheckField { get; set; }

        public bool IsReadOnly { get; set; }
        public bool ShowInList { get; set; }
        public bool ShowInEditor { get; set; }

        public string Display { get; set; }
        public string ValidValues { get; set; }
        public string CellClassName { get; set; }
        public string ControlClassName { get; set; }

        public string Category { get; set; }
        public int OrdinalPosition { get; set; }

        [IgnoreMap]
        public virtual Grid Table { get; set; }
    }
}