﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool.Models.Dtos
{
    public class UserDto
    {
        public string emailId { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string phNo { get; set; }
        public string imageUrl { get; set; }
    }
}
