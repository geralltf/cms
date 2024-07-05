using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AuthorizationSample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}


//using Microsoft.AspNetCore.Authentication.OAuth;
//using Microsoft.AspNetCore.Authorization;

//using Microsoft.AspNet.Identity;
////using Microsoft.AspNet.Identity.EntityFramework;
//using Microsoft.Owin;
//using Microsoft.Owin.Security.Cookies;
//using Microsoft.Owin.Security.Google;
//using Microsoft.Owin.Security.OAuth;
//using jwtAuth.Services;
//using Owin;

//using System.Security.Claims;
//using System.Text;
//using jwtAuth;
//using jwtAuth.Extensions;
////using jwtAuth.Models;
//using jwtAuth.Services;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
////builder.Services.Configure<CookiePolicyOptions>(options =>
////{
////    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
////    options.CheckConsentNeeded = context => true;
////    options.MinimumSameSitePolicy = SameSiteMode.None;
////});

////builder.Services.AddAuthorization(options =>
////{
////    //options.DefaultPolicy = ;
////    string DefaultAuthorizedPolicy = "AuthenticatedUserSchemeName";
////    options.AddPolicy(DefaultAuthorizedPolicy, policy =>
////    {
////        policy.Requirements.Add(new TokenAuthRequirement());
////    });
////});
////builder.Services.AddSingleton<IAuthorizationHandler, AuthTokenPolicy>();

//builder.Services.AddAuthorization();

////Microsoft.AspNetCore.Authentication.AuthenticationOptions options = new Microsoft.AspNetCore.Authentication.AuthenticationOptions();

////builder.Services.AddAuthentication(o=> {
////    o.RequireAuthenticatedSignIn = true;
////    o.DefaultSignInScheme = "/signin";
////    o.DefaultSignOutScheme = "/signout";
////    o.DefaultAuthenticateScheme = "/authenticate";
////    o.DefaultForbidScheme = "/error";
////}
////).AddCookie();

//builder.Services.AddTransient<AuthService>();

//builder.Services.AddAuthentication(x =>
//{
//    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(x =>
//{
//    x.TokenValidationParameters = new TokenValidationParameters
//    {
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.PrivateKey)),
//        ValidateIssuer = false,
//        ValidateAudience = false
//    };
//});

//builder.Services.AddAuthorization(x =>
//{
//    x.AddPolicy("admin", p => p.RequireRole("manager"));
//    x.AddPolicy("tech", p => p.RequireRole("developer"));
//});




//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//app.UseDefaultFiles();
//app.UseStaticFiles();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

////app.UseOAuthBearerTokens(OAuthOptions);


////new WebHostBuilder()
////       .UseKestrel(options =>
////       {
////           options.AllowSynchronousIO = false;
////       });

//app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();

////app.UseAuthorization();
////app.UseAuthentication();

//app.MapControllers();

//app.MapFallbackToFile("/index.html");

//app.Run();
