using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Engines;
using IntranetApplication.Models;
using IntranetApplication.Models.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using Newtonsoft.Json;

namespace IntranetApplication.Controllers
{
    [Route("api")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<string> Login([FromForm] Login info)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(info.Email, info.Password,
                    info.RememberMe,
                    lockoutOnFailure: false);


                if (result.Succeeded)
                {
                    return "/DashManager";
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Login Failed");
                }
            }

            return JsonConvert.SerializeObject(ToolEngine.GetErrorMessages(ModelState)); // returns string list of errors for page to display, errors based on model specifications

        }

        [HttpGet("logout")]
        public async void Logout()
        {
            await _signInManager.SignOutAsync();
        }


        [HttpGet("get/currentUser")]
        public async Task<string> GetCurrentUser()
        {

            var user = await _userManager.GetUserAsync(this.User);

            if (user == null)
            {
                return "";
            }

            return JsonConvert.SerializeObject(user); 
        }

        [HttpGet("get/currentUser/isAdmin")]
        public async Task<bool> GetIsUserAdmin()
        {
            User currentUser = await _userManager.GetUserAsync(this.User);
            if (currentUser == null)
            {
                return false;
            }

            var result = await _userManager.IsInRoleAsync(currentUser, Constants.AdminRole);
            return result;
        }

        [HttpGet("get/currentUser/isLoggedIn")]
        public bool GetIsUserLoggedIn()
        {
            var result = User.Identity.IsAuthenticated;
            return result;
        }

    }

}