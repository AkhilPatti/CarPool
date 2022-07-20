using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Dtos
{
    public class RideDto
    {
        public string startLocation { get; set; }
        public string destination { get; set; }
        public string time { get; set; }
        public List<string> stops { get; set; }
        public int availableSeats { get; set; }
        public string riderEmail { get; set; }
        public string riderName { get; set; }
        public int price { get; set; }
        public string date { get; set; }
    }
}
