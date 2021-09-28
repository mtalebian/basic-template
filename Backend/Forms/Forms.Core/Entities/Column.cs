namespace Forms.Core
{
    public class Column
    {
        public int Id { get; set; }

        public string ProjectId { get; set; }
        public string TableName { get; set; }
        public string Name { get; set; }
        public string Expression { get; set; }
        public string Alias { get; set; }
        public string Title { get; set; }
        public bool IsPK { get; set; }
        public bool IsRequired { get; set; }
        public string DefaultValue { get; set; }
        public string Description { get; set; }

        public bool ToggleOnClick { get; set; }
        public string Editor { get; set; }
        public string ValidValues { get; set; }
        public string CellStyle { get; set; }
        public string CellClassName { get; set; }
        //fnFormat,
        public bool HiddenInTable { get; set; }
        public bool HiddenInEditor { get; set; }
        public string Category { get; set; }
        public string Dir { get; set; }

        public virtual Table Table { get; set; }
    }
}