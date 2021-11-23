using CommonServices.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace CommonServices.Data
{
    public class CommonServiceUnitOfWork : UnitOfWork, ICommonServiceUnitOfWork
    {
        private readonly CommonServiceDbContext context;

        public ITextRepository Texts { get; }


        public CommonServiceUnitOfWork(CommonServiceDbContext context) : base(context)
        {
            this.context = context;
            Texts = new TextRepository(context);
        }
    }
}