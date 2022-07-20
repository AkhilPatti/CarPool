using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarPool.Models;
using CarPool.Models.Dtos;

namespace CarPool.api.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Ride, RideDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Ride, HistoryRideDetails>().ReverseMap();
        }
    }
}
