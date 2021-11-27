using System;

namespace Common
{
    public static class Logger
    {
        public static void Info(string message, params object[] args)
        {
            var s = message;
            if (args != null)
            {
                foreach (var item in args)
                {
                    s += " " + (item == null ? "null" : item.ToString());
                }
            }
            Serilog.Log.Information(s);
        }

        public static void Error(Exception ex)
        {
            Serilog.Log.Error(ex, ex.Message);
        }
        
        public static void Fatal(Exception ex, string text)
        {
            Serilog.Log.Fatal(ex, text);
        }
    }
}