using Common.Data;
using System;
using System.Collections.Generic;

namespace Forms.Core
{
    public class Grid  : FullAuditEntity
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string TableName { get; set; }
        public int GroupId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool FlexLayout { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }

        public virtual Group Group { get; set; }
        public virtual ICollection<GridColumn> Columns { get; set; }
    }
}