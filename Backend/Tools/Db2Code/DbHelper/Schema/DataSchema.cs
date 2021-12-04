using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Globalization;

namespace Common.Data.Schema
{

    public class DataSchema
    {
        private const int Def_RowNumber = 0;
        private const int Def_Length = -1;
        private const int Def_Precision = -1;
        private const int Def_Scale = -1;
        private const bool Def_IsNullable = true;


        private DbHelper dbh;
        DataTable mReservedWords;
        private string mServerName = null;
        private string mServerVersion = null;
        private DBMSType mDBMSType;
        private TableSchemaCollection mTables;
        private TableSchemaCollection mViews;
        private ProcedureSchemaCollection mProcedures;
        private ProcedureSchemaCollection mFunctions;


        public string ServerName { get { if (mServerName == null) GetDataSourceInformation(); return mServerName; } }
        public string ServerVersion { get { if (mServerVersion == null) GetDataSourceInformation(); return mServerVersion; } }

        public TableSchemaCollection Tables
        {
            get
            {
                if (mTables == null) mTables = GetTables();
                return mTables;
            }
        }
        public TableSchemaCollection Views
        {
            get
            {
                if (mViews == null) mViews = GetViews();
                return mViews;
            }
        }
        public ProcedureSchemaCollection Procedures
        {
            get
            {
                if (mProcedures == null) mProcedures = GetProcedures();
                return mProcedures;
            }
        }
        public ProcedureSchemaCollection Functions
        {
            get
            {
                if (mFunctions == null) mFunctions = GetFunctions();
                return mFunctions;
            }
        }


        public DBMSType DBMSType { get { if (mServerName == null) GetDataSourceInformation(); return mDBMSType; } }



        public DataSchema(DbHelper dbh)
        {
            this.dbh = dbh;
        }


