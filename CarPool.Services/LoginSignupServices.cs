using CarPool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using CarPool.Models.Exceptions;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace CarPool.Services
{
    public class LoginSignupServices : ILoginSignupServices
    {
        public AppDbContext db;
        FirebaseClient client;
        /*ILoginSignupServices services;*/
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "Y81J2Yp7hFKfenTCx8rSobzeJzAZzTz2kdJLJ1Lf",
            BasePath = "https://car-pool-e077d-default-rtdb.firebaseio.com/"
        };
        public LoginSignupServices(AppDbContext _db)
        {
            client = new FirebaseClient(config);
            db = _db;
        }
        private string GenerateHash(string value)
        {
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(value));
            var sb = new StringBuilder();
            for (int i=0;i<bytes.Length;i++)
            {
                sb.Append(bytes[i].ToString("x2"));
            }
            return sb.ToString();
        }
        public bool SignUp(string email, string password)
        {
            try
            {
                FindUser(GenerateHash(email));
                throw new EmailAlreadyRegistered();
            }
            catch (NotRegisteredUser)
            {
            }
            catch { return false; }
            User user = new User()
            {
                emailId =email,
                password = BCrypt.Net.BCrypt.HashPassword(password),
                offeredRides=new List<string>(),
                bookedRides=new List<string>()
            };
            client.SetAsync("User/" + GenerateHash(email), user);
            return true;
        }

        User FindUser(string email)
        {
            User user;
            //var user = db.UserDetails.SingleOrDefault(m => m.emailId == email);
            var result = client.GetAsync("User/" + email);
            try
            {
                user = result.Result.ResultAs<User>();
            }
            catch
            { throw new NotRegisteredUser(); }
            if (user == null)
                {
                    throw new NotRegisteredUser();
                }
                return user;
        }
        public bool Login(string email, string password)
        {
            string x = GenerateHash(email);
            User user = FindUser(x);
            if (BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                return true;
            }
            return false;
        }
    }
}