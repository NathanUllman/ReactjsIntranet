using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Enumeration;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ImageScrapping.Engines;
using IntranetApplication.Engines;
using IntranetApplication.Managers;
using IntranetApplication.Models;
using IntranetApplication.Models.Account;
using IntranetApplication.Models.DashboardItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IntranetApplication.Controllers.Admin
{



    [Route("api")]
    public class DashManagerController : Controller
    {
        private DashManager manager;
        public ImageEngine imageEngine = new ImageEngine();
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public DashManagerController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            manager = new DashManager(userManager,signInManager,roleManager);
        }


        // GET: /api/get/dashboards
        [HttpGet("get/dashboards")]
        public List<Dashboard> GetDashboards()
        {
            return manager.GetDashboards();
        }

        [HttpGet("get/dashboard/{id}")]
        public Dashboard GetDashboard(string id)
        {
            return manager.GetDashboard(id);
        }

        [HttpGet("get/dashboards/filterByPriv/{id}")]
        public async Task<List<Dashboard>> GetDashboardsFilteredByPrivilege(string userID)
        {
            if (userID == null) // if no id is given, we just look for current user's id
            {
                var currentUser = await _userManager.GetUserAsync(User);
                userID = currentUser.Id;
            }

            return await manager.GetDashboardsFilteredByPrivilege(userID);
        }

        [HttpGet("get/dashboardItems")]
        public List<DashboardItem> GetDashboardItems()
        {
            return manager.GetDashboardItems();
        }

        [HttpGet("get/dashboardItem/{id}")]
        public DashboardItem GetDashboardItem(string id)
        {
            return manager.GetDashboardItem(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("update/dashboards")]
        public bool UpdateDashboards([FromBody]List<Dashboard> items)
        {
            return manager.UpdateDashboards(items);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("update/dashboardItems")]
        public bool UpdateDashboardItems([FromBody]List<DashboardItem> items)
        {
            return manager.UpdateDashboardItems(items);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("add/dashboard")]
        public string AddDashboard([FromForm]Dashboard dash)
        {
            return manager.addDashboard(dash, ModelState); // returns a serialized list of error messages to ourput for user
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("add/dashboard/WithPriv")]
        public string AddDashboardWithPriv([FromForm] Dashboard dash, [FromForm] List<string> usersWhoCanEdit)
        {
            return "/";
        }

        [Authorize]
        [HttpPost("add/dashboardItem")]
        public string AddDashboardItems([FromForm]DashboardItem newItem)
        {
            return manager.AddDashboardItems(newItem, ModelState);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("delete/dashboard/{id}")]
        public string DeleteDashboard(int id)
        {
            return manager.DeleteDashboard(id);
        }

        [Authorize]
        [HttpGet("delete/dashboardItem/{id}")]
        public string DeleteDashboardItem(int id)
        {
            return manager.DeleteDashboardItem(id);
        }

        [Authorize]
        [HttpPost("Engine/UploadImg")]
        public string UploadImg(IFormFile file)
        {
            return imageEngine.Upload(file); ; //returns uri location of uploaded image
        }

        [Authorize]
        [HttpPost("Engine/TestScrapping")]
        public string TestScrapping([FromBody] DashItemScrap info) // info only had 4 needed properties
        {
            return imageEngine.TestImgScrap(info); // returns uri of location of uploaded image
        }
    }
}
