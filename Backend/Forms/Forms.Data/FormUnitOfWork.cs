using Forms.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace Forms.Data
{
    public class FormUnitOfWork : UnitOfWork, IFormUnitOfWork
    {
        private readonly FormDbContext context;
        public IColumnRepository Columns { get; }
        public ITableRepository Tables { get; }
        public IGroupRepository Groups { get; }
        public ITextRepository Texts { get; }


        public FormUnitOfWork(FormDbContext context) : base(context)
        {
            this.context = context;
            Columns = new ColumnRepository(context);
            Groups = new GroupRepository(context);
            Tables = new TableRepository(context);
            Texts = new TextRepository(context);
        }
    }
}