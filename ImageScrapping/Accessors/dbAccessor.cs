using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ImageScrapping.Models;

namespace ImageScrapping.Accessors
{
    class Accessor
    {
        private string CONNECTION_STRING =
            "Server = PLXLicensingDB ; Database = IntranetDB; User Id=test; Password = Penlink123;";

        private SqlConnection _conn { get; }
        public Accessor()
        {
            _conn = new SqlConnection(CONNECTION_STRING);
        }

        public List<DashboardItem> GetScrappedDashItems()
        {

            SqlDataReader reader;
            List<DashboardItem> result = new List<DashboardItem>();

            using (_conn)
            {
                SqlCommand cmd = new SqlCommand("dbo.GetDashItemsOfType", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardTypeID", SqlDbType.Int).Value = 1; //Scrapped dash items have type id of 1

                _conn.Open();
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    try
                    {
                        result.Add(new DashboardItem().Create(reader));
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Data);
                    }
                }
                _conn.Close();
            }
            return result;

        }



    }
}
