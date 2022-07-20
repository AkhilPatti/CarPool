
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using CarPool.Services;
using Microsoft.Extensions.Configuration;
using CarPool.Models;
using MySql.Data.MySqlClient;

namespace CarPool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private ILoginSignupServices service;
        //private readonly IConfiguration configuration;

        public SignUpController(ILoginSignupServices _service)
        {
            service = _service;
        }
        [HttpPost]
        public ActionResult<string> Post(User user)
        {
            try
            {
                /*var result = client.GetAsync("User/"+user.emailId);
                User currentUser = result.Result.ResultAs<User>();
                if (currentUser != null)
                { return "Email already Registered"; }
                var setter = client.SetAsync("User/" + user.emailId, user);*/
                if (service.SignUp(user.emailId, user.password))
                {
                    return Ok("Registered Successfully");
                }
                else { return BadRequest("Email Already Registered"); }
            }
            catch
            {
                return BadRequest("Check your Internet Connectivity"); 
            }

        }
    }
}
