using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Exceptions
{
    public class NotRegisteredUser:Exception
    {
        public NotRegisteredUser() :
            base(String.Format("Email Id Not Registered"))
        { }
    }
}
