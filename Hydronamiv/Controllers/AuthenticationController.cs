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
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IPasswordHasher<UserModel> _passwordHasher;

        public AuthenticationController(IConfiguration configuration, IPasswordHasher<UserModel> passwordHasher)
        {
            _config = configuration;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("[action]")]
        public string Authenticate([FromBody] LoginModel login)
        {
            string token = null;

            var user = _config.GetSection("Users").Get<List<UserModel>>().AsEnumerable()
                .FirstOrDefault(x => x.Username == login.Username);

            if (user == null || user.Expired < DateTime.Now)  // to do
            {
                return null;
            }

            var hashedPassword = user.Password;

            var result = _passwordHasher.VerifyHashedPassword(user, hashedPassword, login.Password);

            if (result == PasswordVerificationResult.Success)
            {
                token = CreateToken();

               SaveToken("token", token);
            }

            return token;
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

        [HttpGet]
        public IActionResult HashPassword(string password)
        {
            var hashedPassword = _passwordHasher.HashPassword(null, password);
            return Json(hashedPassword);
        }
    }
}