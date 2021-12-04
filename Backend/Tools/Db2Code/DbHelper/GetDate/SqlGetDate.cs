using System;
using System.Collections.Generic;
using System.Text;
using System.Data.Common;
using System.Data;
using System.Collections;
using System.Data.SqlClient;


namespace Common.Data
{

    public class SqlGetDate : DbGetDate
    {
        private static SqlGetDate _Value = new SqlGetDate();
        public static SqlGetDate Value { get { return _Value; } }


        
        public override string ToString()
        {
            return "getdate()";
        }
    }


}