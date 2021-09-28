using System.Security.Cryptography;
using System.Text;

namespace Common.Cryptography
{

    public static class RSA
    {
        private static bool fOAEP = false;

        private static string _RuntimePublicKey;
        private static string _RuntimePrivateKey;

        public static string RuntimePublicKey
        {
            get
            {
                GenerateRuntimeKeys();
                return _RuntimePublicKey;
            }
        }

        public static string RuntimePrivateKey
        {
            get
            {
                GenerateRuntimeKeys();
                return _RuntimePrivateKey;
            }
        }






        public static void GenerateRuntimeKeys()
        {
            if (!string.IsNullOrEmpty(_RuntimePublicKey)) return;
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                _RuntimePublicKey = rsa.ToXmlString(false);
                _RuntimePrivateKey = rsa.ToXmlString(true);
            }
        }

        public static void GenerateKeys(out string publicKey, out string privateKey)
        {
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                publicKey = rsa.ToXmlString(false);
                privateKey = rsa.ToXmlString(true);
            }
        }

        public static string EncryptBase64(string data, string publicKey)
        {
            if (string.IsNullOrEmpty(data)) return data;
            byte[] encryptedData = Encrypt(data, publicKey);
            return System.Convert.ToBase64String(encryptedData);
        }

        public static string DecryptBase64(string encryptedData, string privateKey)
        {
            if (string.IsNullOrEmpty(encryptedData)) return encryptedData;
            byte[] encryptedBuf = System.Convert.FromBase64String(encryptedData);
            return Decrypt(encryptedBuf, privateKey);
        }

        public static byte[] Encrypt(string data, string publicKey)
        {
            byte[] encryptedData;
            using (var rsa = new RSACryptoServiceProvider())
            {
                rsa.FromXmlString(publicKey);
                byte[] rgb = Encoding.UTF8.GetBytes(data);
                encryptedData = rsa.Encrypt(rgb, fOAEP);
            }
            return encryptedData;
        }

        public static string Decrypt(byte[] encryptedData, string privateKey)
        {
            string decryptedData;
            using (var rsa = new RSACryptoServiceProvider())
            {
                rsa.FromXmlString(privateKey);
                decryptedData = Encoding.UTF8.GetString(rsa.Decrypt(encryptedData, fOAEP));
            }
            return decryptedData;
        }


        public static string EncryptList(string publicKey, params object[] args)
        {
            string data = null;
            foreach (var a in args)
            {
                if (data != null) data += "\n";
                data += a.ToString();
            }
            return EncryptBase64(data, publicKey);
        }

        public static string[] DecryptList(string privateKey, string data)
        {
            if (data == null) return new string[0];
            return DecryptBase64(data, privateKey).Split('\n');
        }


    }

}
