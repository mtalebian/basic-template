using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{

    public interface IDbManagerNamedObject<T>
    {
        string Name { get; }
    
        string GetChangeScript(T obj2);
    }

}