using System;
using System.DirectoryServices.AccountManagement;
using System.Runtime.Versioning;

namespace Common
{

    [SupportedOSPlatform("windows")]
    public class WindowsUserInfo
    {
        public DateTime? AccountExpirationDate { get; private set; }
        public string UserId { get; private set; }
        public string Description { get; private set; }
        public string DisplayName { get; private set; }
        public string DistinguishedName { get; private set; }
        public string EmailAddress { get; private set; }
        public string EmployeeId { get; private set; }
        public bool? Enabled { get; private set; }
        public string GivenName { get; private set; }
        public string MiddleName { get; private set; }
        public string Name { get; private set; }
        public string SamAccountName { get; private set; }
        public string Surname { get; private set; }
        public string UserPrincipalName { get; private set; }
        public string VoiceTelephoneNumber { get; private set; }
        public string DomainName { get; private set; }




        public WindowsUserInfo()
        {
        }

        public WindowsUserInfo(string domain, string userId, string password)
        {
            Initialize(domain, userId, password, userId);

        }

        public WindowsUserInfo(string domain, string serviceId, string servicePassword, string userId)
        {
            Initialize(domain, serviceId, servicePassword, userId);
        }

        private void Initialize(string domain, string serviceId, string servicePassword, string userId)
        {
            Validate(ref domain, ref serviceId);
            PrincipalContext PrincipalContext;
            UserPrincipal up;
            using (PrincipalContext = new PrincipalContext(ContextType.Domain, domain, domain + "\\" + serviceId, servicePassword))
            {
                var user_name = userId;
                var user_domain = "";
                Validate(ref user_domain, ref user_name);
                using (up = UserPrincipal.FindByIdentity(PrincipalContext, user_domain + "\\" + user_name))
                {
                    if (up == null)
                        throw new Exception("Invalid userId. UseId must be like Domain\\User or User@Domain.com");

                    AccountExpirationDate = up.AccountExpirationDate;
                    Description = up.Description;
                    DisplayName = up.DisplayName;
                    DistinguishedName = up.DistinguishedName;

                    EmailAddress = up.EmailAddress;
                    EmployeeId = up.EmployeeId;
                    Enabled = up.Enabled;
                    GivenName = up.GivenName;
                    MiddleName = up.MiddleName;
                    Name = up.Name;
                    SamAccountName = up.SamAccountName;
                    Surname = up.Surname;
                    UserPrincipalName = up.UserPrincipalName;
                    VoiceTelephoneNumber = up.VoiceTelephoneNumber;
                    DomainName = domain;
                    //----------------
                    string[] parts;
                    UserId = string.IsNullOrEmpty(EmployeeId) ? userId : EmployeeId;
                    parts = UserId.Split('@');
                    if (parts.Length > 1)
                    {
                        UserId = parts[0];
                        DomainName = parts[1];
                    }
                    parts = UserId.Split('\\');
                    if (parts.Length > 1)
                    {
                        UserId = parts[1];
                        DomainName = parts[0];
                    }
                    parts = UserId.Split('/');
                    if (parts.Length > 1)
                    {
                        UserId = parts[1];
                        DomainName = parts[0];
                    }
                }
            }
        }

        private static void Validate(ref string domain, ref string userId)
        {
            if (userId.IsWhiteSpace()) throw new Exception("Invalid userid");
            userId = userId.Trim();
            if (!userId.Contains('@'))
            {
                var i = userId.IndexOf('\\');
                if (i <= 0) return;
                domain = userId.Substring(0, i).Trim();
                userId = userId[(i + 1)..].Trim();
                return;
            }
            string[] parts = userId.Split('@');
            if (parts.Length != 2) throw new Exception("Invalid userid");
            userId = parts[0];
            domain = parts[1];
        }


        public static string GetADUserDisplayName(string username)
        {
            using var pctx = new PrincipalContext(ContextType.Domain);
            using UserPrincipal up = UserPrincipal.FindByIdentity(pctx, username);
            return up != null && !String.IsNullOrEmpty(up.GivenName) && !String.IsNullOrEmpty(up.Surname) ? string.Format("{0} {1}", up.GivenName, up.Surname) : string.Empty;
        }

        public static bool IsValid(string domain, string userName, string password)
        {
            using var pc = new PrincipalContext(ContextType.Domain, domain);
            return pc.ValidateCredentials(userName, password);
        }

    }

}
