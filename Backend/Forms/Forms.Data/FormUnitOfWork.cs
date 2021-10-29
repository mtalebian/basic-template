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

        public ITableRepository Grids { get; }
        public IGridColumnRepository GridColumns { get; }
        public IGridVariantRepository GridVariants { get; }
        public IGroupRepository Groups { get; }
        public ITextRepository Texts { get; }


        public FormUnitOfWork(FormDbContext context) : base(context)
        {
            this.context = context;
            Grids = new GridRepository(context);
            GridColumns = new GridColumnRepository(context);
            GridVariants = new GridVariantRepository(context);
            Groups = new GroupRepository(context);
            Texts = new TextRepository(context);
        }
    }
}