using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Accounts.Data
{
    public class AuthorizationConfig
    {
        public AuthorizationConfig(ModelBuilder modelBuilder, AccountsConfig config) 
        {
            var helper = new ConfigHelper<Authorization>(modelBuilder, config.AuthorizationsTableName);
            helper.HasKey(x => x.Id);
            helper.IsAutoIncrement(x => x.Id);
            helper.DefineProjectId(x => x.ProjectId);
            helper.DefineObjectId(x => x.ObjectId);
            helper.DefineRoleId(x => x.RoleId);
            helper.DefineTitle(x => x.Title);
        }
    }
}