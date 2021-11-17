
>/ Go to appsettings

1-Set "From": "" with Email Address
2-Set "Host": "" with Host Email,
<............................>

*Set UserName and Password for Email**

-->Go to EmailServices and use this Code

var credentials = new System.Net.NetworkCredential("username", "password");

client.Credentials = credentials;

