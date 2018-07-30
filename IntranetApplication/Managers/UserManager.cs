using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IntranetApplication.Accessors;
using IntranetApplication.Engines;
using IntranetApplication.Models.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace IntranetApplication.Managers
{
    public class UserManager
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private DbAccessor accessor = new DbAccessor();

        public UserManager(UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<List<User>> GetUsers() // does not return any admin users
        {
            List<User> info = new List<User>();

            foreach (var user in _userManager.Users)
            {
                if (!await _userManager.IsInRoleAsync(user, "Administrator"))
                {
                    info.Add(user);
                }
            }

            return _userManager.Users.ToList();
        }

        public async Task<User> GetUser(string id)
        {
            if (id == null)
            {
                return null;
            }

            return await _userManager.FindByIdAsync(id);
        }

        public async Task<string> AddUserToRole(string roleName, string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            var result = await _userManager.AddToRoleAsync(user, roleName);

            return ""; // todo error

        }
        public async Task<string> RemoveUserFromRole(string roleName, string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);

            return "";
        }

        public async Task<string> AddUser(AddUser newUser, ModelStateDictionary ModelState)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    UserName = newUser.Email,
                    Email = newUser.Email
                };

                var result = await _userManager.CreateAsync(user, newUser.Password);

                if (result.Succeeded && newUser.DashPrivileges != null) // add dash privileges 
                {
                    string userID = _userManager.Users.Where(x => x.Email == user.Email).ToList()[0].Id; // get the id of the user we just created todo: cleaner

                    var errorMessage = AddDashPrivileges(userID, newUser.DashPrivileges);
                    if (errorMessage != null) ModelState.AddModelError(string.Empty, errorMessage);

                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description); // add errors to our list that we will send our UI

                    }
                }
            }

            if (ModelState.ErrorCount == 0)
            {
                return "/UserManager"; // sending back a url will notify UI to change pages
            }


            var messages = ToolEngine.GetErrorMessages(ModelState);
            return JsonConvert.SerializeObject(messages); // returns string list of errors for page to display, errors based on model specifications

        }

        public async Task<string> DeleteUser(string id)
        {
            List<string> response = new List<string>();

            User user = await _userManager.FindByIdAsync(id); // get user

            string errorMessage = RemoveAllDashPrivileges(user.Id); // remove all user privileges or else deleting user will cause exception (foreign key constaint)
            if (errorMessage != null) response.Add(errorMessage); // if error message null, it wont add anything anyways

            try
            {
                var result = await _userManager.DeleteAsync(user);



                if (result.Succeeded)
                {
                    return "";
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        response.Add(error.Description);
                    }
                }
            }
            catch (Exception e)
            {
                response.Add(e.Message);
            }
            return JsonConvert.SerializeObject(response);
        }

        public List<string> GetDashPrivilegesForUser(string id)
        {
           return accessor.GetDashPrivilegesForUser(id);
        }

        public List<string> GetUsersWithPrivilege(string dashID)
        {
            return accessor.GetUsersWithPrivilege(dashID);
        }

        public string AddDashPrivileges(string userID, List<string> dashPrivileges) //todo how to handle errors and pass up messags?
        {

            List<string> errorList = new List<string>();
            try
            {              
                foreach (var dashID in dashPrivileges)
                {
                 Exception error = accessor.AddDashPrivilege(dashID, userID);
                    if(error != null) errorList.Add(error.Message);
                }

                if (errorList.Count == 0)
                {
                    return "";
                }
                else
                {
                    return JsonConvert.SerializeObject(errorList);
                }
               
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

        public string DeleteDashPrivileges(string userID, List<string> dashPrivileges)
        {
            List<string> errorList = new List<string>();
            try
            {
                foreach (var dashID in dashPrivileges)
                {
                 Exception error =  accessor.DeleteDashPrivilege(userID, dashID);
                    if (error != null) errorList.Add(error.Message);
                }

                if (errorList.Count == 0)
                {
                    return "";
                }
                else
                {
                    return JsonConvert.SerializeObject(errorList);
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }




        private string RemoveAllDashPrivileges(string userID)
        {
            Exception error = accessor.RemoveAllDashPrivileges(userID);
            return error?.Message;

        }

    }
}
