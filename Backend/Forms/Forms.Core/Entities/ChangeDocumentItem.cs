using System;

namespace Forms.Core
{
    public class ChangeDocumentItem
    {
        public Int64 Serial { get; set; }

        public Int64 HeaderSerial { get; set; }
        public string TableName { get; set; }//30
        public string TableKey { get; set; }//70
        public string FieldName { get; set; }//30
        public string ChangeType{ get; set; } // U, I, S, D


        public string OldValue { get; set; }
        public string NewValue { get; set; }

        //public virtual Group Group { get; set; }
        //public virtual ICollection<GridColumn> Columns { get; set; }
    }
}