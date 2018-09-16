using System;

namespace Hydronamiv.Models
{
    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime Expired { get; set; }
    }
}
