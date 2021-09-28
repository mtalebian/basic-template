using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Common.Cryptography
{

    public static class Rijndael
    {
        enum TransformType { ENCRYPT = 0, DECRYPT = 1 }


        public static string EncryptBase64(string data, string key)
        {
            if (string.IsNullOrEmpty(data)) return data;
            byte[] encryptedData = Encrypt(data, key);
            return System.Convert.ToBase64String(encryptedData);
        }

        public static byte[] Encrypt(string data, string key)
        {
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            return Encrypt(dataBytes, key);
        }

        public static byte[] Encrypt(byte[] dataBytes, string key)
        {
            byte[] algorithm_key;
            byte[] algorithm_iv;
            GenerateKey(key, out algorithm_key, out algorithm_iv);
            return Transform(dataBytes, TransformType.ENCRYPT, algorithm_key, algorithm_iv);
        }


        public static string DecryptBase64(string encryptedData, string key)
        {
            if (string.IsNullOrEmpty(encryptedData)) return encryptedData;
            return Encoding.UTF8.GetString(Decrypt(encryptedData, key));
        }

        public static byte[] Decrypt(string encryptedData, string key)
        {
            byte[] encryptedDataBytes = System.Convert.FromBase64String(encryptedData);
            return Decrypt(encryptedDataBytes, key);
        }

        public static byte[] Decrypt(byte[] input, string key)
        {
            byte[] algorithm_key;
            byte[] algorithm_iv;
            GenerateKey(key, out algorithm_key, out algorithm_iv);
            return Transform(input, TransformType.DECRYPT, algorithm_key, algorithm_iv);
        }

        private static void GenerateKey(string SecretPhrase, out byte[] key, out byte[] iv)
        {
            key = new byte[24];
            iv = new byte[16];
            byte[] bytePhrase = Encoding.ASCII.GetBytes(SecretPhrase);
            SHA384Managed sha384 = new SHA384Managed();
            sha384.ComputeHash(bytePhrase);
            byte[] result = sha384.Hash;
            for (int loop = 0; loop < 24; loop++) key[loop] = result[loop];
            for (int loop = 24; loop < 40; loop++) iv[loop - 24] = result[loop];
        }

        private static byte[] Transform(byte[] input, TransformType transformType, byte[] key, byte[] iv)
        {
            if (input == null) throw new ArgumentNullException("input");
            using (RijndaelManaged rijndael = new RijndaelManaged())
            {
                rijndael.Key = key;
                rijndael.IV = iv;
                ICryptoTransform rijndaelTransform = transformType == TransformType.ENCRYPT ? rijndael.CreateEncryptor() : rijndael.CreateDecryptor();
                MemoryStream memStream = new MemoryStream();
                CryptoStream cryptoStream = new CryptoStream(memStream, rijndaelTransform, CryptoStreamMode.Write);
                cryptoStream.Write(input, 0, input.Length);
                cryptoStream.FlushFinalBlock();
                var res = memStream.ToArray();
                cryptoStream.Close();
                rijndael.Clear();
                return res;
            }
        }

    }

}