        private void GetDataSourceInformation()
        {
            bool wasOpen = dbh.State == ConnectionState.Open;
            DataTable tb = dbh.GetSchema("DataSourceInformation");
            mServerName = (string)tb.Rows[0]["DataSourceProductName"];
            mServerVersion = (string)tb.Rows[0]["DataSourceProductVersion"];
            if (!wasOpen) dbh.Close();
            //-------------------
            mDBMSType = DBMSType.Unknown;
            if (string.Equals(ServerName, "microsoft sql server", StringComparison.OrdinalIgnoreCase))
                mDBMSType = DBMSType.SqlServer;
            else if (string.Equals(ServerName, "oracle", StringComparison.OrdinalIgnoreCase))
                mDBMSType = DBMSType.Oracle;
            else if (string.Equals(ServerName, "ms jet", StringComparison.OrdinalIgnoreCase))
                mDBMSType = DBMSType.Access;
            else if (string.Equals(ServerName, "SQLite", StringComparison.OrdinalIgnoreCase))
                mDBMSType = DBMSType.SQLite;
            else if (string.Equals(ServerName, "Microsoft® SQL Server® Compact", StringComparison.OrdinalIgnoreCase))
                mDBMSType = DBMSType.SqlServerCe;
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        public string[] GetDatabases()
        {
            string[] lst = new string[] { };
            try
            {
                DataTable tb = dbh.GetSchema("Databases");
                lst = new string[tb.Rows.Count];
                for (int i = 0; i < tb.Rows.Count; ++i)
                    lst[i] = tb.Rows[i]["database_name"].ToString();
            }
            catch
            {
                try
                {
                    DataTable tb = dbh.GetSchema("Catalogs");
                    lst = new string[tb.Rows.Count];
                    for (int i = 0; i < tb.Rows.Count; ++i)
                        lst[i] = tb.Rows[i]["catalog_name"].ToString();
                }
                catch
                {
                }
            }
            return lst;
        }


        #region "Handle Appropriate Field in Schema DataTable"


        private static string _GetFieldName_TableCatalog(DataTable tb)
        {
            if (tb.Columns.Contains("TABLE_CATALOG")) return "TABLE_CATALOG";
            if (tb.Columns.Contains("TABLE_CAT")) return "TABLE_CAT";
            if (tb.Columns.Contains("CATALOG")) return "CATALOG";
            if (tb.Columns.Contains("ROUTINE_CATALOG")) return "ROUTINE_CATALOG";
            return "";
        }
        private static string _GetFieldName_TableOwner(DataTable tb)
        {
            if (tb.Columns.Contains("TABLE_SCHEMA")) return "TABLE_SCHEMA";
            if (tb.Columns.Contains("TABLE_SCHEM")) return "TABLE_SCHEM";
            if (tb.Columns.Contains("TABLE_OWNER")) return "TABLE_OWNER";
            if (tb.Columns.Contains("OWNER")) return "OWNER";
            if (tb.Columns.Contains("ROUTINE_SCHEMA")) return "ROUTINE_SCHEMA";
            if (tb.Columns.Contains("ROUTINE_SCHEM")) return "ROUTINE_SCHEM";
            return "";
        }
        private static string _GetFieldName_TableName(DataTable tb)
        {
            if (tb.Columns.Contains("Table_Name")) return "Table_Name";
            return "";
        }
        private static string _GetFieldName_TableType(DataTable tb)
        {
            if (tb.Columns.Contains("TABLE_TYPE")) return "TABLE_TYPE";
            if (tb.Columns.Contains("TABLE_TYP")) return "TABLE_TYP";
            if (tb.Columns.Contains("TYPE")) return "TYPE";
            if (tb.Columns.Contains("ROUTINE_TYPE")) return "ROUTINE_TYPE";
            if (tb.Columns.Contains("ROUTINE_TYP")) return "ROUTINE_TYP";
            return "";
        }

        private static string _GetFieldName_ViewCatalog(DataTable tb)
        {
            if (tb.Columns.Contains("VIEW_CATALOG")) return "VIEW_CATALOG";
            if (tb.Columns.Contains("VIEW_CAT")) return "VIEW_CAT";
            if (tb.Columns.Contains("CATALOG")) return "CATALOG";
            return _GetFieldName_TableCatalog(tb);
        }
        private static string _GetFieldName_ViewOwner(DataTable tb)
        {
            if (tb.Columns.Contains("VIEW_SCHEMA")) return "VIEW_SCHEMA";
            if (tb.Columns.Contains("VIEW_SCHEM")) return "VIEW_SCHEM";
            if (tb.Columns.Contains("VIEW_OWNER")) return "VIEW_OWNER";
            if (tb.Columns.Contains("OWNER")) return "OWNER";
            return _GetFieldName_TableOwner(tb);
        }
        private static string _GetFieldName_ViewName(DataTable tb)
        {
            if (tb.Columns.Contains("VIEW_NAME")) return "VIEW_NAME";
            return _GetFieldName_TableName(tb);
        }
        private static string _GetFieldName_ViewType(DataTable tb)
        {
            if (tb.Columns.Contains("VIEW_TYPE")) return "VIEW_TYPE";
            if (tb.Columns.Contains("VIEW_TYP")) return "VIEW_TYP";
            if (tb.Columns.Contains("TYPE")) return "TYPE";
            return _GetFieldName_TableType(tb);
        }

        private static string _GetFieldName_ColumnRow(DataTable tb)
        {
            if (tb.Columns.Contains("ORDINAL_POSITION")) return "ORDINAL_POSITION";
            if (tb.Columns.Contains("Id")) return "Id";
            return "";
        }
        private static string _GetFieldName_ColumnName(DataTable tb)
        {
            if (tb.Columns.Contains("COLUMN_NAME")) return "COLUMN_NAME";
            return "";
        }
        private static string _GetFieldName_ParameterName(DataTable tb)
        {
            if (tb.Columns.Contains("PARAMETER_NAME")) return "PARAMETER_NAME";
            if (tb.Columns.Contains("COLUMN_NAME")) return "COLUMN_NAME";
            return "";
        }
        private static string _GetFieldName_ColumnDataType(DataTable tb)
        {
            if (tb.Columns.Contains("TYPE_NAME")) return "TYPE_NAME";
            if (tb.Columns.Contains("DATA_TYPE")) return "DATA_TYPE";
            if (tb.Columns.Contains("DATATYPE")) return "DATATYPE";
            return "";
        }
        private static string _GetFieldName_ColumnLength(DataTable tb)
        {
            if (tb.Columns.Contains("COLUMN_SIZE")) return "COLUMN_SIZE";
            if (tb.Columns.Contains("CHARACTER_MAXIMUM_LENGTH")) return "CHARACTER_MAXIMUM_LENGTH";
            if (tb.Columns.Contains("LENGTH")) return "LENGTH";
            return "";
        }
        private static string _GetFieldName_KeyType(DataTable tb)
        {
            if (tb.Columns.Contains("KEY_TYPE")) return "KEY_TYPE";
            return "";
        }

        private static string _GetFieldName_ColumnPrecision(DataTable tb)
        {
            if (tb.Columns.Contains("NUMERIC_PRECISION")) return "NUMERIC_PRECISION";
            if (tb.Columns.Contains("PRECISION")) return "PRECISION";
            return "";
        }
        private static string _GetFieldName_ColumnScale(DataTable tb)
        {
            if (tb.Columns.Contains("NUMERIC_SCALE")) return "NUMERIC_SCALE";
            if (tb.Columns.Contains("SCALE")) return "SCALE";
            if (tb.Columns.Contains("DECIMAL_DIGITS")) return "DECIMAL_DIGITS";
            return "";
        }
        private static string _GetFieldName_ParameterMode(DataTable tb)
        {
            if (tb.Columns.Contains("PARAMETER_MODE")) return "PARAMETER_MODE";
            if (tb.Columns.Contains("COLUMN_TYPE")) return "COLUMN_TYPE";
            return "";
        }
        private static string _GetFieldName_IsNullable(DataTable tb)
        {
            if (tb.Columns.Contains("IS_NULLABLE")) return "IS_NULLABLE";
            if (tb.Columns.Contains("NULLABLE")) return "NULLABLE";
            return "";
        }
        private static string _GetFieldName_ColumnDefault(DataTable tb)
        {
            if (tb.Columns.Contains("COLUMN_DEFAULT")) return "COLUMN_DEFAULT";
            if (tb.Columns.Contains("COLUMN_DEF")) return "COLUMN_DEF";
            return "";
        }

        private static string _GetFieldName_ProcedureName(DataTable tb)
        {
            if (tb.Columns.Contains("ROUTINE_NAME")) return "ROUTINE_NAME";
            if (tb.Columns.Contains("OBJECT_NAME")) return "OBJECT_NAME";
            return "";
        }

        private static string _GetValue(DataTable tb, int RowIndex, string FieldName)
        {
            if (string.IsNullOrEmpty(FieldName)) return "";
            if (!tb.Columns.Contains(FieldName)) return "";
            object v = tb.Rows[RowIndex][FieldName];
            if (v == null) return "";
            string s = v.ToString();
            return s == null ? "" : s.Trim();
        }
        private static int _GetIntValue(DataTable tb, int RowIndex, string FieldName, int DefaultValue)
        {
            if (string.IsNullOrEmpty(FieldName)) return DefaultValue;
            if (!tb.Columns.Contains(FieldName)) return DefaultValue;
            if (tb.Rows[RowIndex].IsNull(FieldName)) return DefaultValue;
            object v = tb.Rows[RowIndex][FieldName];
            if (v == null) return DefaultValue;
            return int.Parse(v.ToString()); ;
        }
        private static bool _GetBoolValue(DataTable tb, int RowIndex, string FieldName, bool DefaultValue)
        {
            if (string.IsNullOrEmpty(FieldName)) return DefaultValue;
            if (!tb.Columns.Contains(FieldName)) return DefaultValue;
            object v = tb.Rows[RowIndex][FieldName];
            if (v == null) return DefaultValue;
            string s = v.ToString().ToLower();
            if (s == "n" || s == "f" || s == "no" || s == "false" || s == "0")
                return false;
            if (s == "y" || s == "t" || s == "yes" || s == "true" || s == "1")
                return true;
            return DefaultValue;
        }

        #endregion


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        public bool IsKeyword(string name)
        {
            if (mReservedWords == null)
                try
                {
                    mReservedWords = dbh.GetSchema("ReservedWords");
                }
                catch
                {
                }
            if (mReservedWords == null) return false;
            foreach (DataRow r in mReservedWords.Rows)
                if (string.Equals(r[0].ToString(), name, StringComparison.OrdinalIgnoreCase))
                    return true;
            return false;
        }

        public virtual string ApplyNamingRules(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            if (IsKeyword(name) || !IsValidObjectName(name))
            {
                if (DBMSType == DBMSType.Oracle) return "\"" + name + "\"";
                if (DBMSType == DBMSType.SqlServer) return "[" + name + "]";
            }
            return name;
        }

        private static bool IsValidObjectName(string name)
        {
            if (!char.IsLetter(name[0]) && name[0] != '_') return false;
            foreach (char c in name)
                if (!char.IsLetterOrDigit(c) && c != '_')
                    return false;
            return true;
        }



        protected virtual bool IsUserObject(string tbCatalog, string tbOwner, string tbName, string type)
        {
            if (DBMSType == DBMSType.SqlServer)
            {
                string SysObjects = "dtproperties/sysdiagrams/sysconstraints/syssegments/dt_addtosourcecontrol/dt_addtosourcecontrol_u/dt_adduserobject/dt_adduserobject_vcs/dt_checkinobject/dt_checkinobject_u/dt_checkoutobject/dt_checkoutobject_u/dt_displayoaerror/dt_displayoaerror_u/dt_droppropertiesbyid/dt_dropuserobjectbyid/dt_generateansiname/dt_getobjwithprop/dt_getobjwithprop_u/dt_getpropertiesbyid/dt_getpropertiesbyid_u/dt_getpropertiesbyid_vcs/dt_getpropertiesbyid_vcs_u/dt_isundersourcecontrol/dt_isundersourcecontrol_u/dt_removefromsourcecontrol/dt_setpropertybyid/dt_setpropertybyid_u/dt_validateloginparams/dt_validateloginparams_u/dt_vcsenabled/dt_verstamp006/dt_verstamp007/dt_whocheckedout/dt_whocheckedout_u";
                if (SysObjects.IndexOf("/" + tbName + "/", StringComparison.OrdinalIgnoreCase) >= 0) return false;
            }
            type = type.ToLower();
            return type == "base table" || type == "table" || type == "user" || string.IsNullOrEmpty(type) ||
                   type == "base view" || type == "view" || type == "procedure" || type == "function";
        }


        private void GetSQLRelations(TableSchema table)
        {
            using (DataTable tb = new DataTable())
            {
                dbh.Fill(tb, "exec SP_FKeys '" + table.Name + "', '" + table.Owner + "'", CommandType.Text);
                dbh.Close();
                for (int i = 0; i < tb.Rows.Count; ++i)
                {
                    string FKName = (string)tb.Rows[i]["FK_Name"];
                    string FKTable_Owner = (string)tb.Rows[i]["FKTABLE_OWNER"];
                    string FKTable_Name = (string)tb.Rows[i]["FKTABLE_Name"];
                    TableSchema FKTable = Tables.Find(FKTable_Owner, FKTable_Name);
                    if (FKTable != null)
                    {
                        RelationSchema rs = table.Relations.Find(FKName);
                        if (rs == null)
                        {
                            rs = new RelationSchema(FKName, table, FKTable);
                            table.Relations.Add(rs);
                        }
                        string PKCOLUMN_Name = (string)tb.Rows[i]["PKCOLUMN_Name"];
                        string FKCOLUMN_Name = (string)tb.Rows[i]["FKCOLUMN_Name"];
                        ColumnSchema PKCOLUMN = table.Columns.Find(PKCOLUMN_Name);
                        ColumnSchema FKCOLUMN = FKTable.Columns.Find(FKCOLUMN_Name);
                        if (PKCOLUMN != null && FKCOLUMN != null)
                            rs.Conditions.Add(new RelationField(table, PKCOLUMN, FKTable, FKCOLUMN));
                    }
                }
            }
        }


        protected virtual void GetRelations(TableSchema tableSchema)
        {
            if (DBMSType == DBMSType.SqlServer) GetSQLRelations(tableSchema);
        }

        internal IndexSchemaCollection GetIndexes(TableSchema tableSchema)
        {
            var indexes = new IndexSchemaCollection();
            var tb = dbh.GetSchema("Indexes", new string[] { tableSchema.Catalog, tableSchema.Owner, tableSchema.Name, null });
            //------------
            string SColumnName = _GetFieldName_ColumnName(tb);
            string SKeyType = _GetFieldName_KeyType(tb);
            //------------
            for (int i = 0; i < tb.Rows.Count; ++i)
            {
                var name = _GetValue(tb, i, "INDEX_NAME");
                var constraintName = _GetValue(tb, i, "CONSTRAINT_NAME");
                var typeDesc = _GetValue(tb, i, "TYPE_DESC");
                indexes.Add(new IndexSchema(tableSchema, name, constraintName, typeDesc));
            }
            return indexes;
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        protected virtual TableSchemaCollection GetTables()
        {
            TableSchemaCollection lst = new TableSchemaCollection();
            try
            {
                DataTable tb = dbh.GetSchema("Tables");
                //------------
                string STableCatalog = _GetFieldName_TableCatalog(tb);
                string STableOwner = _GetFieldName_TableOwner(tb);
                string STableName = _GetFieldName_TableName(tb);
                string STableType = _GetFieldName_TableType(tb);
                //------------
                for (int i = 0; i < tb.Rows.Count; ++i)
                {
                    string tbCatalog = _GetValue(tb, i, STableCatalog);
                    string tbOwner = _GetValue(tb, i, STableOwner);
                    string tbName = _GetValue(tb, i, STableName);
                    string tbType = _GetValue(tb, i, STableType).ToLower();
                    string tbDescription = Get_Table_Description(tbOwner, tbName);
                    bool IsTable = tbType == "base table" || tbType == "table" || tbType == "user" || string.IsNullOrEmpty(tbType);
                    if (IsTable && IsUserObject(tbCatalog, tbOwner, tbName, tbType))
                        lst.Add(new TableSchema(this, tbCatalog, tbOwner, tbName, tbDescription, false));
                }
                lst.Sort();
            }
            catch
            {
            }
            return lst;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        private string Get_Table_Description(string tbOwner, string tbName)
        {
            if (DBMSType == Schema.DBMSType.SqlServer)
                try
                {
                    string sqlExtProp = "select value from ::fn_listextendedproperty ('MS_Description', 'schema',  '" + tbOwner + "', 'table', '" + tbName + "', null, null)";
                    object v = dbh.ExecuteScalar(sqlExtProp, CommandType.Text);
                    return Common.Convert.ToString(v, "");
                }
                catch
                {
                }
            return "";
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        protected virtual TableSchemaCollection GetViews()
        {
            TableSchemaCollection lst = new TableSchemaCollection();
            DataTable tb;
            //---------------------------------------
            try
            {
                tb = dbh.GetSchema("Views");
                //------------
                string SCatalog = _GetFieldName_ViewCatalog(tb);
                string SOwner = _GetFieldName_ViewOwner(tb);
                string SName = _GetFieldName_ViewName(tb);
                string SType = _GetFieldName_ViewType(tb);
                //------------
                for (int i = 0; i < tb.Rows.Count; ++i)
                {
                    string tbCatalog = _GetValue(tb, i, SCatalog);
                    string tbOwner = _GetValue(tb, i, SOwner);
                    string tbName = _GetValue(tb, i, SName);
                    string tbType = _GetValue(tb, i, SType);
                    if (IsUserObject(tbCatalog, tbOwner, tbName, tbType))
                        lst.Add(new TableSchema(this, tbCatalog, tbOwner, tbName, "", true));
                }
                lst.Sort();
                return lst;
            }
            catch
            {
            }
            ////---------------------------------------
            //try
            //{
            //    tb = dbh.GetSchema("Tables");
            //    //------------
            //    string SCatalog = _GetFieldName_TableCatalog(tb);
            //    string SOwner = _GetFieldName_TableOwner(tb);
            //    string SName = _GetFieldName_TableName(tb);
            //    string SType = _GetFieldName_TableType(tb);
            //    //------------
            //    for (int i = 0; i < tb.Rows.Count; ++i)
            //    {
            //        string tbCatalog = _GetValue(tb, i, SCatalog);
            //        string tbOwner = _GetValue(tb, i, SOwner);
            //        string tbName = _GetValue(tb, i, SName);
            //        string tbType = _GetValue(tb, i, SType);
            //        if (tbType != "" && IsUserObject(tbCatalog, tbOwner, tbName, tbType))
            //            lst.Add(new TableSchema(Schema, tbCatalog, tbOwner, tbName, true));
            //    }
            //}
            //catch
            //{
            //}
            return lst;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        protected virtual ProcedureSchemaCollection GetProcedures()
        {
            ProcedureSchemaCollection lst = new ProcedureSchemaCollection();
            try
            {
                DataTable tb = dbh.GetSchema("Procedures");
                //------------
                string SCatalog = _GetFieldName_TableCatalog(tb);
                string SProcedureOwner = _GetFieldName_TableOwner(tb);
                string SProcedureName = _GetFieldName_ProcedureName(tb);
                string SProcedureType = _GetFieldName_TableType(tb);
                //------------
                for (int i = 0; i < tb.Rows.Count; ++i)
                {
                    string spCatalog = _GetValue(tb, i, SCatalog);
                    string spName = _GetValue(tb, i, SProcedureName);
                    string spOwner = _GetValue(tb, i, SProcedureOwner);
                    string spType = _GetValue(tb, i, SProcedureType);
                    if (spType.eq("procedure") && IsUserObject(spCatalog, spOwner, spName, spType))
                        lst.Add(new ProcedureSchema(this, spCatalog, spOwner, spName, false));
                }
            }
            catch
            {
            }
            return lst;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        protected virtual ProcedureSchemaCollection GetFunctions()
        {
            ProcedureSchemaCollection lst = new ProcedureSchemaCollection();
            try
            {
                DataTable tb = dbh.GetSchema("Procedures");
                //------------
                string SCatalog = _GetFieldName_TableCatalog(tb);
                string SProcedureOwner = _GetFieldName_TableOwner(tb);
                string SProcedureName = _GetFieldName_ProcedureName(tb);
                string SProcedureType = _GetFieldName_TableType(tb);
                //------------
                for (int i = 0; i < tb.Rows.Count; ++i)
                {
                    string spCatalog = _GetValue(tb, i, SCatalog);
                    string spName = _GetValue(tb, i, SProcedureName);
                    string spOwner = _GetValue(tb, i, SProcedureOwner);
                    string spType = _GetValue(tb, i, SProcedureType);
                    if (spType.eq("function") && IsUserObject(spCatalog, spOwner, spName, spType))
                        lst.Add(new ProcedureSchema(this, spCatalog, spOwner, spName, true));
                }
            }
            catch
            {
            }
            return lst;
        }



        protected virtual void GetColumns(TableSchema tableSchema)
        {
            string owner = string.IsNullOrEmpty(tableSchema.Owner) ? null : tableSchema.Owner;
            DataTable tb;
            if (DBMSType == DBMSType.SqlServer)
                tb = dbh.GetSchema("Columns", new string[] { null, owner, tableSchema.Name, null });
            else
                tb = dbh.GetSchema("Columns", new string[] { null, owner, tableSchema.Name, null });
            //------------
            string SColumnRow = _GetFieldName_ColumnRow(tb);
            string SColumnName = _GetFieldName_ColumnName(tb);
            string SDataType = _GetFieldName_ColumnDataType(tb);
            string SLength = _GetFieldName_ColumnLength(tb);
            string SPrecision = _GetFieldName_ColumnPrecision(tb);
            string SScale = _GetFieldName_ColumnScale(tb);
            string SIsNullable = _GetFieldName_IsNullable(tb);
            string SDefault = _GetFieldName_ColumnDefault(tb);
            //------------
            List<ColumnSchema> lst = new List<ColumnSchema>();
            for (int i = 0; i < tb.Rows.Count; ++i)
            {
                int Row = _GetIntValue(tb, i, SColumnRow, 0);
                string Name = _GetValue(tb, i, SColumnName);
                string DataType = _GetValue(tb, i, SDataType);
                int Length = _GetIntValue(tb, i, SLength, Def_Length);
                int Precision = _GetIntValue(tb, i, SPrecision, Def_Precision);
                int Scale = _GetIntValue(tb, i, SScale, Def_Scale);
                bool IsNullable = _GetBoolValue(tb, i, SIsNullable, Def_IsNullable);
                string DefaultValue = _GetValue(tb, i, SDefault);
                lst.Add(new ColumnSchema(Row, Name, DataType, Length, Precision, Scale, IsNullable, DefaultValue));
            }
            //------------
            while (lst.Count > 0)
            {
                ColumnSchema cs = lst[0];
                for (int i = 1; i < lst.Count; ++i)
                    if (lst[i].RowNumber < cs.RowNumber)
                        cs = lst[i];
                lst.Remove(cs);
                tableSchema.Columns.Add(cs);
            }
            //------------
            using (tb = new DataTable())
            {
                string owner_dot = owner == null ? "" : owner + ".";
                dbh.FillSchema(tb, "SELECT * FROM " + owner_dot + ApplyNamingRules(tableSchema.Name), CommandType.Text);
                foreach (DataColumn col in tb.PrimaryKey)
                    tableSchema.Columns[col.ColumnName].IsPK = true;
                foreach (DataColumn col in tb.Columns)
                {
                    ColumnSchema cs = tableSchema.Columns[col.ColumnName];
                    cs.IsAutoIncrement = col.AutoIncrement;
                    if (string.IsNullOrEmpty(SIsNullable)) cs.IsNullable = col.AllowDBNull;
                    if (cs.Length == -1) cs.Length = col.MaxLength;
                    if (cs.TypeSchema.InternalType == null)
                        cs.TypeSchema.Name = col.DataType.Name;
                }
            }
            //------------
            if (DBMSType == DBMSType.SqlServer)
                using (tb = new DataTable())
                {
                    string sqlExtProp = "select * from ::fn_listextendedproperty ('MS_Description', 'schema',  '" + tableSchema.Owner + "', 'table', '" + tableSchema.Name + "', 'column', null)";
                    dbh.Fill(tb, sqlExtProp, CommandType.Text);
                    foreach (DataRow r in tb.Rows)
                    {
                        string columnName = r["objname"] as string;
                        string desc = r["value"] as string;
                        tableSchema.Columns[columnName].Description = desc;
                    }
                }
        }

        internal IndexColumnSchemaCollection GetIndexColumns(TableSchema tableSchema, string constraintName)
        {
            var cols = new IndexColumnSchemaCollection();
            var tb = dbh.GetSchema("IndexColumns", new string[] { tableSchema.Catalog, tableSchema.Owner, tableSchema.Name, constraintName });
            //------------
            string SColumnRow = _GetFieldName_ColumnRow(tb);
            string SColumnName = _GetFieldName_ColumnName(tb);
            string SKeyType = _GetFieldName_KeyType(tb);
            //------------
            for (int i = 0; i < tb.Rows.Count; ++i)
            {
                var Name = _GetValue(tb, i, SColumnName);
                var Row = _GetIntValue(tb, i, SColumnRow, 0);
                var keyType = _GetIntValue(tb, i, SKeyType, Def_Precision);
                cols.Add(new IndexColumnSchema(Name, keyType, Row));
            }
            cols.Sort(comparison);
            return cols;
        }


        private int comparison(IndexColumnSchema x, IndexColumnSchema y)
        {
            return x.OrdinalPosition - y.OrdinalPosition;
        }



        protected virtual void GetSPColumns(ProcedureSchema sp)
        {
            using (DataTable tb = new DataTable())
            {
                string owner_dot = string.IsNullOrEmpty(sp.Owner) ? "" : sp.Owner + ".";
                string s = "exec " + owner_dot + ApplyNamingRules(sp.Name);
                if (sp.Parameters.Count > 0)
                {
                    for (int i = 0; i < sp.Parameters.Count; ++i)
                        if (i > 0) s += ",0";
                        else s += " 0";
                }
                dbh.FillSchema(tb, s, CommandType.Text);
                foreach (DataColumn col in tb.Columns)
                {
                    string DefaultValue = col.DefaultValue == null ? "" : col.DefaultValue.ToString();
                    ColumnSchema cs = new ColumnSchema(col.Ordinal, col.ColumnName, col.DataType.Name, col.MaxLength, 0, 0, col.AllowDBNull, DefaultValue);
                    sp.Columns.Add(cs);
                }
            }
        }

        protected virtual void GetSPParams(ProcedureSchema sp)
        {
            string owner = string.IsNullOrEmpty(sp.Owner) ? null : sp.Owner;
            string[] rv = new string[] { null, owner, sp.Name, null };
            DataTable tb = dbh.GetSchema("ProcedureParameters", rv);
            //------------
            string SColumnRow = _GetFieldName_ColumnRow(tb);
            string SColumnName = _GetFieldName_ParameterName(tb);
            string SDataType = _GetFieldName_ColumnDataType(tb);
            string SLength = _GetFieldName_ColumnLength(tb);
            string SPrecision = _GetFieldName_ColumnPrecision(tb);
            string SScale = _GetFieldName_ColumnScale(tb);
            string SIsNullable = _GetFieldName_IsNullable(tb);
            string SDefault = _GetFieldName_ColumnDefault(tb);
            string SParameterMode = _GetFieldName_ParameterMode(tb);
            //------------
            List<ParameterSchema> lst = new List<ParameterSchema>();
            for (int i = 0; i < tb.Rows.Count; ++i)
            {
                int Row = _GetIntValue(tb, i, SColumnRow, 0);
                string Name = _GetValue(tb, i, SColumnName);
                string DataType = _GetValue(tb, i, SDataType);
                int Length = _GetIntValue(tb, i, SLength, Def_Length);
                int Precision = _GetIntValue(tb, i, SPrecision, Def_Precision);
                int Scale = _GetIntValue(tb, i, SScale, Def_Scale);
                bool IsNullable = _GetBoolValue(tb, i, SIsNullable, Def_IsNullable);
                string DefaultValue = _GetValue(tb, i, SDefault);
                ParameterMode pMode = _GetParamModeValue(tb, i, SParameterMode);
                lst.Add(new ParameterSchema(sp, Row, Name, DataType, Length, Precision, Scale, IsNullable, DefaultValue, pMode));
            }
            //------------
            while (lst.Count > 0)
            {
                ParameterSchema cs = lst[0];
                for (int i = 1; i < lst.Count; ++i)
                    if (lst[i].RowNumber < cs.RowNumber)
                        cs = lst[i];
                lst.Remove(cs);
                sp.Parameters.Add(cs);
            }
        }

        private static ParameterMode _GetParamModeValue(DataTable tb, int RowIndex, string FieldName)
        {
            if (string.IsNullOrEmpty(FieldName)) return ParameterMode.In;
            if (!tb.Columns.Contains(FieldName)) return ParameterMode.In;
            object v = tb.Rows[RowIndex][FieldName];
            if (v == null) return ParameterMode.In;
            string s = v.ToString().ToLower();
            if (s == "2" || s == "out" || s == "output")
                return ParameterMode.Out;
            return ParameterMode.In;
        }


        internal void Internal_GetColumns(TableSchema tableSchema)
        {
            GetColumns(tableSchema);
        }
        internal void Internal_GetRelations(TableSchema tableSchema)
        {
            GetRelations(tableSchema);
        }
        internal void Internal_GetSPParams(ProcedureSchema sp)
        {
            GetSPParams(sp);
        }
        internal void Internal_GetSPColumns(ProcedureSchema sp)
        {
            GetSPColumns(sp);
        }


        internal string GetTopQuery(int count, string query)
        {
            if (!query.StartsWith("select ")) return query;
            switch (DBMSType)
            {
                case DBMSType.SqlServer:
                case DBMSType.SqlServerCe:
                    return string.Format(CultureInfo.InvariantCulture, "select top {0} {1}", count, query.Substring(7));

                case DBMSType.SQLite:
                    return query + " LIMIT " + count.ToString();

                case DBMSType.Oracle:
                    break;
                case DBMSType.Access:
                    break;
            }
            return query;
        }


        internal Int32 LastIdentityAsInt32()
        {
            switch (DBMSType)
            {
                case DBMSType.SqlServer:
                case DBMSType.SqlServerCe:
                    return dbh.ExecuteScalarAsInt32(new QueryText("SELECT @@IDENTITY"), 0);

                case DBMSType.SQLite:
                    return dbh.ExecuteScalarAsInt32(new QueryText("select last_insert_rowid()"), 0);

                case DBMSType.Oracle:
                    break;
                case DBMSType.Access:
                    break;
            }
            return 0;
        }
    }

}