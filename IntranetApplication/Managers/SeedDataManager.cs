using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Models;
using IntranetApplication.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IntranetApplication.Managers
{
    public class SeedDataManager // Seeds the database with an admin user
    {
        public static async Task Initialize(IServiceProvider serviceProvider, string testUserPw)
        {
            using (var context = new UserContext(
                serviceProvider.GetRequiredService<DbContextOptions<UserContext>>()))
            {
                var adminID =
                    await EnsureUser(serviceProvider, testUserPw,
                        "admin@penlink.com"); // creates user if one is not already created

                await EnsureRole(serviceProvider, adminID,
                    Constants.AdminRole); // checks that newly created user has specifed role (admin)
              
            }
        }

        private static async Task<string> EnsureUser(IServiceProvider serviceProvider,
            string testUserPw, string UserName)
        {
            var userManager = serviceProvider.GetService<UserManager<User>>(); // get user manager

            var user = await userManager.FindByNameAsync(UserName); // tried to find user in db
            if (user == null) // if user does not exist
            {
                user = new User {UserName = UserName, Email = UserName}; // create new user
                var result = await userManager.CreateAsync(user, testUserPw); // save user to db

            }

            return user.Id; // return Id we can use to find user in db
        }

        private static async Task<IdentityResult> EnsureRole(IServiceProvider serviceProvider,
            string uid, string role)
        {
            IdentityResult IR = null;
            var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetService<UserManager<User>>(); // get user manager

            if (!await roleManager.RoleExistsAsync(role)) // see if our role exists (adminRole)
            {
                IR = await roleManager.CreateAsync(new IdentityRole(role)); // if not, create new
            }

            var user = await userManager.FindByIdAsync(uid); // find user

            if (!await userManager.IsInRoleAsync(user, role)) //todo: figure out if this could go in a spot to stop more unneccessary processes 
            {
                IR = await userManager.AddToRoleAsync(user, role); // give user role (admin)
            }

            return IR;
        }



        private static async Task<IdentityResult> AddRole(IServiceProvider serviceProvider, string role)
        {
            IdentityResult result = null;

            var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();

            if (!await roleManager.RoleExistsAsync(role))
            {
                result = await roleManager.CreateAsync(new IdentityRole(role));
            }

            return result;
        }
    }

}
