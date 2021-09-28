using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Common
{
    public static class SecurityKeyGenerator
    {
        private const string InternalKey = "Mt@eHr-039p}{dwqweqoLKJAny>-thell0/e1rAnst@1Kc0";

        public enum Result
        {
            Success = 0,
            InvalidCode,
            IsExpired
        }


        public static byte[] GenerateTimeStampKey(string id, string data, int durationInMinutes)
        {
            var expireAt = DateTime.Now.AddMinutes(durationInMinutes);
            var hashedData = Cryptography.SHA1.Hash(data);
            var text = hashedData + id + "@" + expireAt.ToString();
            var bytes = Cryptography.Rijndael.Encrypt(text, InternalKey);
            return bytes;
        }

        public static bool IsValidTimeStampKey(string id, string data, byte[] key)
        {
            var bytes = Common.Cryptography.Rijndael.Decrypt(key, InternalKey);
            var plain_text = System.Text.Encoding.UTF8.GetString(bytes);
            var parts = plain_text.Split('@');

            if (parts.Length != 2)
            {
                return false;// Result.InvalidCode;
            }

            var hashedData = Cryptography.SHA1.Hash(data);
            if (hashedData + id != parts[0])
            {
                return false;// Result.InvalidCode;
            }

            var expireAt = DateTime.Parse(parts[1]);
            if (DateTime.Now > expireAt)
            {
                return false;// Result.IsExpired;
            }

            return true;// Result.Success;
        }


        public static string GenerateVerificationCode(int length)
        {
            return GenerateRandomString("123456789".ToCharArray(), length);
        }

        public static string GenerateVerificationCode(int length, string validChars)
        {
            return GenerateRandomString(validChars.ToCharArray(), length);
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


        public static string GeneratePasswordCharecterAndDigit()
        {
            var Caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            var Lows = "abcdefghijklmnopqrstuvwxyz".ToCharArray();
            var digits = "123456789".ToCharArray();
            var str = GenerateRandomString(Lows, 3);
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
