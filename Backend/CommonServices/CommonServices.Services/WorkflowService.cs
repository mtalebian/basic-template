using CommonServices.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonServices.Services
{
    internal class WorkflowService : IWorkflowService
    {
        private static readonly object sync = new object();
        private readonly ICommonServiceUnitOfWork db;


        public WorkflowService(ICommonServiceUnitOfWork db)
        {
            this.db = db;
        }

    }
}