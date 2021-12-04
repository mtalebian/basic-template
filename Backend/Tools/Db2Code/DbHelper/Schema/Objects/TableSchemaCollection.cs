using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Data.Schema
{

    public sealed class TableSchemaCollection : DbObjectSchemaCollection<TableSchema>
    {
        //public TableSchema this[string Owner, string TableName] { get { return (TableSchema)List[IndexOf(Owner, TableName)]; } }

        public TableSchemaCollection()
        {
        }

        /*
        internal int IndexOf(string Owner, string Name)
        {
            Owner = Owner.ToLower();
            Name = Name.ToLower();
            for (int i = 0; i < Count; ++i)
                if (this[i].Owner.ToLower() == Owner && this[i].Name.ToLower() == Name)
                    return i;
            return -1;
        }
        */

        public TableSchema Find(string owner, string name)
        {
            if (string.IsNullOrEmpty(owner)) throw new ArgumentNullException("owner");
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name");
            foreach (var t in this)
                if (owner.Equals(t.Owner, StringComparison.OrdinalIgnoreCase) && name.Equals(t.Name, StringComparison.OrdinalIgnoreCase))
                    return t;
            return null;
        }

    }
}