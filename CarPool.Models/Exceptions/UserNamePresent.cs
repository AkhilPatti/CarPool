using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Exceptions
{
    public class UserNamePresent:Exception
    {
        public UserNamePresent() :
            base(String.Format("UserNameAlreadySet"))
        { }
    }
}
