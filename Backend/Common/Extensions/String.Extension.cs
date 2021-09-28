using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace System
{
    public static class StringExtensions
    {

        public static string ToUnsecureString(this SecureString securePassword)
        {
            IntPtr unmanagedString = IntPtr.Zero;
            try
            {
                unmanagedString = Marshal.SecureStringToGlobalAllocUnicode(securePassword);
                return Marshal.PtrToStringUni(unmanagedString);
            }
            finally
            {
                Marshal.ZeroFreeGlobalAllocUnicode(unmanagedString);
            }
        }

        public static SecureString ToSecureString(this string password)
        {
            var securePassword = new SecureString();
            foreach (var c in password)
                securePassword.AppendChar(c);
            securePassword.MakeReadOnly();
            return securePassword;
        }


        public static string ToJson(this bool value)
        {
            return value ? "true" : "false";
        }

        public static bool IsNumericType(this object value)
        {
            return
                value is sbyte || value is sbyte? ||
                value is byte || value is byte? ||
                value is short || value is short? ||
                value is ushort || value is ushort? ||
                value is int || value is int? ||
                value is uint || value is uint? ||
                value is long || value is long? ||
                value is ulong || value is ulong? ||
                value is float || value is float? ||
                value is double || value is double? ||
                value is decimal || value is decimal?;
        }

        public static bool IsNumericDataType(this Type value)
        {
            return
                value == typeof(sbyte) || value == typeof(sbyte?) ||
                value == typeof(byte) || value == typeof(byte?) ||
                value == typeof(short) || value == typeof(short?) ||
                value == typeof(ushort) || value == typeof(ushort?) ||
                value == typeof(int) || value == typeof(int?) ||
                value == typeof(uint) || value == typeof(uint?) ||
                value == typeof(long) || value == typeof(long?) ||
                value == typeof(ulong) || value == typeof(ulong?) ||
                value == typeof(float) || value == typeof(float?) ||
                value == typeof(double) || value == typeof(double?) ||
                value == typeof(decimal) || value == typeof(decimal?);
        }

        public static Int32? ToInt(this object source) { return Common.Convert.ToInt32(source); }

        public static Int32 ToInt(this object source, int defaultValue) { return Common.Convert.ToInt32(source, defaultValue); }
        


        public static byte ToByte(this object source) { return (byte)Common.Convert.ToByte(source); }


        

        public static bool ToBool(this object source, bool defaultValue)
        {
            return Common.Convert.ToBool(source) ?? defaultValue;
        }


        public static Int16? ToInt16(this string source)
        {
            return Common.Convert.ToInt16(source);
        }

        public static Int16 ToInt16(this string source, Int16 defaultValue)
        {
            return Common.Convert.ToInt16(source, defaultValue);
        }

        public static Int32? ToInt32(this string source)
        {
            return Common.Convert.ToInt32(source);
        }

        public static Int32 ToInt32(this string source, Int32 defaultValue)
        {
            return Common.Convert.ToInt32(source, defaultValue);
        }

        public static Int64? ToInt64(this string source)
        {
            return Common.Convert.ToInt64(source);
        }

        public static long? ToLong(this string source)
        {
            return Common.Convert.ToInt64(source);
        }

        public static long ToLong(this object source, long defaultValue)
        {
            return Common.Convert.ToInt64(source, defaultValue);
        }

        public static Int64 ToInt64(this object source, Int64 defaultValue)
        {
            return Common.Convert.ToInt64(source, defaultValue);
        }

        public static double ToDouble(this object source, double defaultValue)
        {
            return Common.Convert.ToDouble(source, defaultValue);
        }

        public static double? ToDouble(this object source)
        {
            return Common.Convert.ToDouble(source);
        }


        public static string ToLowerNull(this string source)
        {
            if (string.IsNullOrWhiteSpace(source)) return source;
            return source.ToLower();
        }

        public static bool EqualsIS(this string source, string value)
        {
            if (source == null) return value == null;
            return source.Equals(value, StringComparison.OrdinalIgnoreCase);
        }

        public static int IndexInList(this string source, params string[] list)
        {
            if (list == null) throw new ArgumentNullException("list");
            if (source == null)
            {
                for (int i = 0; i < list.Length; i++)
                    if (list[i] == null) return i;
                return -1;
            }
            for (int i = 0; i < list.Length; i++)
                if (source.Equals(list[i], StringComparison.OrdinalIgnoreCase))
                    return i;
            return -1;
        }

        public static bool ExistsInList(this string source, params string[] list)
        {
            if (list == null) throw new ArgumentNullException("list");
            if (source == null)
            {
                foreach (string value in list)
                    if (value == null) return true;
                return false;
            }
            foreach (string value in list)
                if (source.Equals(value, StringComparison.OrdinalIgnoreCase))
                    return true;
            return false;
        }

        public static bool ExistsIn(this string source, string[] list)
        {
            if (list == null) throw new ArgumentNullException("list");
            if (source == null)
            {
                foreach (string value in list)
                    if (value == null) return true;
                return false;
            }
            foreach (string value in list)
                if (source.Equals(value, StringComparison.OrdinalIgnoreCase))
                    return true;
            return false;
        }

        public static bool IsAny(this string source, params string[] list)
        {
            return ExistsIn(source, list);
        }

        public static bool ContainsIS(this string source, string value)
        {
            if (string.IsNullOrEmpty(source)) return false;
            return source.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        public static bool IsEmpty(this string source)
        {
            if (string.IsNullOrEmpty(source)) return true;
            foreach (char c in source)
                if (c != ' ' && c != '\r' && c != '\n' && c != '\t')
                    return false;
            return true;
        }


        public static bool eq(this string source, string value)
        {
            return eq(source, value, true);
        }

        public static bool eq(this string source, string value, bool ignoreCase)
        {
            if (source == null && value == null) return true;
            if ((source == null && value != null) || (source != null && value == null)) return false;
            if (source.Length != value.Length) return false;
            for (int i = 0; i < source.Length; ++i)
                if (!eq(source[i], value[i], ignoreCase))
                    return false;
            return true;
        }

        public static bool eq(this char source, char value)
        {
            return eq(source, value, true);
        }

        public static bool eq(this char source, char value, bool ignoreCase)
        {
            if (source == value) return true;
            //ي
            if ((source == 1740 || source == 1610 || source == 1609) && (value == 1740 || value == 1610 || value == 1609))
                return true;
            //ك
            if ((source == 1705 || source == 1603) && (value == 1705 || value == 1603))
                return true;
            //
            if (!ignoreCase) return false;
            return char.ToUpper(source) == char.ToUpper(value);
        }


        public static bool IsWhiteSpace(this string source)
        {
            if (string.IsNullOrEmpty(source)) return true;
            for (int i = 0; i < source.Length; ++i)
            {
                char c = source[i];
                if (c != 0 && c != ' ' && c != '\t' && c != '\r' && c != '\n')
                    return false;
            }
            return true;
        }

        public static string FullTrim(this string source)
        {
            if (string.IsNullOrEmpty(source)) return string.Empty;
            int StartIndex = 0;
            int EndIndex = source.Length - 1;
            while (StartIndex < source.Length)
            {
                if (!char.IsWhiteSpace(source[StartIndex]))
                    break;
                StartIndex += 1;
            }
            while (EndIndex > StartIndex)
            {
                if (!char.IsWhiteSpace(source[EndIndex]))
                    break;
                EndIndex -= 1;
            }
            int n = EndIndex - StartIndex + 1;
            if (n == source.Length) return source;
            if (n <= 0) return string.Empty;
            return source.Substring(StartIndex, n);
        }


        public static string ToAsciiDigits(this string source)
        {
            if (string.IsNullOrEmpty(source)) return source;
            for (int i = 0; i < source.Length; i++)
                if (source[i].IsFarsiDigit())
                {
                    char[] c = source.ToArray();
                    for (; i < c.Length; i++)
                        if (c[i].IsFarsiDigit())
                            c[i] = c[i].ToAsciiDigit();
                    return new string(c);
                }
            return source;
        }

        public static bool IsFarsiDigit(this char source)
        {
            int Zero = 1632;
            if (source >= Zero && source <= Zero + 9) return true;
            //-----------------
            Zero = 1776;
            if (source >= Zero && source <= Zero + 9) return true;
            return false;
        }

        public static char ToAsciiDigit(this char source)
        {
            int Zero = 1632;
            if (source >= Zero && source <= Zero + 9)
                return (char)(source - Zero + '0');
            //-----------------
            Zero = 1776;
            if (source >= Zero && source <= Zero + 9)
                return (char)(source - Zero + '0');
            return source;
        }

        public static char ToStandardChar(this char source)
        {
            if (source < 256) return source;
            if (source == 8204) return ' ';  // Zero-Width Space
            //-----------------
            // convert none break space (&nbsp) to space
            if (source == 160) return (char)32;
            //-----------------
            int Zero = 1632;
            if (source >= Zero && source <= Zero + 9)
                return (char)(source - Zero + '0');
            //-----------------
            Zero = 1776;
            if (source >= Zero && source <= Zero + 9)
                return (char)(source - Zero + '0');
            //-----------------
            //ي : 1610
            if (source == 1740 || source == 1610 || source == 1609) return 'ی';// 'ي';
            //ك: 1603
            if (source == 1705 || source == 1603) return 'ک';// 'ك';
            return source;
        }

        public static string ToStandardString(this string source)
        {
            if (string.IsNullOrEmpty(source)) return source;
            char[] chars = source.ToArray();
            int n = 0;
            for (int i = 0; i < chars.Length; i++)
            {
                var c = chars[i];
                var skip = (c == 'ـ') || (c == '\r' && i + 1 < chars.Length && char.IsWhiteSpace(chars[i + 1]));
                if (!skip)
                {
                    chars[n] = c.ToStandardChar();
                    n++;
                }
            }
            return new string(chars, 0, n);
        }


        public static void ToStandardString(this Dictionary<string, object>[] entities)
        {
            if (entities == null) return;
            foreach (var entity in entities)
                entity.ToStandardString();
        }

        public static void ToStandardString(this Dictionary<string, object> entity)
        {
            if (entity == null) return;
            foreach (var k in entity.Keys.ToArray())
            {
                var v = entity[k] as string;
                if (!string.IsNullOrWhiteSpace(v)) entity[k] = (v as string).ToStandardString();
            }
        }

        public static void ToStandardString(this Dictionary<string, string>[] entities)
        {
            if (entities == null) return;
            foreach (var entity in entities)
                entity.ToStandardString();
        }

        public static void ToStandardString(this Dictionary<string, string> entity)
        {
            if (entity == null) return;
            foreach (var k in entity.Keys.ToArray())
            {
                var v = entity[k];
                if (!string.IsNullOrWhiteSpace(v)) entity[k] = (v as string).ToStandardString();
            }
        }


        public static string Truncate(this string source, int maxLength)
        {
            if (string.IsNullOrEmpty(source) || source.Length <= maxLength)
                return source;
            return source.Substring(0, maxLength);
        }

        public static string IfEmpty(this string source, string emptyValue)
        {
            return string.IsNullOrEmpty(source) ? emptyValue : source;
        }


        public static string EncodeNonAscii(this string value)
        {
            var sb = new StringBuilder();
            foreach (char c in value)
            {
                if (c > 127)
                {
                    string encodedValue = "\\u" + ((int)c).ToString("x4");
                    sb.Append(encodedValue);
                }
                else
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public static string DecodeNonAscii(this string value)
        {
            return Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                });
        }

        public static string JavaScriptStringEncode(this string value)
        {
            return HttpUtility.JavaScriptStringEncode(value);
        }

        public static string JavaScriptStringDecode(this string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return value;
            value = value.Replace(@"\'", "'")
                        .Replace(@"\""", @"""")
                        .Replace(@"\/", "/")
                        .Replace(@"\t", "\t")
                        .Replace(@"\n", "\n");
            var rx = new Regex(@"\\[uU]([0-9A-F]{4})");
            return rx.Replace(value, match => ((char)Int32.Parse(match.Value.Substring(2), NumberStyles.HexNumber))
                                                    .ToString(CultureInfo.InvariantCulture));
            /*
            return Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                });*/
        }


    }
}