using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Account_Management_API.Models
{
    public class User
    {
        public long UserID { get; set; }
        public string IDNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public bool isAdmin { get; set; }
        public string UserName { get; set; }
    }
}