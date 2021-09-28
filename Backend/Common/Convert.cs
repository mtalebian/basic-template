using System;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Text;

namespace Common
{
    public static class Convert
    {

        public static string ToBase64(string text)
        {
            return System.Convert.ToBase64String(Encoding.UTF8.GetBytes(text));
        }

        public static string FromBase64(string text)
        {
            return Encoding.UTF8.GetString(System.Convert.FromBase64String(text));
        }

        public static string ToHex(byte[] value)
        {
            if (value == null) throw new ArgumentNullException("value");
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < value.Length; ++i)
                sb.Append(value[i].ToString("X2", CultureInfo.InvariantCulture));
            return sb.ToString();
        }

        public static byte[] FromHex(string value)
        {
            if (value == null) throw new ArgumentNullException("value");
            int n = value.Length / 2;
            byte[] b = new byte[n];
            for (int i = 0; i < n; ++i)
            {
                int h = HexDigit(value[i + i + 0]);
                int l = HexDigit(value[i + i + 1]);
                b[i] = (byte)((h << 4) | l);
            }
            return b;
        }
        private static int HexDigit(char hexChar)
        {
            if (hexChar >= '0' && hexChar <= '9') return hexChar - '0';
            if (hexChar >= 'A' && hexChar <= 'F') return 10 + (hexChar - 'A');
            if (hexChar >= 'a' && hexChar <= 'f') return 10 + (hexChar - 'a');
            return 0;
        }



        public static Int64 ToInt64(object value, Int64 defaultValue)
        {
            Int64? v = ToInt64(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static Int32 ToInt32(object value, Int32 defaultValue)
        {
            Int32? v = ToInt32(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static Int16 ToInt16(object value, Int16 defaultValue)
        {
            Int16? v = ToInt16(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static DateTime FromLatinDateText(string latinfDateText)
        {
            var usdf = new System.Globalization.CultureInfo("en-US", false).DateTimeFormat;
            return System.Convert.ToDateTime(latinfDateText, usdf);
        }

        public static string ToLatinDateText(DateTime date)
        {
            var ci = new System.Globalization.CultureInfo("en-US", false);
            return date.ToString("yyyy/MM/dd", ci);

        }


        public static byte ToByte(object value, byte defaultValue)
        {
            byte? v = ToByte(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static double ToDouble(object value, double defaultValue)
        {
            double? v = ToDouble(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static bool ToBoolean(object value, bool defaultValue)
        {
            bool? v = ToBool(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static DateTime ToDateTime(object value, DateTime defaultValue)
        {
            DateTime? v = ToDateTime(value);
            return v.HasValue ? v.Value : defaultValue;
        }


        public static Int64? ToInt64(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    Int64 i;
                    if (Int64.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToInt64(value, CultureInfo.InvariantCulture);
            }
            catch
            {
                return null;
            }
        }

        public static string DateToString(DateTime? d1, string format = "yyyy/MM/dd")
        {
            var ci = new CultureInfo("en-US", false);
            return d1 == null ? null : d1.Value.ToString(format, ci);
        }

        public static Int32? ToInt32(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    Int32 i;
                    if (Int32.TryParse(strValue.ToAsciiDigits(), out i)) return i;
                    return null;
                }
                return System.Convert.ToInt32(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static Int16? ToInt16(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    Int16 i;
                    if (Int16.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToInt16(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static byte? ToByte(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    byte i;
                    if (byte.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToByte(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static char? ToChar(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToChar(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static double? ToDouble(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    double i;
                    if (double.TryParse(strValue.FullTrim(), NumberStyles.Any, CultureInfo.InvariantCulture, out i)) return i;
                    return null;
                }
                return System.Convert.ToDouble(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool? ToBool(object value)
        {
            if (value is bool) return (bool)value;
            if (value is bool?) return (bool?)value;
            if (value == null || value is DBNull) return null;
            try
            {
                if (value.IsNumericType())
                {
                    var v = value.ToDouble();
                    if (!v.HasValue) return false;
                    return v.Value != 0;
                }
                var strValue = value as string;
                if (strValue != null)
                {
                    bool i;
                    if (bool.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToBoolean(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool ToBool(object value, bool defaultValue)
        {
            var b = ToBool(value);
            return !b.HasValue ? defaultValue : b.Value;
        }


        public static DateTime? ToDateTime(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    DateTime i;
                    if (DateTime.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToDateTime(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }


        public static string ToString(object value)
        {
            return ToString(value, null);
        }

        public static string ToString(object value, string defaultValue)
        {
            if (value == null || value is DBNull) return defaultValue;
            try
            {
                return value.ToString();
            }
            catch (Exception)
            {
                return defaultValue;
            }
        }

        public static string ColorToWebString(Color color)
        {
            if (color.IsEmpty) return "";
            return ColorTranslator.ToHtml(color); // "#" + color.R.ToString("X2") + color.G.ToString("X2") + color.B.ToString("X2");
        }
        


        public static byte[] ToBytes(Int32 value)
        {
            return BitConverter.GetBytes(value);
        }

        public static byte[] ToBytes(string value)
        {
            return Encoding.UTF8.GetBytes(value);
        }

        public static string ToString(byte[] value)
        {
            return Encoding.UTF8.GetString(value);
        }


        //public static Image ToImage(object imageBytes)
        //{
        //    if (imageBytes is DBNull) return null;
        //    if (imageBytes == null) return null;
        //    byte[] buf = (byte[])imageBytes;
        //    using (var s = new MemoryStream(buf))
        //        return System.Drawing.Image.FromStream(s);
        //}

        public static decimal? ToDecimal(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToDecimal(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static Single? ToSingle(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToSingle(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }




        public static sbyte ToSByte(object value, sbyte defaultValue)
        {
            sbyte? v = ToSByte(value);
            return v.HasValue ? v.Value : defaultValue;
        }

        public static sbyte? ToSByte(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                var strValue = value as string;
                if (strValue != null)
                {
                    sbyte i;
                    if (sbyte.TryParse(strValue, out i)) return i;
                    return null;
                }
                return System.Convert.ToSByte(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static UInt32? ToUInt32(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToUInt32(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static UInt64? ToUInt64(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToUInt64(value, CultureInfo.InvariantCulture);
            }
            catch
            {
                return null;
            }
        }

        public static UInt16? ToUInt16(object value)
        {
            if (value == null || value is DBNull) return null;
            try
            {
                return System.Convert.ToUInt16(value, CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static string ToRtfUnicodeEscapedString(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            var sb = new StringBuilder();
            foreach (var c in value)
            {
                if (c <= 127) sb.Append(c);
                else
                {
                    sb.Append("\\u");
                    sb.Append(Convert.ToUInt32(c));
                    sb.Append('?');
                }
            }
            return sb.ToString();
        }

    }
}
