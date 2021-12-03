using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Collections.ObjectModel;
using System.Collections;

namespace Common.Data
{

    public class QueryParameter
    {
        private string mName;
        private object mValue;
        private bool mOutput;
        
        public string Name { get { return mName; } }
        public object Value { get { return mValue; } set { mValue = value; } }
        public bool Output { get { return mOutput; } }


        public QueryParameter(string name, object value)
        {
            this.mName = name;
            this.mValue = value;
        }
        
        public QueryParameter(string name, object value, bool output)
        {
            this.mName = name;
            this.mValue = value;
            this.mOutput = output;
        }
    }

}