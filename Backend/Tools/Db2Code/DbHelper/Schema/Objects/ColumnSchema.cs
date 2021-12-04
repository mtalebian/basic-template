using System;
using System.Collections.Specialized;

namespace Common.Data.Schema
{

    public class ColumnSchema : DbObjectSchema
    {
        //public TableSchema Table;
        public int RowNumber { get; set; }
        public TypeSchema TypeSchema { get; set; }
        public int Length { get; set; }
        public int Precision { get; set; }
        public int Scale { get; set; }
        public bool IsNullable { get; set; }
        public string DefaultValue { get; set; }
        public bool IsAutoIncrement { get; set; }
        public bool IsPK { get; set; }
        public int DataTypeID { get { return TypeSchema.InternalType.ID; } }
        public string Description { get; set; }

        private NameValueCollection _Properties = null;
        public NameValueCollection Properties
        {
            get
            {
                if (_Properties == null)
                {
                    _Properties = new NameValueCollection();
                    InitializetProperties(_Properties, Description);
                }
                return _Properties;
            }
        }



        public ColumnSchema(int RowNumber, string Name, string DataType, int Length, int Precision, int Scale, bool IsNullable, string DefaultValue)
            : base(Name)
        {
            //this.Table = Table;
            this.RowNumber = RowNumber;
            this.TypeSchema = new TypeSchema(DataType);
            this.Length = Length;
            this.Precision = Precision;
            this.Scale = Scale;
            this.IsNullable = IsNullable;
            this.DefaultValue = DefaultValue;
            this.Description = "";
            this.IsPK = false;
        }

        public Type GetColumnType()
        {
            if (TypeSchema == null || TypeSchema.InternalType == null) return typeof(object);
            return TypeSchema.InternalType.Type;
        }

        internal static void InitializetProperties(NameValueCollection properties, string text)
        {
            properties.Clear();
            if (string.IsNullOrEmpty(text)) return;
            var parts = text.Split('\r', '\n', ',');
            foreach (var p in parts)
            {
                var x = p.Split('=');
                if (x.Length == 2) properties.Add(x[0].Trim(), x[1].Trim());
            }
        }

        public override string ToString()
        {
            return Name;
        }


        public string GetDefaultValueString()
        {
            var v = DefaultValue;
            if (string.IsNullOrEmpty(v)) return v;
            if (v.StartsWith("((") && v.EndsWith("))")) v = v.Substring(2, v.Length - 4);
            if (v.StartsWith("(") && v.EndsWith(")")) v = v.Substring(1, v.Length - 2);
            if (v.StartsWith("N'") && v.EndsWith("'")) v = v.Substring(1, v.Length - 1);
            return v;
        }

        public object GetDefaultValue()
        {
            var v = DefaultValue;
            if (string.IsNullOrEmpty(v)) return null;
            if (v.StartsWith("((") && v.EndsWith("))")) v = v.Substring(2, v.Length - 4);
            if (v.StartsWith("(") && v.EndsWith(")")) v = v.Substring(1, v.Length - 2);
            if (v.StartsWith("N'") && v.EndsWith("'")) v = v.Substring(1, v.Length - 1);
            var t = GetColumnType();
            if (t == typeof(bool)) return v == "1";
            else if (t == typeof(int)) return Common.Convert.ToInt32(v);
            else if (v == "getdate()") return DateTime.Now;
            else
            {
                if (v.StartsWith("'") && v.EndsWith("'")) v = v.Substring(1, v.Length - 2);
                return v;
            }
        }

        public string GetProperty(string name, string defaultValue)
        {
            var s = Properties.Get(name);
            return string.IsNullOrEmpty(s) ? defaultValue : s;
        }
    }

}