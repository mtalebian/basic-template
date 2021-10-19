using Common;
using Forms.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Forms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [EnableCors("react")]
    public class TablesController : ControllerBase
    {
        private readonly IFormService service;

        public TablesController(IFormService formService)
        {
            this.service = formService;
        }


        [HttpPost("get-groups")]
        public Response<GroupInfoDTO[]> getGroups([FromBody] GetGroupsRequestDTO req)
        {
            var groups = service.GetAllGroups(req.ProjectId);
            var result = new List<GroupInfoDTO>();
            foreach (var g in groups)
            {
                var m = new GroupInfoDTO() { Title = g.Title };
                m.Items = g.Tables.MapTo<GroupItemDTO>().ToArray();
                if (m.Items.Length > 0) result.Add(m);
            }
            return new Response<GroupInfoDTO[]>(result.ToArray());
        }

        [HttpPost("browse-table")]
        public Response<BrowseTableDTO> BrowseTable(string projectId, string name, Dictionary<string, object[]> filters)
        {
            var table = service.GetTable(projectId, name);
            var columns = service.GetColumns(table.ProjectId, table.Name);
            var data = service.ExecuteSelect(table, columns, filters);

            var result = new BrowseTableDTO();
            result.Schema = table.MapTo<TableDTO>();
            result.Schema.DataColumns = columns.MapTo<ColumnDTO>();
            result.Data = data;
            return new Response<BrowseTableDTO>(result);
        }

        [HttpPost("exec-table-action")]
        public Response ExecTableAction([FromBody] TableActionDTO action)
        {
            switch (action.Name)
            {
                case "insert":
                    service.ExecuteInsert(action.TableName, action.Values);
                    break;

                case "update":
                    service.ExecuteUpdate(action.TableName, action.Values);
                    break;

                case "delete":
                    service.ExecuteDelete(action.TableName, action.Values);
                    break;

                default: return new Response("Invalid action!");
            }
            return new Response();
        }

    }
}
