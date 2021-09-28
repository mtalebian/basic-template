using System.Security.Cryptography;
using System.Text;

namespace Common.Cryptography
{

    public static class MD5
    {
        
        public static string Hash(string data)
        {
            var buf = Encoding.UTF8.GetBytes(data);
            var sb = new StringBuilder();
            foreach (var b in Hash(buf))
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }

        public static byte[] Hash(byte[] data)
        {
            using (var sha = new MD5CryptoServiceProvider())
            {
                return sha.ComputeHash(data);
            }
        }

    }

}
