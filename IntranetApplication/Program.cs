using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Managers;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace IntranetApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                // var config = host.Services.GetRequiredService<IConfiguration>();             
                var testUserPw = "Super123@"; // config["SeedUserPW"]; // dotnet user-secrets set SeedUserPW <pw>

                try
                {
                    SeedDataManager.Initialize(services, testUserPw)
                        .Wait(); //add an initial admin account to the db on startup, also add Editor role
                }
                catch (Exception ex)
                {
                    Console.Write("An error occurred while seeding the database.");
                }
            }
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
