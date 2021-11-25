using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Common.CustomExceptionMiddleware
{
    public class ResponseError
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public int ErrorCode { get; set; }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }

}
