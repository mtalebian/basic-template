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
    public class GridsController : ControllerBase
    {
        private readonly IGridService service;

        public GridsController(IGridService formService)
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
                dto.Items = service.GetGrids(g.ProjectId, g.Id).MapTo<GroupItemDTO>().ToArray();
                result.Add(dto);
            }
            return new Response<GroupInfoDTO[]>(result.ToArray());
        }

        [HttpPost("get-schema")]
        public Response<GridDTO> GetSchema(string projectId, string id)
        {
            var grid = service.GetGrid(projectId, id);
            var columns = service.GetGridColumns(grid.ProjectId, grid.Id);
            var variants = service.GetGridVariants(grid.ProjectId, grid.Id);

            var result= grid.MapTo<GridDTO>();
            result.DataColumns = columns.MapTo<GridColumnDTO>();
            result.Variants = variants.MapTo<GridVariantDTO>();
            return new Response<GridDTO>(result);
        }

        [HttpPost("browse-grid")]
        public Response<BrowseGridDTO> BrowseGrid(string projectId, string id)
        {
            var filters = (Dictionary<string, object[]>)null;
            var grid = service.GetGrid(projectId, id);
            var columns = service.GetGridColumns(grid.ProjectId, grid.Id);
            var data = service.ExecuteSelect(grid, columns, filters);

            var result = new BrowseGridDTO();
            result.Schema = grid.MapTo<GridDTO>();
            result.Schema.DataColumns = columns.MapTo<GridColumnDTO>();
            result.Data = data.ToJSON();
            return new Response<BrowseGridDTO>(result);
        }

        [HttpPost("exec-grid-action")]
        public Response ExecGridAction(string projectId, [FromBody] GridActionDTO dto)
        {
            switch (dto.Action)
            {
                case "insert":
                    service.ExecuteInsert(projectId, dto.GridId, dto.Values);
                    break;

                case "update":
                    service.ExecuteUpdate(projectId, dto.GridId, dto.Values);
                    break;

                case "delete":
                    service.ExecuteDelete(projectId, dto.GridId, dto.Values);
                    break;

                default: return new Response("Invalid action!");
            }
            return new Response();
        }


        [HttpPost("get-grid-schema")]
        public Response<BrowseGridDTO> GetGridSchema(string projectId, string id)
        {
            var grid = service.GetGrid(projectId, id);
            var columns = service.GetGridColumns(grid.ProjectId, grid.Id);

            var result = new BrowseGridDTO();
            result.Schema = grid.MapTo<GridDTO>();
            result.Schema.DataColumns = columns.MapTo<GridColumnDTO>();
            result.Schema.Variants = columns.MapTo<GridVariantDTO>();
            //result.Data = data.ToJSON();
            return new Response<BrowseGridDTO>(result);
        }



    }
}
