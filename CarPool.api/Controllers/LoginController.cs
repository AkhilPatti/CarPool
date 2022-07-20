using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using System.Threading.Tasks;
using CarPool.Services;
using CarPool.Models;

namespace CarPool.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginSignupServices services;
        private FirebaseClient client;
        IFirebaseConfig config = new FirebaseConfig()
        {
            AuthSecret = "Y81J2Yp7hFKfenTCx8rSobzeJzAZzTz2kdJLJ1Lf",
            BasePath= "https://car-pool-e077d-default-rtdb.firebaseio.com/"
        };
        public LoginController(ILoginSignupServices _services)
        {
            services = _services;
            client = new FirebaseClient(config);
        }

        [HttpGet]
        public ActionResult<string> Login(string emailId,string password)
        {
            try
            {
                if(services.Login(emailId,password))
                {
                    return Ok("Welcome");
                }
                return BadRequest("Invalid EmailId or Password");
            }
            catch
            {
                return BadRequest("Invalid emailId or Password");
            }
        }
    }
}
