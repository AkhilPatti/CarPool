using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using CarPool.Models;
using CarPool.Models.Exceptions;
using FireSharp;
using FireSharp.Config;
using Microsoft.AspNetCore.Mvc;
using FireSharp.Response;
using Newtonsoft.Json;
using CarPool.Models.Dtos;
using AutoMapper;

namespace CarPool.Services
{
    public class UserServices : IUserServices
    {
        FirebaseClient client;
        private readonly IMapper mapper;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "Y81J2Yp7hFKfenTCx8rSobzeJzAZzTz2kdJLJ1Lf",
            BasePath = "https://car-pool-e077d-default-rtdb.firebaseio.com/"
        };
        public UserServices(IMapper mapper)
        {
            this.mapper = mapper;
            client = new FirebaseClient(config);
        }

        public User setDetails(string name, string email, string phNo)
        {
            name = name.ToLower();
            email = email.ToLower();
            User prevUser = getUser(email);
            if (prevUser.name != null)
            {
                throw new UserNamePresent();
            }
            if (prevUser.phNo != null)
            {
                throw new UserPhNoPresent();
            }
            User user = new User()
            {
                emailId = prevUser.emailId,
                password = prevUser.password,
                name = name,
                phNo = phNo

            };
            try
            { client.SetAsync("User/" + HashingService.GenerateHash(email), user); }
            catch
            {
                throw new NoInternet();
            }
            return user;
        }
        public string getName(string email)
        {
            email = email.ToLower();
            try
            {
                User user = getUser(email);
                if (user == null)
                {
                    throw new NotRegisteredUser();
                }
                return user.name;
            }
            catch (NotRegisteredUser)
            {
                throw new NotRegisteredUser();
            }
            catch
            {
                throw new NoInternet();
            }
        }
        private string getNameViaId(string id)
        {
            try
            {
                var result = client.GetAsync("User/" + id);

                User user = result.Result.ResultAs<User>();
                if (user == null)
                {throw new NotRegisteredUser();}
                return user.name;
            }
            catch (NotRegisteredUser)
            {
                throw new NotRegisteredUser();
            }
            catch
            {
                throw new NoInternet();
            }
        }
        private User getUser(string email)
        {
            email = email.ToLower();
            try
            {
                var result = client.GetAsync("User/" + HashingService.GenerateHash(email));

                User user = result.Result.ResultAs<User>();
                if (user == null)
                {
                    throw new NotRegisteredUser();
                }
                return user;
            }
            catch (NotRegisteredUser)
            {
                throw new NotRegisteredUser();
            }
            catch
            {
                throw new NoInternet();
            }
        }
        public string OfferRide(Ride ride)
        {
            Guid rideId = Guid.NewGuid();
            string rideIdHash = HashingService.GenerateHash(rideId.ToString());
            ride.RideId = rideIdHash;
            ride.riderName = getName(ride.riderEmail);
            client.SetAsync("Ride/" +rideIdHash , ride);
            return rideIdHash;
        }
        public Dictionary<string, Ride> ListofRides()
        {
            var result = client.GetAsync("Ride/");
            Dictionary<string, Ride> rides = JsonConvert.DeserializeObject<Dictionary<string, Ride>>(result.Result.Body.ToString());
            return rides;
        }
        public List<Ride> FilterRides(string date, string time, string start, string destination)
        {
            var rides = ListofRides();
            List<Ride> filteredRides = new();
            var search = start;
            var found = false;
            foreach (var k in rides.Keys)
            {
                if (rides[k].date != date || rides[k].time != time || rides[k].availableSeats==0)
                    continue;
                if (rides[k].startLocation == search)
                {
                    search = destination;
                }
                if (rides[k].stops != null)
                {
                    foreach (var stop in rides[k].stops)
                    {
                        if (stop == search)
                        {
                            if (search == destination)
                            {
                                found = true;
                                break;
                            }
                            else
                            {
                                search = destination;
                            }
                        }
                    }
                    if (destination == search && destination == rides[k].destination)
                        found = true;
                }

                if (found == true)
                {
                    rides[k].RideId=k;
                    filteredRides.Add(rides[k]);
                }
            }
            return filteredRides;
        }
        private bool AddPassenger(string rideId, string passengerId)
        {
            var result = client.GetAsync("Ride/" + rideId);
            Ride ride = result.Result.ResultAs<Ride>();
            if (ride==null)
                { return false; }
            if(ride.passengers==null)
            {
                ride.passengers = new List<string>();
            }
            if (ride.availableSeats>0)
            {
                ride.availableSeats -= 1;
                ride.passengers.Add(passengerId);
                client.SetAsync("Ride/" + rideId, ride);
                return true;
            }
            return false;
        }
        private bool UpdateUserOfferRides( string rideId)
        {
            var result1 = client.GetAsync("Ride/" + rideId);
            var ride = result1.Result.ResultAs<Ride>();
            var userId = HashingService.GenerateHash(ride.riderEmail);
            var result = client.GetAsync("User/" + userId);
            User user = result.Result.ResultAs<User>();
            if(user.offeredRides==null)
            {
                user.offeredRides = new List<string>();
            }
            user.offeredRides.Add(rideId);
            client.SetAsync("User/" + userId, user);
            return true;
        }
        private bool UpdateUserBookRides(string userId,string rideId)
        {

            var result = client.GetAsync("User/" + userId);
            User user = result.Result.ResultAs<User>();
            if(user==null)
            {
                return false;
            }
            if(user.bookedRides==null)
            {
                user.bookedRides = new List<string>();
            }
            user.bookedRides.Add(rideId);
            client.SetAsync("User/" + userId, user);
            return true;
        }
        public bool BookRide(string userId, string rideId)
        {
            if(AddPassenger(rideId,userId))
            {
                if(UpdateUserBookRides(userId,rideId) & UpdateUserOfferRides(rideId))
                {
                    return true;
                }
                return false;
            }
            else
            {
                return false;
            }
        }

