using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{

    public class DbManagerIndexColumnSchema : IDbManagerNamedObject<DbManagerIndexColumnSchema>
    {
        public string Name { get; set; }
        public int KeyType { get; set; }
        public int OrdinalPosition { get; set; }



        public DbManagerIndexColumnSchema()
        {
        }

        public DbManagerIndexColumnSchema(IndexColumnSchema ic)
        {
            Name = ic.Name;
            KeyType = ic.KeyType;
            OrdinalPosition = ic.OrdinalPosition;
        }

        public static DbManagerIndexColumnSchema[] Convert(IndexColumnSchemaCollection columns)
        {
            var list = new List<DbManagerIndexColumnSchema>();
            foreach (var ic in columns)
                list.Add(new DbManagerIndexColumnSchema(ic));
            return list.ToArray();
        }

        public string GetChangeScript(DbManagerIndexColumnSchema dest)
        {
            var list = new List<string>();
            if (KeyType != dest.KeyType) list.Add("KEY-TYPE = '" + dest.KeyType + "'");
            if (OrdinalPosition != dest.OrdinalPosition) list.Add("ORDINAL-POSITION = " + dest.OrdinalPosition);
            return list.Count < 1 ? null : "\t" + string.Join(",  ", list);
        }

        public override string ToString()
        {
            return Name;
        }
    }

}