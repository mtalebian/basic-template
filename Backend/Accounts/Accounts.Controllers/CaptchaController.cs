using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Accounts.Controllers
{
    public class CaptchaController : ControllerBase
    {
        internal const string SecurityKeyCookieName = "x-security-key";

        /*
         let objectURL = 'data:image/jpeg;base64,' + blob;
         this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);;
        */

        [HttpGet]
        [Route("~/captcha")]
        public ActionResult Index()
        {
            var vcode = Common.SecurityKeyGenerator.GenerateVerificationCode(5);
            var key = Common.SecurityKeyGenerator.GenerateTimeStampKey("", vcode, 2);

            // put key in to response cookie
            var key_text = System.Convert.ToBase64String(key);
            Response.Cookies.Append(SecurityKeyCookieName, key_text, Settings.GetCookieOption());

            //
            using (var mem = new MemoryStream())
            using (var bmp = Common.Captcha.GenerateImage(vcode))
            {
                bmp.Save(mem, System.Drawing.Imaging.ImageFormat.Jpeg);
                return this.File(mem.ToArray(), "image/jpeg");
            }
        }

    }
}
