using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ImageScrapping.Accessors;
using ImageScrapping.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;

namespace ImageScrapping.Engines
{
    public class ScrappingEngine
    {

        public static void ConvertAllImages()
        {

            string storageLocation = ""; // location where you wish all of these to be saved at

            Accessor accessor = new Accessor();
            List<DashboardItem> items = accessor.GetScrappedDashItems();
            foreach (var dashItem in items)
            {
                //info.StorageLocation = storageLocation;
                try
                {
                    ScrapImage(dashItem.LogonUser, dashItem.LogonPwd, dashItem.CssSelector, dashItem.SourceURL, dashItem.ImageURI);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e); // todo: error handling
                }

            }


        }

        public static string ScrapImage(string userName, string password, string cssSelector, string url, string location)  
        {
            try
            {
                url = AddAuthentication(url, userName, password);

                ChromeOptions op = new ChromeOptions();
                op.AddArguments("headless",
                    "window-size=3000,3000"); // what specific window size should be used?

                By locator = By.CssSelector(cssSelector);

                IWebDriver driver = new ChromeDriver(op);

                driver.Navigate().GoToUrl(url);

                Thread.Sleep(TimeSpan.FromSeconds(5));

                IWebElement element = driver.FindElement(locator);

                Screenshot sc = ((ITakesScreenshot) driver).GetScreenshot();

                var img = (Image.FromStream(new MemoryStream(sc.AsByteArray)) as Bitmap);

                var hash = GetHash(img) + ".jpg";
                location = location + hash;

                using (MemoryStream memory = new MemoryStream())
                {
                    using (FileStream fs = new FileStream(location, FileMode.Create, FileAccess.ReadWrite))
                    {
                        img.Clone(new Rectangle(element.Location, element.Size), img.PixelFormat)
                            .Save(memory, System.Drawing.Imaging.ImageFormat.Jpeg);
                        byte[] bytes = memory.ToArray();
                        fs.Write(bytes, 0, bytes.Length);
                    }
                }

                return hash;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private static string AddAuthentication(string url, string userName, string password)
        {

            url = url.Replace("https://", "https://" + userName + ":" + password + "@");

            return url;
        }

        public static string GetHash(Bitmap img)
        {
            SHA256 mySHA256 = SHA256.Create();
            using (var stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                var fileBytes = stream.ToArray();
                string s = Convert.ToBase64String(fileBytes);
                mySHA256.ComputeHash(Encoding.UTF8.GetBytes(s));
            }

            return BitConverter.ToString(mySHA256.Hash); // encrypt that bad boy
        }
    }
}
