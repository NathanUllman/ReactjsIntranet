using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Models;
using IntranetApplication.Models.DashboardItems;
using Microsoft.AspNetCore.Mvc;

namespace IntranetApplication.Accessors
{
    /* split up between mulitple partial classes for cleanliness */
    public partial class DbAccessor
    {
        private SqlConnection _conn { get; }

        public DbAccessor()
        {
            _conn = new SqlConnection(Constants.CONNECTION_STRING);
        }         
    }
}
