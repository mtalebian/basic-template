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
        public Response<GroupInfoDTO[]> GetGroups(string projectId)
        {
            var groups = service.GetAllGroups(projectId);
            var result = new List<GroupInfoDTO>();
            foreach (var g in groups)
            {
                var dto = g.MapTo<GroupInfoDTO>();
                dto.Items = service.GetTables(g.ProjectId, g.Id).MapTo<GroupItemDTO>().ToArray();
                result.Add(dto);
            }
            return new Response<GroupInfoDTO[]>(result.ToArray());
        }

        [HttpPost("browse-table")]
        public Response<BrowseTableDTO> BrowseTable(string projectId, string name)
        {
            var filters = (Dictionary<string, object[]>)null;
            var table = service.GetTable(projectId, name);
            var columns = service.GetColumns(table.ProjectId, table.Name);
            var data = service.ExecuteSelect(table, columns, filters);

            var result = new BrowseTableDTO();
            result.Schema = table.MapTo<TableDTO>();
            result.Schema.DataColumns = columns.MapTo<ColumnDTO>();
            result.Data = data.ToJSON();
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
