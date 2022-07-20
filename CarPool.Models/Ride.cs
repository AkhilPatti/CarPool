using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models
{
    public class Ride
    {
        public string RideId { get; set; }
        public string startLocation { get; set; }
        public string destination { get; set; }
        public string time { get; set; }
        public List<string> stops { get; set; }
        public int availableSeats {get; set;}
        public List<string> passengers { get; set; }
        public string riderEmail {get; set; }
        public int price { get; set; }
        public string date  {get; set;}
        public string riderName { get; set; }
    }
}
