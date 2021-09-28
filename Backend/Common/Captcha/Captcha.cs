using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;

namespace Common
{
    public static class Captcha
    {
        public static Bitmap GenerateImage(string code)
        {
            return GenerateImage(code, 80, 38);
        }

        public static Bitmap GenerateImage(string code, int width, int height)
        {
            var random = new Random(System.DateTime.Now.Millisecond);
            var noisy = true;
            var bmp = new Bitmap(width, height);

            using (var gfx = Graphics.FromImage((Image)bmp))
            {
                gfx.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
                gfx.SmoothingMode = SmoothingMode.AntiAlias;
                gfx.FillRectangle(Brushes.White, new Rectangle(0, 0, bmp.Width, bmp.Height));

                //add noise
                if (noisy)
                {
                    int i, r, x, y;
                    var pen = new Pen(Color.Yellow);
                    for (i = 1; i < 20; i++)
                    {
                        pen.Color = Color.FromArgb(
                        (random.Next(0, 255)),
                        (random.Next(0, 255)),
                        (random.Next(0, 255)));

                        r = random.Next(0, (130 / 3));
                        x = random.Next(0, 130);
                        y = random.Next(0, 30);

                        gfx.DrawEllipse(pen, x - r, y - r, r, r);
                    }
                }

                //add captcha
                var textX = random.Next(0, 10 * 2);
                var textY = random.Next(2, 7 * 2 - 2);
                gfx.DrawString(code, new Font("Tahoma", 14), Brushes.DarkBlue, textX, textY);
                ImageFilter.Sphere(bmp, false);
                return bmp;
            }
        }
    }
}