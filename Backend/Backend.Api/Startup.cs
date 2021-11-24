using Accounts.Core;
using Common.Security;
using CommonServices.Core;
using Forms.Core;
using Message.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

namespace Backend.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JwtConfig>(Configuration.GetSection(JwtConfig.SectionName));
            services.Configure<AccountsConfig>(Configuration.GetSection(AccountsConfig.SectionName));
            services.Configure<FormsConfig>(Configuration.GetSection(FormsConfig.SectionName));
            services.Configure<CommonServiceConfig>(Configuration.GetSection(CommonServiceConfig.SectionName));
            services.Configure<EmailConfig>(Configuration.GetSection(EmailConfig.SectionName));

            //-- Swagger
            services.AddSwaggerGen(swagger =>
            {
                //This is to generate the Default UI of Swagger Documentation  
                swagger.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Backend.Api",
                    Description = "My Web API"
                });
                // To Enable authorization using Swagger (JWT)  
                swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                });
                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}
                    }
                });
            });

            //-- JWT
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                    ClockSkew = new TimeSpan(0)
                };
            });


            //-- CORS
            var cors_origins = new string[]
            {
                "https://localhost:3001",
            };

           

            services.AddCors(o => o.AddPolicy("react", builder =>
            {
                builder.WithOrigins(cors_origins)
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader();
            }));



            //-- Common
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ICurrentUserNameService, CurrentUserNameService>();


            //--modelState
            services.AddControllers().ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            //-- Accounts 
            var connectionString = Configuration["ConnectionString"];
            var formAuthentication = true;
            //services.AddAccountsServices<User>(formAuthentication, connectionString);
            services.AddAccountsContext<User>(connectionString);
            if (formAuthentication)
            {
                services.AddFormAccountsService<User>();
            }
            else
            {
                services.AddWindowsAccountsService<User>();
            }
            services.AddMenuService();
            services.AddUserManagmentService();
            services.AddAuthorizationService<User>();
            //services.AddMvc()
            //    .AddApplicationPart(Assembly.Load("Accounts.Controllers"))
            //    .AddControllersAsServices();


            //-- Grids
            services.AddGridsData(connectionString);
            services.AddGridsService();

            //services.AddMvc()
            //    .AddApplicationPart(Assembly.Load("Grids.Controllers"))
            //    .AddControllersAsServices();

            //-- CommonServices
            services.AddCommonServicesData(connectionString);
            services.AddCommonServicesService();

            //services.AddMvc()
            //    .AddApplicationPart(Assembly.Load("Grids.Controllers"))
            //    .AddControllersAsServices();

            services.AddEmailServices();



            //-- 
            services.AddControllers();  // web-api



        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend.Api v1"));
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors("react");


            // jwt
            //app.UseMiddleware<JwtMiddleware>();
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}