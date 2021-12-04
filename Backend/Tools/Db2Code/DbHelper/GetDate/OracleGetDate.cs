using System;
using System.Collections.Generic;
using System.Text;
using System.Data.Common;
using System.Data;
using System.Collections;
using System.Data.SqlClient;


namespace Common.Data
{

    public class OracleGetDate : DbGetDate
    {
        private static OracleGetDate _Value = new OracleGetDate();
        public static OracleGetDate Value { get { return _Value; } }

        public override string ToString()
        {
            return GetType().Name;
        }
    }

}