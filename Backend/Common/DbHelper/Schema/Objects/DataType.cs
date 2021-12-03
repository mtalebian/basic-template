using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class DataType
    {
        internal enum TypeCategory
        {
            Number,
            String,
            UnicodeString,
            Boolean,
            DateTime,
            Image,
            Unknown
        }

        private int Code;
        public string Name { get; private set; }
        private Type mType;
        private TypeCategory tc;
        public int ID { get { return Code; } }
        public bool IsNumeric { get { return tc == TypeCategory.Number; } }
        public bool IsBoolean { get { return tc == TypeCategory.Boolean; } }
        public bool IsString { get { return tc == TypeCategory.String || IsUnicodeString; } }
        public bool IsUnicodeString { get { return tc == TypeCategory.UnicodeString; } }
        public bool IsDateTime { get { return tc == TypeCategory.DateTime; } }
        public bool IsImage { get { return tc == TypeCategory.Image; } }
        public Type Type { get { return mType; } }


        internal DataType(TypeCategory tc, string Name, int Code, Type type)
        {
            this.tc = tc;
            this.Name = Name;
            this.Code = Code;
            this.mType = type;
            if (DataTypes.FindByName(Name) == null) DataTypes.AvailableTypes.Add(this);
        }


        public object Cast(string Value)
        {
            switch (tc)
            {
                case TypeCategory.Boolean:
                    string lv = Value.ToLower();
                    return lv == "true" || lv == "1" || lv == "yes";
                case TypeCategory.Number:
                    return double.Parse(Value);
                case TypeCategory.DateTime:
                    return DateTime.Parse(Value);
                case TypeCategory.String:
                case TypeCategory.UnicodeString:
                    return Value;
            }
            throw new Exception("Unhandled ENUM type: " + tc.ToString());
        }

        
        public override string ToString()
        {
            return Name;
        }

    }




}