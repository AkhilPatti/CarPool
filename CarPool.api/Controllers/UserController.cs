using CarPool.Services;
using CarPool.Models;
using FireSharp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FireSharp.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using AutoMapper;
using CarPool.Models.Dtos;

namespace CarPool.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper mapper;
        IUserServices services;
        FirebaseClient client;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "Y81J2Yp7hFKfenTCx8rSobzeJzAZzTz2kdJLJ1Lf",
            BasePath = "https://car-pool-e077d-default-rtdb.firebaseio.com/"
        };
        
        public UserController(IUserServices _services, IMapper mapper)
        {
            services = _services;
            client = new FirebaseClient(config);
            this.mapper = mapper;
        }
        [HttpGet("/Name")]
        public ActionResult<string> GetName(string email)
        {
            try
            {
                var name = services.getName(email);
                if (name==null)
                {
                    return NoContent();
                }
                return Ok(name);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPut("/Details")]
        public ActionResult<User> SetDetails(string name, string email,string phno)
        {
            try
            {
                return Ok(services.setDetails(name, email, phno));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("/OfferRide")]
        public ActionResult<string> CreateRide([FromBody] RideDto rideDto)
        {
            var ride = mapper.Map<Ride>(rideDto);
            try
            {
                return Ok(services.OfferRide(ride));
            }
            catch
             {
                return BadRequest("No Internet Connextion");
            } 
        }
        [HttpGet("/Rides")]
        public List<Ride> GetAvailableRides(string date, string time, string start, string destination)
        {
            return services.FilterRides(date, time, start, destination);
            //return services.ListofRides();
        }
        [HttpPut("/BookRide")]
        public ActionResult<bool> BookARide(string rideId, string passengerId)
        {
            return Ok(services.BookRide(HashingService.GenerateHash(passengerId.ToLower()), rideId));
        }
        [HttpGet("/GetBookedRides")]
        public ActionResult<List<HistoryRideDetails>> GetBookedRides(string userId)
        {
            return Ok(services.GetBookedRides(userId));
        }
        [HttpGet("/GetOfferedRides")]
        public List<HistoryRideDetails> GetOfferedRides(string userId)
        {
            return services.GetOfferedRides(userId);
        }
        [HttpGet("/GetUserDetails")]
        public ActionResult<UserDto> GetUserDetails(string userId)
        {
            return Ok(services.GetUserDetails(userId));
        }
    }
}
