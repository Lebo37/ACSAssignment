using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Account_Management_API.Models
{
    public class Customer
    {
        public long CustomerID { get; set; }
        public string IDNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailAddress { get; set; }
    }
}