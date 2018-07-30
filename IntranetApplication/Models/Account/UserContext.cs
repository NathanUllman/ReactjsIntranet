using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace IntranetApplication.Models.Account
{
    public class UserContext : IdentityDbContext<User>
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
    }
}
