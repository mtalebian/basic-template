using System;
using System.Security;
using System.Text;

namespace Common.Cryptography
{

    public static class SimpleCrypto
    {
        private static SecureString _Default_Key = "./NdpLm|^#بیس$92 #w~%4!قثص#/@+12Rlبke?>/nmj349?:..\"E@fds#%AS40".ToSecureString();


        public static string Encrypt(string data)
        {
            return Encrypt(data, _Default_Key);
        }

        public static string Encrypt(string data, SecureString skey)
        {
            if (string.IsNullOrEmpty(data)) return data;
            var key = skey.ToUnsecureString();
            if (string.IsNullOrEmpty(key)) key = _Default_Key.ToUnsecureString();
            byte[] b1 = Encoding.UTF8.GetBytes(data);
            byte[] b2 = Encoding.UTF8.GetBytes(key);
            for (int i = 0; i < b1.Length; ++i)
                b1[i] = (byte)(b1[i] + i);
            for (int i = 0; i < b1.Length; ++i)
            {
                int k = i % key.Length;
                b1[i] = (byte)(b1[i] ^ b2[k]);
            }
            for (int i = 0; i < b1.Length; ++i)
                b1[i] = (byte)(b1[i] + i);
            return System.Convert.ToBase64String(b1);
        }

        public static string Decrypt(string data)
        {
            return Decrypt(data, _Default_Key);
        }

        public static string Decrypt(string data, SecureString skey)
        {
            if (string.IsNullOrEmpty(data)) return data;
            var key = skey.ToUnsecureString();
            if (string.IsNullOrEmpty(key)) key = _Default_Key.ToUnsecureString();
            byte[] b1 = System.Convert.FromBase64String(data);
            byte[] b2 = Encoding.UTF8.GetBytes(key);
            for (int i = 0; i < b1.Length; ++i)
                b1[i] = (byte)(b1[i] + 256 - i);
            for (int i = 0; i < b1.Length; ++i)
            {
                int k = i % key.Length;
                b1[i] = (byte)(b1[i] ^ b2[k]);
            }
            for (int i = 0; i < b1.Length; ++i)
                b1[i] = (byte)(b1[i] + 256 - i);
            return Encoding.UTF8.GetString(b1);
        }

    }
}