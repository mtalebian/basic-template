

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
        public const string InvalidUserName = "نام کاربری یافت نشد";
        public const string InsufficientPrivilege = "شما دسترسی لازم، برای کار با این وب سایت را ندارید";
        public const string InvalidProjectId = "نام پروژه نامعتبر است";
        public const string InvalidEnterCode = "كد وارد شده نامعتبر است";
        public const string ExpiredVerificationCode = "كد وارد شده منقضي شده است";

        public const string InvalidOperation = "عمليات نامعتبر است";
        public const string InvalidResetPassword = "شما امكان بازنشاني گذرواژه براي اين حساب كاربري را نداريد";
        #region UserManagment
        public const string DuplicateUser = "اين كاربر قبلا ثبت شده است";
        public const string DuplicateNationalCode = "اين كدملي قبلا ثبت شده است";
        public const string InvalidRepeatePassword = "تكرار گذرواژه معتبر نيست";
        public const string InvalidInfo = "اطلاعات ارسالي نامعتبر است";
        public const string InvalidNationalCode = "كدملي به صورت صحيح وارد نشده است";
        public const string NotFoundInformation = "اطلاعاتي يافت نشد";
        public const string PasswordIsRequired = "مقدار گذرواژه را وارد كنيد";
        public const string InvalidOldPassword = "مقدار گذرواژه قبلي صحيح نيست";
        #endregion
        #region Authorization
        public const string DuplicateRole = "اين نقش قبلا ثبت شده است";
        public const string InvalidApplication = "كد برنامه وارد شده نامعتبر است";
        #endregion
        #region Composite Role
        public const string DuplicateCompositeRole = "اين ComposirRole قبلا ثبت شده است";
        #endregion

    }
}
