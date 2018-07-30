using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Managers;
using IntranetApplication.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account.Manage;
using Microsoft.AspNetCore.Mvc;

namespace IntranetApplication.Controllers.Admin
{
    [Route("api/")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private UserManager manager;
        private UserManager<User> _userManager;

        public UserManagerController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            manager = new UserManager(userManager, signInManager, roleManager); // create manager for controller
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("get/users")]
        public async Task<List<User>> GetUsers() // does not return any admins
        {
            return await manager.GetUsers();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("get/user")]
        public async Task<User> GetUser(string id)
        {
            return await manager.GetUser(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("add/user/role")]
        public async Task<string> AddUserToRole(string roleName, string id)
        {
            return await manager.AddUserToRole(roleName, id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("remove/user/role")]
        public async Task<string> RemoveUserFromRole(string roleName, string id)
        {
            return await manager.RemoveUserFromRole(roleName, id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("add/user")]
        public async Task<string> AddUser([FromForm] AddUser newUser)
        {
            return await manager.AddUser(newUser, ModelState);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("delete/user/{id}")]
        public async Task<string> DeleteUser(string id)
        {
            return await manager.DeleteUser(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("get/user/dashPrivileges/{id}")]
        public async Task<List<string>> GetDashPrivilegesForUser(string id) // give user id, get corresponding dash IDs
        {
            if (id == null) // if -1 is given, the we want current user id
            {
                var currentUser = await _userManager.GetUserAsync(User);
                id = currentUser.Id;
            }

            return manager.GetDashPrivilegesForUser(id); // returns a list of dash ID's of corresponding Dashboards the user with the given ID can edit
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("get/user/withPrivilege/{dashID}")]
        public List<string> GetUsersWithPrivilegesForDash(string dashID) // give dash ID, get corresponding userIDs
        {
            return manager.GetUsersWithPrivilege(dashID);
        }


        [Authorize(Roles = "Administrator")]
        [HttpPost("add/user/dashPrivilege")]
        public string AddDashPrivilege([FromBody]Privilege info)
        {
             return manager.AddDashPrivileges(info.UserID, new List<string>(new string[]{info.DashID}));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("delete/user/dashPrivilege")]
        public string DeleteDashPrivilege([FromBody]Privilege info)
        {
            return manager.DeleteDashPrivileges(info.UserID, new List<string>(new string[] {info.DashID}));
        }

    }
}