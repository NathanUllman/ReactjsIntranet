using IntranetApplication.Models;
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
    public class RecentSalesController : ControllerBase
    {
        Sales[] sales = new Sales[]
        {
            new Sales { Id = 1, Name = "DEA", Amount = "$1 million" },
            new Sales { Id = 2, Name = "FBI", Amount = "$1 billion" },
            new Sales { Id = 3, Name = "CIA", Amount = "$1 trillion" }
        };

        // GET: api/RecentSales
        [HttpGet("recentsales")]
        public IEnumerable<Sales> Get()
        {
            return sales;
        }
        
    }
}
