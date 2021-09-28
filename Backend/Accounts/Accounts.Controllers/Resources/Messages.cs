using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Accounts.Controllers
{
    public static class Messages
    {
        public const string Error401 = "401";
        public const string Error403 = "403";
        public const string Error404 = "404";
        public const string InvalidCaptcha = "کد امنیتی اشتباه است";
        public const string LOGIN_COMMAND = "LOGIN";
        public const string InvalidUserNameOrPassword = "نام کاربری یا رمز ورود صحیح نمی باشد";
        public const string InvalidUserName = "نام کاربری یافت تشد";
        public const string InsufficientPrivilege = "شما دسترسی لازم، برای کار با این وب سایت را ندارید";
        public const string InvalidProjectId = "نام پروژه نامعتبر است";
    }
}
