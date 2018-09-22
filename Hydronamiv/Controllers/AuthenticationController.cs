using Hydronamiv.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace Hydronamiv.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IPasswordHasher<UserModel> _passwordHasher;

        public AuthenticationController(IConfiguration configuration, IPasswordHasher<UserModel> passwordHasher)
        {
            _config = configuration;
            _passwordHasher = passwordHasher;
        }

        [HttpPost] // Matches '/api/Authentication/LogIn'
        public ActionResult<string> LogIn([FromBody] LoginModel login)
        {
            string token = null;

            var user = _config.GetSection("Users").Get<List<UserModel>>().AsEnumerable()
                .FirstOrDefault(x => x.Username == login.Username);

            if (user == null)
            {
                return NotFound();  // 404
            }

            if (user.Expired < DateTime.Now)  // to do
            {
                return Forbid();    // 403
            }

            var hashedPassword = user.Password;

            var result = _passwordHasher.VerifyHashedPassword(user, hashedPassword, login.Password);

            if (result == PasswordVerificationResult.Success)
            {
                token = CreateToken();

               SaveToken("token", token);

                return token;
            }

            return Unauthorized();
        }

        private void SaveToken(string key, string value, int expireTime = 1)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(expireTime)
            };

            Response.Cookies.Append(key, value, cookieOptions);
        }

        private string CreateToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(1), signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpGet("{password}")] // Matches '/api/Authentication/HashPassword/password'
        public ActionResult<string> HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }


        [HttpGet]   // Matches '/api/Authentication/GetUtcTime'
        public ActionResult<string> GetUtcTime()
        {
            return DateTime.Now.ToUniversalTime().ToString();
        }

        [HttpGet]   // Matches '/api/Authentication/GetServerLocalTime'
        public ActionResult<string> GetServerLocalTime()
        {
            return DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString();
        }
    }
}