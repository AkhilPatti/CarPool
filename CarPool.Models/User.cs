using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarPool.Models
{
    public class User
    {
        public string emailId { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string phNo { get; set; }
        public List<string> offeredRides { get; set; }
        public List<string> bookedRides { get; set; }
    }
}
