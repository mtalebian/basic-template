using System.Collections.Generic;

namespace CommonServices.Core
{
    public interface INumberRangeService
    {
        IList<NumberRange> GetNumberRanges(string companyId, string objectClass, string category, string year);
        void Insert(NumberRange item);
        NumberRange Update(NumberRange entity);
        void Delete(NumberRange entity);

        string Generate(string companyId, string objectClass, string category, string year);
    }
}