        public List<HistoryRideDetails> GetOfferedRides(string userId)
        {
            var result = client.GetAsync("User/"+HashingService.GenerateHash(userId));
            var user = result.Result.ResultAs<User>();
            List<HistoryRideDetails> userOfferRides = new();
            if(user==null)
            {
                return userOfferRides;
            }
            if(user.offeredRides==null)
            {
                return userOfferRides;
            }
            foreach(var rideId in user.offeredRides)
            {
                var ride = client.Get("Ride/" + rideId).ResultAs<Ride>();
                var offeredRide = mapper.Map<HistoryRideDetails>(ride);
                foreach (var passengerId in ride.passengers)
                {
                    offeredRide.name = getNameViaId(passengerId);
                    offeredRide.riderEmail = passengerId;
                    userOfferRides.Add(offeredRide);
                }
            }
            return userOfferRides;
        }

        public List<HistoryRideDetails> GetBookedRides(string userId)
        {
            var result = client.GetAsync("User/" + HashingService.GenerateHash(userId));
            var user = result.Result.ResultAs<User>();
            List<HistoryRideDetails> userBookedRides = new();
            if (user.bookedRides == null)
                return userBookedRides;
            foreach (var rideId in user.bookedRides)
            {
                var ride = client.Get("Ride/" + rideId).ResultAs<Ride>();
                var offeredRide = mapper.Map<HistoryRideDetails>(ride);
                offeredRide.name=getName(ride.riderEmail);
                userBookedRides.Add(offeredRide);
            }
            return userBookedRides;
        }
        public UserDto GetUserDetails(string userId)
        {
            var result = client.GetAsync("User/" + HashingService.GenerateHash(userId));
            var user = result.Result.ResultAs<UserDto>();
            return user;
        }

    }
}
