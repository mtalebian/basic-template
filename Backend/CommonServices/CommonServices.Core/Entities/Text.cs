using System;

namespace CommonServices.Core
{
    public class Text
    {
        private DateTime _CreatedAt = DateTime.Now;

        public string LanguageCode { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public DateTime CreatedAt => _CreatedAt;
    }
}