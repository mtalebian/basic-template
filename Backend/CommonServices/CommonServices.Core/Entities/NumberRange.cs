using System;

namespace CommonServices.Core
{
    public class NumberRange : Common.Data.FullAuditEntity
    {
        public string CompanyId { get; set; }
        public string ObjectClass { get; set; }
        public string Year { get; set; }
        public string Category { get; set; }
        public string FromNumber { get; set; }

        public string ToNumber { get; set; }
        public string CurrentNumber { get; set; }


        public bool IsValid()
        {
            return FromNumber != null && ToNumber != null && FromNumber.Trim().Length == ToNumber.Trim().Length;
        }

        public string GetNextNumber()
        {
            var curr = string.IsNullOrEmpty(CurrentNumber) ? FromNumber : CurrentNumber;
            if (string.Compare(curr, ToNumber, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                return null;
            }

            var list = curr.ToCharArray();
            for (int i = list.Length - 1; i >= 0; i--)
            {
                var c = list[i];
                switch (c)
                {
                    case '9': list[i] = '0'; break;
                    case 'Z': list[i] = 'A'; break;
                    case 'z': list[i] = 'a'; break;
                    default:
                        if ((c >= '0' && c < '9') || (c >= 'A' && c < 'Z') || (c >= 'a' && c < 'z'))
                            list[i] = (char)(c + 1);
                        curr = new string(list);
                        if (string.Compare(curr, ToNumber, StringComparison.OrdinalIgnoreCase) >= 0)
                        {
                            return null;
                        }

                        return curr;
                }
            }
            return null;
        }
    }
}