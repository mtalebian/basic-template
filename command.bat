cd Backend\Backend.Api
dotnet watch run


https://stackoverflow.com/questions/53300480/unable-to-configure-https-endpoint-no-server-certificate-was-specified-and-the

Eventually I realized that certmgr.msc also showed a number of localhost certificates under Personal\Certificates, in addition to those under Trusted Root Certification Authorities\Certificates. It turned out that these all needed to be deleted.
Then running dotnet dev-certs https -t a single time created and trusted a new development certificate.
I verified by debugging an ASP.NET Core App. Another way to verify is by running dotnet dev-certs https --check --verbose

