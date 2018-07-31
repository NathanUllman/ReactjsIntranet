using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace IntranetApplication.Accessors
{
    public partial class DbAccessor
    {

        public List<string> GetDashPrivilegesForUser(string id)
        {
            SqlDataReader reader;
            List<string> dashIDs = new List<string>();
            try
            {
        
                SqlCommand cmd = new SqlCommand("dbo.GetDashPrivilegesForUser", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@UserID", SqlDbType.VarChar).Value = id;

                _conn.Open();
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    try
                    {
                        dashIDs.Add(reader["DashboardID"].ToString());
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Data);
                    }
                }
                _conn.Close();
            }
            
            catch (Exception e)
            {
                // todo error handling
                _conn.Close();
            }
            return dashIDs;
        }

        public List<string> GetUsersWithPrivilege(string dashID)
        {
             SqlDataReader reader;
            List<string> dashIDs = new List<string>();
            try
            {
        
                SqlCommand cmd = new SqlCommand("dbo.GetUsersWithPrivilege", _conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = dashID;

                _conn.Open();
                reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    try
                    {
                        dashIDs.Add(reader["UserID"].ToString());
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Data);
                    }
                }
                _conn.Close();
            }
            
            catch (Exception e)
            {
                // todo error handling
                _conn.Close();
            }
            return dashIDs;


        }

        public Exception AddDashPrivilege(string dashID, string userID)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("dbo.InsertDashPrivilege", _conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = dashID;
                cmd.Parameters.Add("@UserID", SqlDbType.VarChar).Value = userID;

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

        public Exception DeleteDashPrivilege(string userID, string dashID)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("dbo.DeletDashPrivilege", _conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@UserID", SqlDbType.VarChar).Value = userID;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = dashID;

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

        public Exception RemoveAllDashPrivilegesForUser(string userID)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("dbo.RemoveAllDashPrivileges", _conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@UserID", SqlDbType.VarChar).Value = userID;

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

        public Exception RemoveAllPrivilegesOnDashboard(string dashID)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("dbo.RemoveAllPrivilegesOnDashboard", _conn);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@DashboardID", SqlDbType.Int).Value = dashID;

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



    }
}
