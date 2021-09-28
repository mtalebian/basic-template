using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Api.Controllers
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize()]
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        public class Todo
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public bool IsDone { get; set; }
        }

        private static List<Todo> TodoList = new List<Todo>(new Todo[]{
            new Todo{ Id=1,Title="Smile and breathe.", IsDone=true},
            new Todo{ Id=2,Title="Memorize examples with vocabulary.", IsDone=true},
            new Todo{ Id=3,Title="Listen to learn.", IsDone=false},
            new Todo{ Id=4,Title="Exercise your mouth muscles.", IsDone=false},
            new Todo{ Id=5,Title="Copy a native speaker.", IsDone=false},
        });



        public TodoController()
        {
        }



        [HttpGet("GetAll")]
        public Response<List<Todo>> GetAll()
        {
            return new Response<List<Todo>>(TodoList);
        }


        [HttpPost("Add")]
        public Response Add([FromBody] Todo model)
        {
            if (string.IsNullOrEmpty(model.Title)) return new Response("The 'title' field is required!");
            var max = TodoList.Max(x => x.Id);
            if (max > 10) throw new Exception("OVERFLOW >>> Sample unhandled server side exception");
            TodoList.Add(new Todo { Id = max + 1, Title = model.Title, IsDone = false });
            return new Response();
        }


        [HttpPost("MarkAsDone")]
        public Response MarkAsDone(int id)
        {
            var todo = TodoList.FirstOrDefault(x => x.Id == id);
            if (todo == null) return new Response($"Item #{id} not found");
            todo.IsDone = true;
            return new Response();
        }

        [HttpPost("MarkAsUndone")]
        public Response MarkAsUndone(int id)
        {
            var todo = TodoList.FirstOrDefault(x => x.Id == id);
            if (todo == null) return new Response($"Item #{id} not found");
            todo.IsDone = false;
            return new Response();
        }

        [HttpPut("Update")]
        public Response Update([FromBody] Todo model)
        {
            var todo = TodoList.FirstOrDefault(x => x.Id == model.Id);
            if (todo == null) return new Response($"Item #{model.Id} not found");
            todo.Title = model.Title;
            return new Response();
        }

        [HttpDelete("Delete")]
        public Response Delete(int id)
        {
            var todo = TodoList.FirstOrDefault(x => x.Id == id);
            if (todo == null) return new Response($"Item #{id} not found");
            TodoList.Remove(todo);
            return new Response();
        }


    }
}
