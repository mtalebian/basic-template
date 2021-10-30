using System;

namespace Common.Data
{
    public interface IHasCreator
    {
        string CreatedBy { get; }
        DateTime CreatedAt { get; }
    }

}
