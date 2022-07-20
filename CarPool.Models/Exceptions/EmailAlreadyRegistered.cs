using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Exceptions
{
    public class EmailAlreadyRegistered : Exception
    {
        public EmailAlreadyRegistered() :
            base(String.Format("Email Id Already Registered"))
        { }
    }
}
