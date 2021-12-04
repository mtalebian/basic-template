using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;

namespace Common.Data.Schema
{

    internal static class DataTypes
    {
        internal static List<DataType> AvailableTypes = new List<DataType>();

        public static DataType FindByName(string Name)
        {
            foreach (DataType t in AvailableTypes)
                if (t.ToString() == Name) return t;
            return null;
        }

        public static DataType Int = new DataType(DataType.TypeCategory.Number, "Int ", 0, typeof(Int32));
        public static DataType BigInt = new DataType(DataType.TypeCategory.Number, "BigInt", 1, typeof(Int64));
        public static DataType SmallInt = new DataType(DataType.TypeCategory.Number, "SmallInt", 2, typeof(Int16));
        public static DataType Float = new DataType(DataType.TypeCategory.Number, "Float", 3, typeof(double));
        public static DataType Real = new DataType(DataType.TypeCategory.Number, "Real", 4, typeof(double));
        public static DataType Decimal = new DataType(DataType.TypeCategory.Number, "Decimal", 5, typeof(double));
        public static DataType Byte = new DataType(DataType.TypeCategory.Number, "Byte", 6, typeof(byte));
        public static DataType SByte = new DataType(DataType.TypeCategory.Number, "SByte", 7, typeof(sbyte));
        public static DataType Char = new DataType(DataType.TypeCategory.String, "Char", 8, typeof(char));
        public static DataType NChar = new DataType(DataType.TypeCategory.UnicodeString, "NChar", 9, typeof(char));
        public static DataType VarChar = new DataType(DataType.TypeCategory.String, "VarChar", 10, typeof(string));
        public static DataType NVarChar = new DataType(DataType.TypeCategory.UnicodeString, "NVarChar", 11, typeof(string));
        public static DataType Text = new DataType(DataType.TypeCategory.String, "Text", 12, typeof(string));
        public static DataType NText = new DataType(DataType.TypeCategory.UnicodeString, "NText", 13, typeof(string));
        public static DataType Boolean = new DataType(DataType.TypeCategory.Boolean, "Boolean", 14, typeof(bool));
        public static DataType DateTime = new DataType(DataType.TypeCategory.DateTime, "DateTime", 15, typeof(DateTime));
        public static DataType DateTimeOffset = new DataType(DataType.TypeCategory.DateTime, "DateTimeOffset", 16, typeof(DateTimeOffset));
        public static DataType TimeStamp = new DataType(DataType.TypeCategory.Number, "TimeStamp", 17, typeof(byte[]));
        public static DataType Image = new DataType(DataType.TypeCategory.Image, "Image", 18, typeof(Image));
        public static DataType Binary = new DataType(DataType.TypeCategory.Unknown, "Binary", 19, typeof(byte[]));
        public static DataType VarBinary = new DataType(DataType.TypeCategory.Unknown, "VarBinary", 20, typeof(byte[]));
        public static DataType Guid = new DataType(DataType.TypeCategory.Unknown, "Guid", 98, typeof(Guid));
        public static DataType Object = new DataType(DataType.TypeCategory.Unknown, "Object", 99, typeof(object));
    }



}