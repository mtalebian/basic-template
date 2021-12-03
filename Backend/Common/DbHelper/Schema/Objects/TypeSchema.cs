using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{
 
    public class TypeSchema
    {
        public string Name { get; set; }

        public DataType InternalType { get { return TypeMapping.Map(Name); } }

        public bool IsNumeric
        {
            get
            {
                var t = InternalType;
                return t != null && t.IsNumeric;
            }
        }

        public bool IsString
        {
            get
            {
                var t = InternalType;
                return t != null && t.IsString;
            }
        }

        public bool IsDateTime
        {
            get
            {
                var t = InternalType;
                return t != null && t.IsDateTime;
            }
        }

        public bool IsBool
        {
            get
            {
                var t = InternalType;
                return t != null && t.IsBoolean;
            }
        }
        

                
        
        public TypeSchema(string Name)
        {
            this.Name = Name;
        }
    }

}