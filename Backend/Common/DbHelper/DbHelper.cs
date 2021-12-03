using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Text;
using System.Linq;


// System.Data.SqlClient.SqlConnection.ClearPool(new System.Data.SqlClient.SqlConnection(string.Format("Data Source={0};Initial Catalog={1};Integrated Security=SSPI", TestConfig.***, TestConfig.***)));
//A transport-level error has occurred when sending the request to the server. (provider: Named Pipes Provider, error: 0 - An unexpected network error occurred.)"

namespace Common.Data
{

    public sealed class DbHelper
    {
        public static long LastExecuteDuration { get; private set; }

        public bool ThreadSafe { get; set; }
        private DbProviderFactory factory;
        private DbConnection mConnection;
        private DbTransaction mTransaction;
        private DbCommand mCommand;
        private DbDataAdapter mDataAdapter;
        private int mTransactionCounter = 0;
        private string mLastSQL;
        private string _quotePrefix = string.Empty;
        private string _quoteSuffix = string.Empty;

        public string ProviderName { get; private set; }
        public string ConnectionString { get { return mConnection.ConnectionString; } }

        public bool InTransaction { get { return mTransactionCounter != 0; } }
        public ConnectionState State { get { return mConnection.State; } }
        public string LastSQL { get { return mLastSQL; } }

        public string QuotePrefix
        {
            get
            {
                if (string.IsNullOrEmpty(_quotePrefix)) GetQuoteChars();
                return _quotePrefix;
            }
        }

        public string QuoteSuffix
        {
            get
            {
                if (string.IsNullOrEmpty(_quoteSuffix)) GetQuoteChars();
                return _quoteSuffix;
            }
        }

        private Schema.DataSchema _Schema;
        public Schema.DataSchema Schema
        {
            get
            {
                if (_Schema == null) _Schema = new Schema.DataSchema(this);
                return _Schema;
            }
        }





        static DbHelper()
        {
            DbProviderFactories.RegisterFactory("System.Data.SqlClient", System.Data.SqlClient.SqlClientFactory.Instance);
        }


