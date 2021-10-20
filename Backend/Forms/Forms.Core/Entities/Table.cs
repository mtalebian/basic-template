using System.Collections.Generic;

namespace Forms.Core
{
    public class Table
    {
        public string ProjectId { get; set; }
        public string Name { get; set; }

        public int GroupId { get; set; }
        public string Title { get; set; }
        public string SingularTitle { get; set; }
        public string Description { get; set; }

        public bool FlexLayout { get; set; }
        public bool Sortable { get; set; }
        public bool Filterable { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }


        public virtual Group Group { get; set; }
        public virtual ICollection<Column> Columns { get; set; }
    }
}