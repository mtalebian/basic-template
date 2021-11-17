using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Helper
{
  public class HelperMethods
    {
        //Generate RandomNo
        public static int GenerateRandomNo()
        {
            int _min = 100000;
            int _max = 999990;
            Random rdm = new Random();
            return rdm.Next(_min, _max);
        }

        public static string GetVerificationCode(int length)
        {
            return GenerateRandomString("123456789".ToCharArray(), length);
        }

        public static string GeneratePassword()
        {
            var Caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            var Lows = "abcdefghijklmnopqrstuvwxyz".ToCharArray();
            var digits = "123456789".ToCharArray();
            var signs = "!@#$%&*+*?=".ToCharArray();
            var str = GenerateRandomString(Lows, 3);
            str += GenerateRandomString(signs, 1);
            str += GenerateRandomString(digits, 2);
            return str;
        }

        private static string GenerateRandomString(char[] charArray, int length)
        {
            var str = string.Empty;
            var random = new Random((int)DateTime.Now.Ticks + length);
            for (int i = 0; i < length; i++)
            {
                var index = random.Next(1, charArray.Length);
                if (!str.Contains(charArray.GetValue(index).ToString()))
                {
                    str += charArray.GetValue(index);
                }
                else
                {
                    i--;
                }
            }
            return str;
        }

    }
}
