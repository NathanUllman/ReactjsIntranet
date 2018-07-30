using IntranetApplication.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntranetApplication.Controllers
{
    [Route("api")]
    [ApiController]
    public class SalesDashboardTableController : ControllerBase
    {
        SalesDashboardTable[] salesDashboards = new SalesDashboardTable[]
        {
            new SalesDashboardTable { Id = 1, DashboardName = "Sales Dashboard 1", Date = DateTime.Now.ToShortDateString()},
            new SalesDashboardTable { Id = 2, DashboardName = "Sales Dashboard 2", Date = DateTime.Parse("2018-05-01").ToShortDateString()},
            new SalesDashboardTable { Id = 3, DashboardName = "Sales Dashboard 3", Date = DateTime.Parse("2018-04-23").ToShortDateString()},
            new SalesDashboardTable { Id = 4, DashboardName = "Sales Dashboard 4", Date = DateTime.Parse("2018-03-06").ToShortDateString()}
        };
        // GET: api/NewHires
        [HttpGet("salesdashboardtable")]
        public IEnumerable<SalesDashboardTable> Get()
        {
            return salesDashboards;
        }
        
    }
}
