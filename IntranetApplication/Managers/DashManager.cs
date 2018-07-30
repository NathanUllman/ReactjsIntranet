using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Accessors;
using IntranetApplication.Engines;
using IntranetApplication.Models;
using IntranetApplication.Models.Account;
using IntranetApplication.Models.DashboardItems;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace IntranetApplication.Managers
{
    public class DashManager
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private DbAccessor accessor = new DbAccessor();

        public DashManager(UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public List<Dashboard> GetDashboards()
        {
            List<Dashboard> items = accessor.GetActiveDashboards();
            return items.OrderBy(x => x.SortOrder).ToList(); 
        }

        public Dashboard GetDashboard(string id)
        {
            return accessor.GetDashboard(id);
        }

        public async Task<List<Dashboard>> GetDashboardsFilteredByPrivilege(string userID)
        {
            /* todo pass User into the managers instead of looking up id? */
            var currentUser = await _userManager.FindByIdAsync(userID);
            if (await _userManager.IsInRoleAsync(currentUser, "Administrator")) // first check for admin
            {
                return GetDashboards(); // if user is admin, they get all the goodies
            }


            List<Dashboard> result = new List<Dashboard>();

            List<Dashboard> dashboards =  accessor.GetActiveDashboards().OrderBy(x => x.SortOrder).ToList(); // grab dashboards
            List<string> dashPriv = accessor.GetDashPrivilegesForUser(userID); // grab dashboardIDs of dashboards the user can edit

            foreach (var dash in dashboards) // filter out so that we only get dashboards the use can edit
            {
                if (dashPriv.Contains(dash.DashboardID.ToString()))
                {
                    result.Add(dash);
                }
            }

            return result;
        }

        public List<DashboardItem> GetDashboardItems()
        {
            List<DashboardItem> items = accessor.GetActiveDashboardItems();
            return items.OrderBy(x => x.SortOrder).ToList();
        }
        public DashboardItem GetDashboardItem(string id)
        {
            DashboardItem item = accessor.GetDashItem(id);
            return item;
        }
        public bool UpdateDashboards(List<Dashboard> items) //todoErrorHanding
        {
            foreach (var dash in items)
            {
                accessor.UpdateDashboard(dash);
            }
            return true;
        }
        public bool UpdateDashboardItems(List<DashboardItem> items)
        {
            foreach (var dashItem in items)
            {
                accessor.UpdateDashItem(dashItem);
            }

            return true;
        }

        public string addDashboard(Dashboard dash, ModelStateDictionary ModelState)
        {

            Exception accessorError = null;

            if (ModelState.IsValid)
            {

                if (dash.DashboardID == 0)
                {
                    accessorError = accessor.InsertDashboard(dash); // if any error from insert, add to error list
                }
                else
                {
                    accessorError = accessor.UpdateDashboard(dash); // if any error from insert, add to error list
                }

                if (accessorError == null)
                {
                    return "/DashManager"; // null content lets page know that everything was successful
                }
                else
                {
                    ModelState.AddModelError(string.Empty, accessorError.Message);

                }

            }

            var messages = ToolEngine.GetErrorMessages(ModelState);
            return JsonConvert.SerializeObject(messages); // returns string list of errors for page to display, errors based on model specifications

        }

        public string AddDashboardItems(DashboardItem dashItem, ModelStateDictionary ModelState)
        {
            Exception accessorError = null;

            if (ModelState.IsValid)
            {
                if (dashItem.DashboardItemID == 0) // creating new item
                {
                    accessorError = accessor.InsertDashItem(dashItem);
                }
                else // editing pre-existing item
                {
                    accessorError = accessor.UpdateDashItem(dashItem);
                }

                if (accessorError == null)
                {
                    return "/DashManager"; 
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "DB Error: " + accessorError.Message);

                }

            }
            return JsonConvert.SerializeObject(ToolEngine.GetErrorMessages(ModelState));
        }

        public string DeleteDashboard(int id)
        {
            accessor.DeleteDashboard(id);
            return "Successful delete"; //todo error handling
        }
        public string DeleteDashboardItem(int id)
        {
            accessor.DeleteDashItem(id);
            return "Successful delete"; //todo error handling
        }

    }
}
