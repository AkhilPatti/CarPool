using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Exceptions
{
    public class NoInternet:Exception
    {
        public NoInternet() :
            base(String.Format("Check your Internet Connection"))
        { }
    }
}
