using CommonServices.Core;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonServices.Services
{
    internal class NumberRangeService : INumberRangeService
    {
        private static readonly object sync = new object();
        private readonly ICommonServiceUnitOfWork db;


        public NumberRangeService(ICommonServiceUnitOfWork db)
        {
            this.db = db;
        }

        public IList<NumberRange> GetNumberRanges(string companyId, string objectClass, string category, string year)
        {
            return db.NumberRanges.Where(x => x.ObjectClass == objectClass &&
                (!string.IsNullOrEmpty(category) && x.Category == category) &&
                (!string.IsNullOrEmpty(year) && x.Year == year)
            );
        }

        public void Insert(NumberRange item)
        {
            db.NumberRanges.Add(item);
            db.SaveChanges();
        }

        public NumberRange Update(NumberRange entity)
        {
            db.NumberRanges.Update(entity);
            db.SaveChanges();
            return entity;
        }

        public void Delete(NumberRange entity)
        {
            db.NumberRanges.Remove(entity);
            db.SaveChanges();
        }


        public string Generate(string companyId, string objectClass, string category, string year)
        {
            lock (sync)
            {
                var ranges = GetNumberRanges(companyId, objectClass, category, year);
                foreach (var r in ranges)
                {
                    var next = r.GetNextNumber();
                    if (next != null)
                    {
                        r.CurrentNumber = next;
                        db.SaveChanges();
                        return next;
                    }
                }
                throw new Exception($"Number range overflow: {objectClass} / {category} / {year}");
            }
        }

    }
}