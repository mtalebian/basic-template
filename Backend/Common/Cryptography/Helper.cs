using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Common.Cryptography
{
    public static class Helper
    {
        public static string HashPassword(string password)
        {
            var salt = System.Convert.FromBase64String("7Vm1lSD7Q0dFEQXq784OOQ==");
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            var bytes = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);
            return System.Convert.ToBase64String(bytes);
        }
    }
}