using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Exceptions
{
    public class UserPhNoPresent:Exception
    {
        public UserPhNoPresent() :
           base(String.Format("User PhNo is Present"))
        { }
    }
}
