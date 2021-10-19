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
    public class TableDesignerController : ControllerBase
    {
        private readonly IFormDesignerService service;



        public TableDesignerController(IFormDesignerService formService)
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



        [HttpPost("get-table")]
        public Response<TableDTO> GetTable(string projectId, string tableName)
        {
            var table = service.GetTable(projectId, tableName);
            var result = table.MapTo<TableDTO>();
            result.DataColumns = service.GetColumns(table.ProjectId, table.Name).MapTo<ColumnDTO>().ToArray();
            return new Response<TableDTO>(result);
        }

        [HttpPost("save-table")]
        public Response<TableDTO> SaveTable(string projectId, int groupId, [FromBody] TableDTO table)
        {
            var tb = table.MapTo<Table>();
            tb.ProjectId = projectId;
            tb.GroupId = groupId;
            var columns = table.DataColumns.MapTo<Column>();
            foreach (var c in columns)
            {
                c.ProjectId = projectId;
                c.TableName = tb.Name;
            }
            service.SaveTable(ref tb, columns);
            var result = tb.MapTo<TableDTO>();
            result.DataColumns = service.GetColumns(tb.ProjectId, tb.Name).MapTo<ColumnDTO>().ToArray();
            return new Response<TableDTO>(result);
        }

        [HttpPost("delete-table")]
        public Response DeleteTable(string projectId, string tableName)
        {
            service.DeleteTable(projectId, tableName);
            return new Response();
        }



        [HttpPost("schema-columns")]
        public Response<IList<ColumnDTO>> GetSchemaColumns(string tableName)
        {
            var res = new List<ColumnDTO>();
            var tb = service.GetSchemaColumn(tableName);
            foreach (DataRow r in tb.Rows)
            {
                var c = new ColumnDTO
                {
                    Name = r.AsString("Name"),
                    Title = r.AsString("Name"),
                    DataType = r.AsString("DataType"),
                    DefaultValue = r.AsString("DefaultValue"),
                    IsNull = r.AsString("IsNull") == "YES",
                    IsPK = r.AsInt("IsPK") == 1,
                    MaxLen = r.AsInt("MaxLen"),
                    OrdinalPosition = r.AsInt("OrdinalPosition", 0),
                };
                if (c.DataType == "bit") c.Display = "check";
                else if (c.DataType == "int" || c.DataType == "bigint") c.Display = "number";
                else if (c.DataType == "varchar" || c.DataType == "nvarchar") c.Display = "text";
                else if (c.DataType == "varbinary") c.IsReadOnly = true;
                res.Add(c);
            }
            return new Response<IList<ColumnDTO>>(res);
        }


        [HttpPost("insert-column")]
        public Response<ColumnDTO> InsertColumn(string projectId, string tableName, [FromBody] ColumnDTO column)
        {
            var c = column.MapTo<Column>();
            c.ProjectId = projectId;
            c.TableName = tableName;
            service.Insert(c);
            return new Response<ColumnDTO>(c.MapTo<ColumnDTO>());
        }

        [HttpPost("update-column")]
        public Response<ColumnDTO> UpdateColumn(string projectId, string tableName, [FromBody] ColumnDTO column)
        {
            var c = column.MapTo<Column>();
            c.ProjectId = projectId;
            c.TableName = tableName;
            service.Update(ref c);
            return new Response<ColumnDTO>(c.MapTo<ColumnDTO>());
        }

        [HttpPost("delete-column")]
        public Response DeleteColumn(int id)
        {
            service.DeleteColumn(id);
            return new Response();
        }

    }
}
