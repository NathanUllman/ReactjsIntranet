using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ImageScrapping.Models
{
    public class DashboardItem
    {
        public int DashboardItemID { get; set; }
        public int DashboardID { get; set; }
        public string Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int SortOrder { get; set; }
        public int DashboardTypeID { get; set; }
        public int DashboardItemStatusID { get; set; }

        public string SourceURL { get; set; }
        public string LogonUser { get; set; }
        public string LogonPwd { get; set; }
        public string ImageURI { get; set; }
        public string CssSelector { get; set; }
        public string ClickThruURL { get; set; }
        public string DisplayText { get; set; }

        public DashboardItem Create(IDataRecord record)
        {

            return new DashboardItem
            {
                DashboardItemID = (int)record["DashboardItemID"],
                DashboardID = (int)record["DashboardID"],
                Title = record["Title"].ToString(),
                SourceURL = record["SourceURL"].ToString(),
                LogonUser = record["LogonUser"].ToString(),
                LogonPwd = record["LogonPwd"].ToString(),
                CssSelector = record["CssSelector"].ToString(),
                ImageURI = record["ImageURI"].ToString(),
                ClickThruURL = record["ClickThruURL"].ToString(),
                StartDateTime = (DateTime)record["StartDateTime"],
                EndDateTime = (DateTime)record["EndDateTime"],
                SortOrder = (int)record["SortOrder"],
                DashboardTypeID = (int)record["DashboardTypeID"],
                DashboardItemStatusID = (int)record["DashboardItemStatusID"],
                DisplayText = record["DisplayText"].ToString(),

            };
        }   
    }
}
