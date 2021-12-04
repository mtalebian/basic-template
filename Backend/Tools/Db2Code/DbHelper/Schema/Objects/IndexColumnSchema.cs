using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class IndexColumnSchema : DbObjectSchema
    {
        public int KeyType { get; set; }
        public int OrdinalPosition { get; set; }




        public IndexColumnSchema(string Name, int keyType, int ordinalPosition)
            : base(Name)
        {
            this.KeyType = keyType;
            this.OrdinalPosition = ordinalPosition;
        }
        
    }

}