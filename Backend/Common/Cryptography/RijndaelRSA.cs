using System;

namespace Common.Cryptography
{

    public static class RijndaelRSA
    {
        enum TransformType { ENCRYPT = 0, DECRYPT = 1 }


        public static string EncryptBase64(string data, string rsaPublicKey)
        {
            if (string.IsNullOrEmpty(data)) return data;
            byte[] encryptedData = Encrypt(data, rsaPublicKey);
            return System.Convert.ToBase64String(encryptedData);
        }

        public static byte[] Encrypt(string data, string rsaPublicKey)
        {
            byte[] dataBytes = Convert.ToBytes(data);
            return Encrypt(dataBytes, rsaPublicKey);
        }

        public static byte[] Encrypt(byte[] dataBytes, string rsaPublicKey)
        {
            if (dataBytes == null || dataBytes.Length < 1) return dataBytes;
            string rijndaelKey = Guid.NewGuid().ToString();
            string encryptedRijndaelKey = RSA.EncryptBase64(rijndaelKey, rsaPublicKey);
            byte[] encryptedRijndaelKeyBytes = Convert.ToBytes(encryptedRijndaelKey);
            byte[] encryptedDataBytes = Rijndael.Encrypt(dataBytes, rijndaelKey);

            byte[] KeyLenBytes = BitConverter.GetBytes(encryptedRijndaelKeyBytes.Length);
            byte[] buf = new byte[1 + KeyLenBytes.Length + encryptedRijndaelKeyBytes.Length + encryptedDataBytes.Length];

            buf[0] = (byte)KeyLenBytes.Length;
            int BufPos = 1;
            Write_Buf(buf, ref BufPos, KeyLenBytes);
            Write_Buf(buf, ref BufPos, encryptedRijndaelKeyBytes);
            Write_Buf(buf, ref BufPos, encryptedDataBytes);
            return buf;
        }



        public static string DecryptBase64(string encryptedData, string rsaPrivateKey)
        {
            if (string.IsNullOrEmpty(encryptedData)) return encryptedData;
            byte[] encryptedDataBytes = System.Convert.FromBase64String(encryptedData);
            byte[] dataBytes = Decrypt(encryptedDataBytes, rsaPrivateKey);
            return Convert.ToString(dataBytes);
        }

        public static byte[] Decrypt(string encryptedData, string rsaPrivateKey)
        {
            byte[] encryptedDataBytes = Convert.ToBytes(encryptedData);
            return Decrypt(encryptedDataBytes, rsaPrivateKey);
        }

        public static byte[] Decrypt(byte[] buf, string rsaPrivateKey)
        {
            if (buf == null || buf.Length < 1) return buf;
            int KeyLen_Len = buf[0];
            int BufPos = 1;
            byte[] KeyLenBytes = Read_Buf(buf, ref BufPos, KeyLen_Len);
            int KeyLen = BitConverter.ToInt32(KeyLenBytes, 0);
            byte[] encryptedRijndaelKeyBytes = Read_Buf(buf, ref BufPos, KeyLen);
            byte[] encryptedDataBytes = Read_Buf(buf, ref BufPos, -1);
            string rijndaelKey = RSA.DecryptBase64(Convert.ToString(encryptedRijndaelKeyBytes), rsaPrivateKey);
            return Rijndael.Decrypt(encryptedDataBytes, rijndaelKey);
        }


        private static void Write_Buf(byte[] dest, ref int pos, byte[] src)
        {
            Array.Copy(src, 0, dest, pos, src.Length);
            pos += src.Length;
        }

        private static byte[] Read_Buf(byte[] src, ref int pos, int len)
        {
            if (len == -1) len = src.Length - pos;
            byte[] dest = new byte[len];
            Array.Copy(src, pos, dest, 0, dest.Length);
            pos += dest.Length;
            return dest;
        }

    }

}