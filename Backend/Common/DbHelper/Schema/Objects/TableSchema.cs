using System.Collections.Generic;
using System.Collections.Specialized;

namespace Common.Data.Schema
{

    public class TableSchema : DbObjectSchema
    {
        internal DataSchema Schema;

        public string Catalog { get; set; }
        public string Owner { get; set; }
        public bool IsView { get; set; }
        public string Description { get; set; }


        private ColumnSchemaCollection _Columns = null;
        public ColumnSchemaCollection Columns
        {
            get
            {
                if (_Columns == null)
                {
                    _Columns = new ColumnSchemaCollection();
                    Schema.Internal_GetColumns(this);
                }
                return _Columns;
            }
        }

        private RelationSchemaCollection _Relations;
        public RelationSchemaCollection Relations
        {
            get
            {
                if (_Relations == null)
                {
                    _Relations = new RelationSchemaCollection();
                    Schema.Internal_GetRelations(this);
                }
                return _Relations;
            }
        }


        private IndexSchemaCollection _Indexes;
        public IndexSchemaCollection Indexes
        {
            get
            {
                if (_Indexes == null) _Indexes = Schema.GetIndexes(this);
                return _Indexes;
            }
        }

        private NameValueCollection _Properties = null;
        public NameValueCollection Properties
        {
            get
            {
                if (_Properties == null) _Properties = new NameValueCollection();
                ColumnSchema.InitializetProperties(_Properties, Description);
                return _Properties;
            }
        }




        public TableSchema(DataSchema Schema, string Catalog, string Owner, string Name, string description, bool IsView)
            : base(Name)
        {
            this.Schema = Schema;
            this.Catalog = Catalog;
            this.Owner = Owner;
            this.Description = description;
            this.IsView = IsView;
        }


        public void RefreshColumns()
        {
            if (_Columns != null) _Columns.Clear();
            _Columns = null;
            _Relations = null;
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(Owner)) return Name;
            return Owner + "." + Name;
        }

        public int PKColumnOrder(ColumnSchema col)
        {
            var pk = new List<string>();
            foreach (var c in Columns)
                if (c.IsPK) pk.Add(c.Name);
            if (pk.Count <= 1) return 0;
            return pk.IndexOf(col.Name) + 1;
        }

        public ColumnSchema[] GetPKs()
        {
            var pk = new List<ColumnSchema>();
            foreach (var c in Columns)
                if (c.IsPK) pk.Add(c);
            return pk.ToArray();
        }


        public string GetProperty(string name, string defaultValue)
        {
            var s = Properties.Get(name);
            return string.IsNullOrEmpty(s) ? defaultValue : s;
        }

    }

}