using System;
using System.Data;

namespace Common.Data
{

    public interface IDbManager : IDisposable
    {
        DbManagerDataSchema Schema { get; }

        string DisplayText { get; }
        void GetSchema();
        DataSet GetDataSet(string sql);
    }

}