using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public static class TypeMapping
    {

        private static Dictionary<string, DataType> mMapTable = null;
        private static Dictionary<string, DataType> MapTable
        {
            get
            {
                if (mMapTable == null) CreateMapTable();
                return mMapTable;
            }
        }

        public static void CreateMapTable()
        {
            mMapTable = new Dictionary<string, DataType>();
            Add("int", DataTypes.Int);
            Add("BigInt", DataTypes.BigInt);
            Add("smallint", DataTypes.SmallInt);
            Add("Float", DataTypes.Float);
            Add("Real", DataTypes.Real);
            Add("Decimal", DataTypes.Decimal);
            Add("byte", DataTypes.Byte);
            Add("Boolean", DataTypes.Boolean);

            Add("char", DataTypes.Char);
            Add("nchar", DataTypes.NChar);
            Add("varchar", DataTypes.VarChar);
            Add("nvarchar", DataTypes.NVarChar);
            Add("text", DataTypes.Text);
            Add("ntext", DataTypes.NText);
            Add("hierarchyid", DataTypes.VarChar);

            Add("DateTime", DataTypes.DateTime);
            Add("date", DataTypes.DateTime);
            Add("time", DataTypes.DateTime);
            Add("datetime2", DataTypes.DateTime);
            Add("date/time", DataTypes.DateTime);
            Add("smalldatetime", DataTypes.DateTime);
            Add("DateTimeOffset", DataTypes.DateTimeOffset);

            Add("Binary", DataTypes.Binary);
            Add("VarBinary", DataTypes.VarBinary);
            Add("Image", DataTypes.Image);

            Add("TimeStamp", DataTypes.TimeStamp);
            Add("Guid", DataTypes.Guid);
            Add("Object", DataTypes.Object);

            Add("tinyint", DataTypes.SByte);
            Add("short", DataTypes.SmallInt);
            Add("number", DataTypes.Int);
            Add("int16", DataTypes.Int);
            Add("int32", DataTypes.Int);
            Add("int64", DataTypes.BigInt);
            Add("double", DataTypes.Float);
            Add("graphic", DataTypes.Image);
            Add("string", DataTypes.VarChar);
            Add("memo", DataTypes.VarChar);
            Add("varchar2", DataTypes.VarChar);
            Add("nvarchar2", DataTypes.NVarChar);
            Add("bit", DataTypes.Boolean);
            Add("yes/no", DataTypes.Boolean);
            Add("money", DataTypes.Float);
            Add("currency", DataTypes.Float);
            Add("autonumber", DataTypes.Float);
            Add("ole object", DataTypes.Binary);
            Add("numeric", DataTypes.Decimal);
            Add("smallmoney", DataTypes.Decimal);
            Add("sql_variant", DataTypes.Object);
            Add("uniqueidentifier", DataTypes.Guid);

        }

        public static bool Contains(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            return MapTable.ContainsKey(name.ToLower());
        }

        public static void Add(string name, DataType dt)
        {
            if (name == null) throw new ArgumentNullException("name");
            MapTable.Add(name.ToLower(), dt);
        }

        public static DataType Map(string name)
        {
            name = string.IsNullOrEmpty(name) ? name : name.Trim().ToLower();
            if (!Contains(name)) return null;
            return MapTable[name];
        }

    }


}
