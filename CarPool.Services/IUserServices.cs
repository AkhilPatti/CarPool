using CarPool.Models;
using CarPool.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CarPool.Services
{
    public interface IUserServices
    {
        string getName(string email);
        User setDetails(string name, string email,string phNo);
        string OfferRide(Ride ride);
        Dictionary<string,Ride> ListofRides();
        List<Ride> FilterRides(string date, string time, string start, string destination);
        bool BookRide(string userId, string rideId);
        List<HistoryRideDetails> GetBookedRides(string userId);
        List<HistoryRideDetails> GetOfferedRides(string userId);
        UserDto GetUserDetails(string userId);
    }
}