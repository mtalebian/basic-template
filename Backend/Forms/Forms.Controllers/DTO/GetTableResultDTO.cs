using System.Collections.Generic;

namespace Forms.Controllers
{
    public class GetTableResultDTO
    {
        public TableDTO Table { get; set; }
        public ColumnDTO[] Columns { get; set; }
    }
}