using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models
{
    public class HistoryRideDetails
    {
        public string startLocation { get; set; }
        public string destination { get; set; }
        public string time { get; set; }
        public int price { get; set; }
        public string date { get; set; }
        public string name { get; set; }
        public string riderEmail { get; set; }

    }
}
