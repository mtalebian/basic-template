using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace Common.Data
{
    public class QueryText
    {
        private string mCommandText = "";
        private CommandType mCommandType = CommandType.Text;
        private QueryParameterCollection mParameters = new QueryParameterCollection();

        public virtual string CommandText { get { return mCommandText; } set { mCommandText = value; } }
        public virtual CommandType CommandType { get { return mCommandType; } set { mCommandType = value; } }
        public QueryParameterCollection Parameters { get { return mParameters; } }


        public QueryText(string commandText)
        {
            this.mCommandText = commandText;
        }

        public QueryText(string commandText, CommandType commandType)
        {
            this.mCommandText = commandText;
            this.mCommandType = commandType;
        }

        public override string ToString()
        {
            return CommandText;
        }
    }
}