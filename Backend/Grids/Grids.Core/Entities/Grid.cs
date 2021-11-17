using Common.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Forms.Core
{
    public class Grid : FullAuditEntity
    {
        public string ProjectId { get; set; }
        public string Id { get; set; }

        public string TableName { get; set; }
        public int GroupId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public bool Filterable { get; set; } = true;
        public bool HasFilterVariant { get; set; } = false;
        public string DefaultFilter { get; set; }

        public bool FlexLayout { get; set; }
        public string SelectSql { get; set; }
        public string InsertSql { get; set; }
        public string UpdateSql { get; set; }
        public string DeleteSql { get; set; }

        public string AzGrid { get; set; }
        public string AzSelect { get; set; }
        public string AzInsert { get; set; }
        public string AzUpdate { get; set; }
        public string AzDelete { get; set; }

        public virtual GridGroup Group { get; set; }
        public virtual ICollection<GridColumn> Columns { get; set; }
        public virtual ICollection<GridVariant> Variants { get; set; }

        public Dictionary<string, object> GetDefaultFilter()
        {
            if (string.IsNullOrEmpty(DefaultFilter)) return null;
            return JsonConvert.DeserializeObject<Dictionary<string, object>>(DefaultFilter);
        }
    }
}