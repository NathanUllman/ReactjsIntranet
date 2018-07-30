using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using IntranetApplication.Models;

namespace IntranetApplication.Accessors
{
    public partial class  DbAccessor
    {
        public List<Dashboard> GetActiveDashboards()
        {
            List<Dashboard> result = new List<Dashboard>();
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader;


                cmd.CommandText = "exec GetActiveDashboards";
                cmd.CommandType = CommandType.Text;
                cmd.Connection = _conn;

                _conn.Open();
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    try
                    {
                        result.Add(new Dashboard().Create(reader));
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Data);
                    }
                }
                _conn.Close();
            
            return result;
        }

        public Dashboard GetDashboard(string id)
        {
            SqlDataReader reader;
            Dashboard result = new Dashboard();

            using (_conn)
            {
                SqlCommand cmd = new SqlCommand("dbo.GetDashboard", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = id;

                _conn.Open();
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    try
                    {
                        result = new Dashboard().Create(reader);
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
        public Exception InsertDashboard(Dashboard newDashboard)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("dbo.InsertDashboard", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@SortOrder", SqlDbType.Int).Value = newDashboard.SortOrder;
                cmd.Parameters.Add("@DashboardTitle", SqlDbType.VarChar).Value = newDashboard.DashboardTitle;
                cmd.Parameters.Add("@DashboardStatusID", SqlDbType.Int).Value = newDashboard.DashboardStatusID;
                _conn.Open();
                cmd.ExecuteNonQuery();
                _conn.Close();
                return null;
            }
            catch (Exception e)
            {
                _conn.Close();
                return e;
            }

        }
        public Exception UpdateDashboard(Dashboard dashboardToUpdate)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("dbo.UpdateDashboard", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = dashboardToUpdate.DashboardID;
                cmd.Parameters.Add("@DashboardStatusID", SqlDbType.Int).Value = dashboardToUpdate.DashboardStatusID;
                cmd.Parameters.Add("@SortOrder", SqlDbType.Int).Value = dashboardToUpdate.SortOrder;
                cmd.Parameters.Add("@DashboardTitle", SqlDbType.VarChar).Value = dashboardToUpdate.DashboardTitle;
                _conn.Open();
                cmd.ExecuteNonQuery();
                _conn.Close();
                return null;
            }
            catch (Exception e)
            {
                _conn.Close();
                return e;
            }
        }

        public void DeleteDashboard(int id)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("dbo.DeleteDashboard", _conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = id;

                _conn.Open();
                cmd.ExecuteNonQuery();
                _conn.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Data);
            }
        }
    }
}
