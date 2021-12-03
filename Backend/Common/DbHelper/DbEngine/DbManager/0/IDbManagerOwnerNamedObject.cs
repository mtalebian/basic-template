using System;
using Common.Data.Schema;
using System.Collections.Generic;

namespace Common.Data
{
    
    public interface IDbManagerOwnerNamedObject<T>: IDbManagerNamedObject<T>
    {
        string Owner { get; }
    }


}