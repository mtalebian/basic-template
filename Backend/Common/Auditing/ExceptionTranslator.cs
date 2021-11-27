
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class ExceptionTranslator
    {
        public static string Translate(Exception ex, Func<string, string> langTranslator)
        {
            var msg = GetErrorMessage(ex, 0);
            //if(string.IsNullOrWhiteSpace())
            return msg;
        }

        public static string GetErrorMessage(Exception ex, int maxMessageLen = 200, Func<string, string> langTranslator = null)
        {
            if (maxMessageLen <= 0) maxMessageLen = int.MaxValue;
            string msg = "";
            while (ex != null)
            {
                var s = ex.Message;
                if (s.Contains("<title>Runtime Error</title>") && s.Contains("The request has been terminated")) s = "Runtime Error: The request has been terminated.";
                else
                {
                    TranslateText(ref s, "An error occurred while updating the entries. See the inner exception for details.", "");
                    TranslateText(ref s, "One or more errors occurred.", null);

                    /*
                    var is_translated =
                        TranslateText(ref s, "An error occurred while sending the request", "حین ارسال درخواست، خطایی رخ داد") ||
                        TranslateText(ref s, "The proxy name could not be resolved", "آدرس پراکسی قابل شناسایی نمی باشد") ||
                        TranslateText(ref s, "The remote name could not be resolved", "دسترسي به سرور / ابنترنت برقرار نمی باشد") ||
                        TranslateText(ref s, "Response status code does not indicate success: 401 (Unauthorized)", "دسترسی مجاز نمی باشد") ||
                        TranslateText(ref s, "Unable to connect to the remote server", "دسترسي به سرور / ابنترنت برقرار نمی باشد");
                    */

                }
                if (!string.IsNullOrEmpty(s))
                {
                    if (s.Length > maxMessageLen) s = s.Substring(0, maxMessageLen) + " ...";
                    if (!string.IsNullOrEmpty(msg)) msg += "\r\n";
                    msg += langTranslator == null ? s : langTranslator(s);
                }
                ex = ex.InnerException;
            }
            return msg;
        }

        private static bool TranslateText(ref string text, string searchValue, string newValue)
        {
            var matched = true;
            foreach (var search in searchValue.Split('\r', '\n'))
            {
                if (!string.IsNullOrEmpty(search))
                {
                    if (text.IndexOf(search, StringComparison.OrdinalIgnoreCase) == -1)
                    {
                        matched = false;
                        break;
                    }
                }
            }
            if (matched)
            {
                text = text.Replace(searchValue, newValue);
                return true;
            }
            return false;
        }
    }
}