using CommonServices.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonServices.Services
{
    internal class WorkflowBuilderService : IWorkflowBuilderService
    {
        private static readonly object sync = new object();
        private readonly ICommonServiceUnitOfWork db;


        public WorkflowBuilderService(ICommonServiceUnitOfWork db)
        {
            this.db = db;
        }

    }
}