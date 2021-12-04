using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public class DbObjectSchema
    {
        public string Name { get; set; }


        
        public DbObjectSchema(string name)
        {
            this.Name = name;
        }

        public override string ToString()
        {
            return Name;
        }
    }

}