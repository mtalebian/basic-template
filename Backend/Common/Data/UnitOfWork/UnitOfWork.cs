using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        protected virtual DbContext Context { get; }



        public UnitOfWork(DbContext context)
        {
            Context = context;
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return Context.SaveChangesAsync();
        }

        public DataTable GetDataTable(string sql)
        {
            var con_string = Context.Database.GetConnectionString();
            using (var con = new SqlConnection(con_string))
            {
                con.Open();
                var da = new SqlDataAdapter(sql, con);
                var tb = new DataTable();
                da.Fill(tb);
                con.Close();
                return tb;
            }
        }

        public void ExecuteSql(string sql, Dictionary<string, object> parameters)
        {
            var SqlParameters = parameters.Select(x => new SqlParameter(x.Key, x.Value));
            Context.Database.ExecuteSqlRaw(sql, SqlParameters);
        }
    }
}
