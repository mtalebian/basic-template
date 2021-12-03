using System.Collections.Generic;

namespace CommonServices.Core
{
    public interface INumberRangeService
    {
        IList<NumberRange> GetNumberRange(string objectClass, string category, string year);
        void Insert(NumberRange item);
        NumberRange Update(NumberRange entity);
        void Delete(NumberRange entity);

        string Generate(string objectClass, string category, string year);
    }
}