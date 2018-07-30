using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ImageScrapping.Engines;
using IntranetApplication.Models.DashboardItems;
using Microsoft.AspNetCore.Http;

namespace IntranetApplication.Engines
{
    public class ImageEngine
    {

        public string Upload(IFormFile file)
        {
            if (file == null)
            {
                return "null";
            }


            string location = "ClientApp/public/images/uploaded/" + GetHash(file);


            // var domain = Request.GetUri().ToString().Replace("/DashboardForms/UploadImage", ""); // used to get the domain of the website
            //location = location.Replace(domain, "wwwroot");
            var filePath = location + ".jpg";



            if (file.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }


            location = location.Replace("ClientApp/public", ""); // so that img src will point to correct area
            return location + ".jpg";
        }



        public string GetHash(IFormFile file)
        {
            SHA256 mySHA256 = SHA256Managed.Create();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string s = Convert.ToBase64String(fileBytes);
                mySHA256.ComputeHash(Encoding.UTF8.GetBytes(s));
            }

            return BitConverter.ToString(mySHA256.Hash); // encrypt that bad boy
        }

        public string TestImgScrap(DashItemScrap info)
        {
            string absoluteLocation = "C:\\Users\\nullman\\source\\repos\\OnlyReactIntranet\\IntranetApplication\\ClientApp\\public\\images\\Scrapped\\";
            string uri = "/images/Scrapped/"; // the uri that absolute location points to

            try
            {
                string name = ScrappingEngine.ScrapImage(info.LogonUser, info.LogonPwd, info.CssSelector,
                    info.SourceURL, absoluteLocation); // returns uri of scrapped image
                var response = uri + name;
                return response; // returns the src that the img needs
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