        public DbHelper(string providerName, string connectionString)
        {
            ProviderName = providerName;
            factory = DbProviderFactories.GetFactory(providerName);
            mConnection = factory.CreateConnection();
            mConnection.ConnectionString = connectionString;
            mTransaction = null;
            mCommand = CreateCommand();
            mDataAdapter = factory.CreateDataAdapter();
            mDataAdapter.SelectCommand = CreateCommand();
            mDataAdapter.InsertCommand = CreateCommand();
            mDataAdapter.UpdateCommand = CreateCommand();
            mDataAdapter.DeleteCommand = CreateCommand();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            Close();
            mConnection.Dispose();
            mCommand.Dispose();
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        private void GetQuoteChars()
        {
            var cb = factory.CreateCommandBuilder();
            if (!string.IsNullOrEmpty(cb.QuotePrefix))
            {
                _quoteSuffix = cb.QuoteSuffix;
                _quotePrefix = cb.QuotePrefix;
                return;
            }
            try
            {
                Execute("SELECT '1' as [default]", CommandType.Text);
                _quotePrefix = "[";
                _quoteSuffix = "]";
            }
            catch
            {
                Execute("SELECT '1' as \"default\"", CommandType.Text);
                _quotePrefix = "\"";
                _quoteSuffix = "\"";
            }
        }


        public void Open()
        {
            if (mConnection.State == ConnectionState.Closed)
            {
                mConnection.Open();
                mTransactionCounter = 0;
            }
        }

        public void Close()
        {
            if (mConnection != null && mConnection.State == ConnectionState.Open)
                mConnection.Close();
            mTransactionCounter = 0;
            if (_Schema != null) _Schema = null;
        }

        public void CloseIfNoTransaction()
        {
            if (InTransaction) return;
            Close();
        }

        public DbCommand CreateCommand()
        {
            return CreateCommand("", CommandType.Text);
        }

        public DbCommand CreateCommand(QueryText q)
        {
            DbCommand cmd = factory.CreateCommand();
            InitCommand(cmd, q);
            return cmd;
        }

        public DbCommand CreateCommand(string commandText, CommandType commandType)
        {
            DbCommand cmd = factory.CreateCommand();
            InitCommand(cmd, commandText, commandType);
            return cmd;
        }


        public DbConnection CreateConnection()
        {
            return factory.CreateConnection();
        }

        public DbDataAdapter CreateDataAdapter()
        {
            return factory.CreateDataAdapter();
        }


        public DbParameter CreateParamter()
        {
            return CreateParamter("", ParameterDirection.Input, null);
        }

        public DbParameter CreateParamter(string parameterName, object value)
        {
            return CreateParamter(parameterName, ParameterDirection.Input, value);
        }

        public DbParameter CreateParamter(string parameterName, ParameterDirection direction, object value)
        {
            DbParameter p = factory.CreateParameter();
            p.ParameterName = parameterName;
            p.Direction = direction;
            p.Value = value;
            return p;
        }

        public DbParameter CreateParamter(string parameterName, DbType dbType, ParameterDirection direction, object value)
        {
            DbParameter p = CreateParamter(parameterName, direction, value);
            p.DbType = dbType;
            return p;
        }


        public void BeginTransaction()
        {
            Open();
            mTransactionCounter += 1;
            if (mTransactionCounter == 1)
            {
                mTransaction = mConnection.BeginTransaction(IsolationLevel.ReadCommitted);
            }
        }

        public void BeginTransaction(IsolationLevel isolationLevel)
        {
            Open();
            mTransactionCounter += 1;
            if (mTransactionCounter == 1)
            {
                mTransaction = mConnection.BeginTransaction(isolationLevel);
            }
        }

        public void Commit()
        {
            if (mTransactionCounter == 1)
            {
                mTransaction.Commit();
                mTransaction = null;
            }
            mTransactionCounter -= 1;
        }

        public void Rollback()
        {
            if (mTransactionCounter == 1)
            {
                mTransaction.Rollback();
                mTransaction = null;
            }
            mTransactionCounter -= 1;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities")]
        private void InitCommand(DbCommand cmd, string commandText, CommandType commandType)
        {
            mLastSQL = commandText;
            cmd.Connection = mConnection;
            cmd.Transaction = mTransaction;
            cmd.CommandText = commandText;
            cmd.CommandType = commandType;
            cmd.Parameters.Clear();
            cmd.CommandTimeout = 0;
        }

        private void InitCommand(DbCommand cmd, QueryText query)
        {
            InitCommand(cmd, query.CommandText, query.CommandType);
            foreach (QueryParameter qp in query.Parameters)
            {
                DbParameter p = CreateParamter(qp.Name, qp.Value);
                if (qp.Output) p.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(p);
                if (qp.Value != null) mLastSQL += qp.Value;
            }
        }


        public int Execute(QueryText query)
        {
            InitCommand(mCommand, query);
            Open();
            var res = mCommand.ExecuteNonQuery();
            return res;
        }

        public int Execute(string commandText)
        {
            return Execute(commandText, CommandType.Text);
        }

        public int Execute(string commandText, CommandType commandType)
        {
            InitCommand(mCommand, commandText, commandType);
            Open();
            int res = mCommand.ExecuteNonQuery();
            return res;
        }


        public Int32 ExecuteScalarAsInt32(QueryText query, Int32 defaultValue)
        {
            return Common.Convert.ToInt32(ExecuteScalar(query), defaultValue);
        }

        public object ExecuteScalar(QueryText query)
        {
            InitCommand(mCommand, query);
            Open();
            var res = mCommand.ExecuteScalar();
            return res;
        }

        public object ExecuteScalar(string commandText)
        {
            return ExecuteScalar(commandText, CommandType.Text);
        }

        public object ExecuteScalar(string commandText, CommandType commandType)
        {
            InitCommand(mCommand, commandText, commandType);
            Open();
            object res = mCommand.ExecuteScalar();
            return res;
        }

        public object[] GetScalarList(QueryText q)
        {
            List<object> list = new List<object>();
            using (DbDataReader reader = ExecuteReader(q))
            {
                while (reader.Read())
                    list.Add(reader.GetValue(0));
            }
            return list.ToArray();
        }

        public int[] GetScalarListAsInt(QueryText q, int defaultValue)
        {
            List<int> list = new List<int>();
            foreach (var item in GetScalarList(q))
                list.Add(Common.Convert.ToInt32(item, defaultValue));
            return list.ToArray();
        }

        public string[] GetScalarListAsString(QueryText q)
        {
            List<string> list = new List<string>();
            foreach (var item in GetScalarList(q))
                if (item == null && item is DBNull) list.Add(null);
                else list.Add(item.ToString());
            return list.ToArray();
        }



        public DbDataReader ExecuteReader(QueryText query, out DbCommand cmd)
        {
            cmd = CreateCommand(query);
            Open();
            DbDataReader res = cmd.ExecuteReader();
            return res;
        }

        public DbDataReader ExecuteReader(QueryText query)
        {
            DbCommand cmd;
            return ExecuteReader(query, out cmd);
        }


        public int Fill(DataTable dataTable, string commandText, CommandType commandType)
        {
            QueryText query = new QueryText(commandText, commandType);
            return Fill(dataTable, query);
        }

        public int Fill(DataTable dataTable, QueryText query)
        {
            InitCommand(mDataAdapter.SelectCommand, query);
            Open();
            int n = mDataAdapter.Fill(dataTable);
            //---------------
            foreach (QueryParameter p in query.Parameters)
                if (p.Output)
                    p.Value = mDataAdapter.SelectCommand.Parameters[p.Name].Value;
            return n;
        }

        public int Fill(DataSet dataSet, QueryText query)
        {
            InitCommand(mDataAdapter.SelectCommand, query);
            Open();
            int n = mDataAdapter.Fill(dataSet);
            return n;
        }

        public DataTable GetDataTable(string commandText)
        {
            return GetDataTable(commandText, CommandType.Text);
        }

        public DataTable GetDataTable(string commandText, CommandType commandType)
        {
            QueryText query = new QueryText(commandText, commandType);
            return GetDataTable(query);
        }

        public DataTable GetDataTable(QueryText query)
        {
            DataTable tb = new DataTable();
            try
            {
                tb.Locale = CultureInfo.InvariantCulture;
                Fill(tb, query);
            }
            catch
            {
                tb.Dispose();
                throw;
            }
            return tb;
        }

        public DataSet GetDataSet(QueryText query)
        {
            var ds = new DataSet();
            try
            {
                ds.Locale = CultureInfo.InvariantCulture;
                Fill(ds, query);
            }
            catch
            {
                ds.Dispose();
                throw;
            }
            return ds;
        }


        public int FillPaged(int pageSize, ref int pageIndex, DataTable dataTable, string queryText, string sortField)
        {
            string q = "select count(*) from (" + queryText + ") Temp_TB";
            int totalRecords = Common.Convert.ToInt32(ExecuteScalar(q, CommandType.Text), 0);
            int TotalPages = (totalRecords + pageSize - 1) / pageSize;
            if (pageIndex < 0) pageIndex = 0;
            if (pageIndex >= TotalPages) pageIndex = TotalPages - 1;
            q = @"
select *
from 
(
  select ROW_NUMBER() OVER(ORDER BY {0}) AS rownumber, *
  from ({1}) _internal_query
) _internal_query_by_rowno
where rownumber>={2} and rownumber<{3}";
            int StartRow = pageSize * pageIndex;
            int EndRow = StartRow + pageSize;
            q = string.Format(q, sortField, queryText, StartRow, EndRow);
            Fill(dataTable, q, CommandType.Text);
            return totalRecords;
        }


        public DbDataReader ExecutePagedReader(string queryText, string sortField, ref int pageIndex, int pageSize, out int totalRecords)
        {
            string q = "select count(*) from (" + queryText + ") Temp_TB";
            totalRecords = ExecuteScalarAsInt32(new QueryText(q), 0);
            if (pageSize < 1)
            {
                return ExecuteReader(new QueryText(queryText));
            }
            long TotalPages = ((long)totalRecords + pageSize - 1) / pageSize;
            if (pageIndex < 0) pageIndex = 0;
            if (pageIndex >= TotalPages) pageIndex = (int)TotalPages - 1;
            q = @"
select *
from 
(
  select *, ROW_NUMBER() OVER(ORDER BY {0}) AS rownumber
  from ({1}) _internal_query
) _internal_query_by_rowno
where rownumber>={2} and rownumber<{3}";
            int StartRow = pageSize * pageIndex;
            int EndRow = StartRow + pageSize;
            q = string.Format(q, sortField, queryText, StartRow, EndRow);
            return ExecuteReader(new QueryText(q));
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities")]
        public void FillSchema(DataTable tb, string sql, CommandType commandType)
        {
            Open();
            using (DbDataAdapter da = CreateDataAdapter())
            {
                da.SelectCommand = CreateCommand();
                da.SelectCommand.Connection = mConnection;
                da.SelectCommand.CommandText = sql;
                da.SelectCommand.CommandType = commandType;
                da.SelectCommand.Transaction = mTransaction;
                da.FillSchema(tb, SchemaType.Mapped);
                da.SelectCommand.Dispose();
            }
        }


        public int Update(DataTable dataTable, string tableName, int batchSize)
        {
            var q = new QueryText("select * from " + tableName);
            var cb = factory.CreateCommandBuilder();
            var da = CreateDataAdapter();
            da.SelectCommand = CreateCommand();
            cb.DataAdapter = da;
            InitCommand(da.SelectCommand, q);
            try
            {
                da.InsertCommand = cb.GetInsertCommand();
                da.UpdateCommand = cb.GetUpdateCommand();
                da.DeleteCommand = cb.GetDeleteCommand();
                if (da is SqlDataAdapter)
                {
                    var sda = da as SqlDataAdapter;
                    sda.UpdateBatchSize = batchSize;
                    da.InsertCommand.UpdatedRowSource = UpdateRowSource.None;
                    da.UpdateCommand.UpdatedRowSource = UpdateRowSource.None;
                    da.DeleteCommand.UpdatedRowSource = UpdateRowSource.None;
                }
                mLastSQL = "DataAdapter.Update() - " + mLastSQL;
                Open();
                int res = da.Update(dataTable);
                return res;
            }
            finally
            {
                da.Dispose();
            }
        }

        public DataTable GetSchema()
        {
            Open();
            var res = mConnection.GetSchema();
            return res;
        }
        public DataTable GetSchema(string collectionName)
        {
            Open();
            var res = mConnection.GetSchema(collectionName);
            return res;
        }
        public DataTable GetSchema(string collectionName, string[] restrictionValues)
        {
            Open();
            var res = mConnection.GetSchema(collectionName, restrictionValues);
            return res;
        }


        public static string[] GetAvailableProviders()
        {
            DataTable tb = DbProviderFactories.GetFactoryClasses();
            string[] a = new string[tb.Rows.Count];
            for (int i = 0; i < tb.Rows.Count; ++i)
                a[i] = tb.Rows[i]["InvariantName"].ToString();
            return a;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
        public DateTime GetDate()
        {
            return (DateTime)ExecuteScalar("select getdate()", CommandType.Text);
        }


        private void Write(Stream fs, string text, bool quote)
        {
            if (text == null) return;
            if (quote) text = "\"" + text.Replace("\"", "\"\"") + "\"";
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            fs.Write(bytes, 0, bytes.Length);
        }

        public void ExportToCSV(DataTable tb, string fname, bool append, bool includeColumnHeaders, bool declareSeparatorOnFirstLine, string fieldSeparator)
        {
            using (var fs = new FileStream(fname, append ? FileMode.Append : FileMode.Create))
            {
                fs.Position = fs.Length;
                bool FirstLine = fs.Position == 0;
                if (declareSeparatorOnFirstLine && fs.Position == 0)
                    Write(fs, "sep=" + fieldSeparator, false);
                //-------------------
                if (FirstLine && includeColumnHeaders)
                {
                    if (fs.Position > 0) Write(fs, "\r\n", false);
                    for (int i = 0; i < tb.Columns.Count; i++)
                    {
                        if (i > 0) Write(fs, fieldSeparator, false);
                        Write(fs, tb.Columns[i].ColumnName, true);
                    }
                }
                FirstLine = fs.Position == 0;
                //-------------------
                foreach (DataRow r in tb.Rows)
                    if (r.RowState == DataRowState.Added)
                    {
                        if (FirstLine) FirstLine = false;
                        else Write(fs, "\r\n", false);
                        for (int i = 0; i < tb.Columns.Count; i++)
                        {
                            if (i > 0) Write(fs, fieldSeparator, false);
                            Write(fs, r.IsNull(i) ? null : r[i].ToString(), true);
                        }
                    }
            }
        }


        public object LastIdentityAsInt32()
        {
            return Schema.LastIdentityAsInt32();
        }

        public string GetTopQuery(int count, string query)
        {
            return Schema.GetTopQuery(count, query);
        }

        //public T FirstOrDefault<T>(QueryText q, ORMField[] fields) where T : class, new()
        //{
        //    q = new QueryText(GetTopQuery(1, q.ToString()));
        //    using (var reader = ExecuteReader(q))
        //    {
        //        while (reader.Read())
        //        {
        //            T entity = new T();
        //            for (int i = 0; i < reader.FieldCount; i++)
        //            {
        //                var name = reader.GetName(i);
        //                var f = fields.Where(x => name.Equals(x.Name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
        //                if (f != null) f.SetValue(entity, reader.GetValue(i));
        //            }
        //            return entity;
        //        }
        //    }
        //    return null;
        //}

        //public List<T> Select<T>(QueryText q, ORMField[] fields) where T : class, new()
        //{
        //    List<T> list = new List<T>();
        //    using (var reader = ExecuteReader(q))
        //    {
        //        while (reader.Read())
        //        {
        //            T entity = new T();
        //            for (int i = 0; i < reader.FieldCount; i++)
        //            {
        //                var name = reader.GetName(i);
        //                var f = fields.Where(x => name.Equals(x.Name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
        //                if (f != null) f.SetValue(entity, reader.GetValue(i));
        //            }
        //            list.Add(entity);
        //        }
        //    }
        //    return list;
        //}


        public bool Test()
        {
            try
            {
                Open();
                Close();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}