namespace Common
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorCode { get; set; }
        public object Result { get; set; }


        public Response()
        {
            IsSuccess = true;
            Result = null;
        }

        public Response(object result)
        {
            IsSuccess = true;
            Result = result;
        }

        public Response(string errorMessage, string errorCode = null)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
        }
    }


    public class Response<T> where T : class
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorCode { get; set; }
        public T Result { get; set; }


        public Response(string errorMessage, string errorCode = null)
        {
            IsSuccess = false;
            Result = default;
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
        }

        public Response(bool isSuccess, T result = default, string errorMessage = "")
        {
            IsSuccess = isSuccess;
            Result = result;
            ErrorMessage = errorMessage;
        }

        public Response(T result)
        {
            IsSuccess = true;
            Result = result;
            ErrorMessage = null;
        }

    }
}