using Common;
using Forms.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Forms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [EnableCors("react")]
    public class GridBuilderController : ControllerBase
    {
        private readonly IGridBuilderService service;



        public GridBuilderController(IGridBuilderService formService)
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

        [HttpPost("insert-group")]
        public Response<GroupDTO> InsertGroup(string projectId, [FromBody] GroupDTO group)
        {
            var g = group.MapTo<Group>();
            g.ProjectId = projectId;
            service.Insert(g);
            return new Response<GroupDTO>(g.MapTo<GroupDTO>());
        }

        [HttpPost("update-group")]
        public Response<GroupDTO> UpdateGroup(string projectId, [FromBody] GroupDTO group)
        {
            var g = group.MapTo<Group>();
            g.ProjectId = projectId;
            service.Update(ref g);
            return new Response<GroupDTO>(g.MapTo<GroupDTO>());
        }

        [HttpPost("delete-group")]
        public Response DeleteGroup(string projectId, int groupId)
        {
            service.DeleteGroup(projectId, groupId);
            return new Response();
        }



        [HttpPost("get-grid")]
        public Response<GridDTO> GetGrid(string projectId, string id)
        {
            var grid = service.GetGrid(projectId, id);
            var result = grid.MapTo<GridDTO>();
            result.DataColumns = service.GetGridColumns(grid.ProjectId, grid.Id).MapTo<GridColumnDTO>();
            return new Response<GridDTO>(result);
        }

        [HttpPost("save-grid")]
        public Response<GridDTO> SaveGrid(string projectId, int groupId, [FromBody] GridDTO dto)
        {
            var grd = dto.MapTo<Grid>();
            grd.ProjectId = projectId;
            grd.GroupId = groupId;
            var columns = dto.DataColumns.MapTo<GridColumn>();
            foreach (var c in columns)
            {
                c.ProjectId = projectId;
                c.GridId = grd.Id;
            }
            service.SaveGrid(ref grd, columns);
            var result = grd.MapTo<GridDTO>();
            result.DataColumns = service.GetGridColumns(grd.ProjectId, grd.Id).MapTo<GridColumnDTO>();
            return new Response<GridDTO>(result);
        }

        [HttpPost("delete-grid")]
        public Response DeleteGrid(string projectId, string gridId)
        {
            service.DeleteGrid(projectId, gridId);
            return new Response();
        }



        [HttpPost("schema-columns")]
        public Response<IList<GridColumnDTO>> GetSchemaColumns(string tableName)
        {
            var res = new List<GridColumnDTO>();
            var tb = service.GetSchemaColumn(tableName);
            foreach (DataRow r in tb.Rows)
            {
                var data_type = r.AsString("DataType");
                var c = new GridColumnDTO
                {
                    Name = r.AsString("Name"),
                    Title = r.AsString("Name"),
                    IsPK = r.AsInt("IsPK") == 1,
                    IsNull = r.AsString("IsNull") == "YES",
                    DataType = data_type,
                    MaxLen = r.AsInt("MaxLen"),
                    DefaultValue = r.AsString("DefaultValue"),
                    Filter = data_type == "int" || data_type == "bigint" ? "range" : "simple",
                    IsReadOnly = false,
                    ShowInList = true,
                    ShowInEditor = true,
                    CellClassName = data_type == "varchar" ? "ltr" : null,
                    ControlClassName = data_type == "varchar" ? "ltr" : null,
                    OrdinalPosition = r.AsInt("OrdinalPosition", 0),
                };
                if (data_type == "bit") c.Display = "check";
                else if (data_type == "int" || data_type == "bigint") c.Display = "number";
                else if (data_type == "varchar" || data_type == "nvarchar") c.Display = "text";
                else if (data_type == "varbinary") c.IsReadOnly = true;
                res.Add(c);
            }
            return new Response<IList<GridColumnDTO>>(res);
        }

    }
}
