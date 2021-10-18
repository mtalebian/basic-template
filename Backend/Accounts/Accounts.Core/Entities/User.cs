using System;
using System.Collections.Generic;

namespace Accounts.Core
{
    public class User
    {
        public long Id { get; set; }

        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string NationalCode { get; set; }
        public string PasswordHash { get; set; }

        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }

        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }

        public int AccessFailedCount { get; set; }
        public DateTime? LastAccessFailedDate { get; set; }
        public DateTime? LockoutEndDate { get; set; }
        public bool LockoutEnabled { get; set; }

        public bool WindowsAuthenticate { get; set; }

        public string ConcurrencyStamp { get; set; }
        public string SecurityStamp { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsDisabled { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime CreatedAt { get; set; }

        [IgnoreMap]
        public virtual ICollection<UserSession> UserSessions { get; set; }

        [IgnoreMap]
        public virtual ICollection<UserRole> UserRoles { get; set; }

        [IgnoreMap]
        public virtual ICollection<UserCompositeRole> UserCompositeRoles { get; set; }



        public User()
        {
            NewConcurrencyStamp();
            NewSecurityStamp();
            CreatedAt = DateTime.Now;
        }

        public void NewSecurityStamp()
        {
            SecurityStamp = Guid.NewGuid().ToString();
        }

        public void NewConcurrencyStamp()
        {
            ConcurrencyStamp = Guid.NewGuid().ToString();
        }
    }
}