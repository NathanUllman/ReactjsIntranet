using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace IntranetApplication.Engines
{
    public class ToolEngine // common functions used by mulitple classes or components
    {
        public static List<string> GetErrorMessages(ModelStateDictionary state)
        {
            List<string> errorList = new List<string>();
            var errors = state.Select(x => x.Value.Errors)
                .Where(y => y.Count > 0)
                .ToList();

            foreach (var collection in errors)
            {
                foreach (var error in collection)
                {
                    errorList.Add(error.ErrorMessage);
                }
            }

            return errorList;

        }
    }
}
