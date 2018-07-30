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
    public class NewHiresController : ControllerBase
    {
        NewHires[] newHires = new NewHires[]
        {
            new NewHires { Id = 1, Name = "Logan", Description = "Logan is considered the greatest person at PenLink.", Image = "/images/logamn.PNG"},
            new NewHires { Id = 2, Name = "Logan", Description = "He wears interesting shirts and is passionate about things.",  Image = "/images/logan2.jpg"},
            new NewHires { Id = 3, Name = "Logan", Description = "He also struggles from manopause and eating lemons whole. Yes, that includes the rind.",
                Image = "/images/logamn.PNG"}
        };
        // GET: api/NewHires
        [HttpGet("newhires")]
        public IEnumerable<NewHires> Get()
        {
            return newHires;
        }
        
    }
}
