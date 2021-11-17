using System;

namespace Common.Data
{
    public interface IHasModifier
    {
        string ModifiedBy { get; }
        DateTime ModifiedAt { get; }
    }

}
