namespace Forms.Controllers
{
    public class ColumnDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Title { get; set; }
        public bool IsPK { get; set; }
        public bool IsNull { get; set; }
        public string DataType { get; set; }
        public int? MaxLen { get; set; }
        public string DefaultValue { get; set; }

        public bool IsReadOnly { get; set; }
        public bool ShowInList { get; set; }
        public bool ShowInEditor { get; set; }
        public string Direction { get; set; }

        public string Display { get; set; }
        public string ValidValues { get; set; }
        public string CellClassName { get; set; }

        public string Category { get; set; }
        public int OrdinalPosition { get; set; }
    }
}