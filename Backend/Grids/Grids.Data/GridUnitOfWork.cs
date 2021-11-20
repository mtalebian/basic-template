using Forms.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace Forms.Data
{
    public class GridUnitOfWork : UnitOfWork, IFormUnitOfWork
    {
        private readonly GridsDbContext context;

        public ITableRepository Grids { get; }
        public IGridColumnRepository GridColumns { get; }
        public IGridVariantRepository GridVariants { get; }
        public IGridGroupRepository GridGroups { get; }
        public ITextRepository Texts { get; }


        public GridUnitOfWork(GridsDbContext context) : base(context)
        {
            this.context = context;
            Grids = new GridRepository(context);
            GridColumns = new GridColumnRepository(context);
            GridVariants = new GridVariantRepository(context);
            GridGroups = new GridGroupRepository(context);
            Texts = new TextRepository(context);
        }
    }
}