using System;

namespace Common.Data
{
    public class FullAuditEntity : IHasModifier, IHasCreator
    {
        /*
        private string _CreatedBy = "";
        private DateTime _CreatedAt = DateTime.UtcNow;
        private DateTime _ModifiedAt = DateTime.UtcNow;
        private string _ModifiedBy = "";

        public string CreatedBy => _CreatedBy;
        public DateTime CreatedAt => _CreatedAt;
        public string ModifiedBy => _ModifiedBy;
        public DateTime ModifiedAt => _ModifiedAt;
        */

        [IgnoreDestinationMap]
        public string CreatedBy { get; set; }="";
        
        [IgnoreDestinationMap]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [IgnoreDestinationMap]
        public string ModifiedBy { get; set; } = "";

        [IgnoreDestinationMap]
        public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;

    }
}
