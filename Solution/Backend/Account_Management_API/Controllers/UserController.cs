using Account_Management_API.Models;
using Account_Management_API.Util;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Account_Management_API.Controllers
{
    public class UserController : ApiController
    {

        
        private User CheckUserExists(string id, string username)
        {
            var _user = new User();
            string query = @"select * from dbo.Users
                             where IDNumber = '" + id + "' and UserName = '"+ username +"'";

            DataTable tbl = new DataTable();

            using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            using (var _cmd = new SqlCommand(query, _con))
            using (var _ad = new SqlDataAdapter(_cmd))
            {
                _cmd.CommandType = CommandType.Text;
                _ad.Fill(tbl);
                _con.Close();
                _user = (from table in tbl.AsEnumerable()
                         select new User
                         {
                             UserID = (long)table["UserID"],
                             IDNumber = (string)table["IDNumber"],
                             FirstName = (string)table["FirstName"],
                             LastName = (string)table["LastName"],
                             MobileNumber = (string)table["MobileNumber"],
                             EmailAddress = (string)table["EmailAddress"]
                         }).FirstOrDefault();
            }

            return _user;

        }
        private User LoginUser(string username)
        {
            var _user = new User();
            string query = @"select * from dbo.Users
                             where UserName = '" + username + "'";

            DataTable tbl = new DataTable();

            using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            using (var _cmd = new SqlCommand(query, _con))
            using (var _ad = new SqlDataAdapter(_cmd))
            {
                _cmd.CommandType = CommandType.Text;
                _ad.Fill(tbl);
                _con.Close();
                _user = (from table in tbl.AsEnumerable()
                         select new User
                         {
                             UserID = (long)table["UserID"],
                             IDNumber = (string)table["IDNumber"],
                             FirstName = (string)table["FirstName"],
                             LastName = (string)table["LastName"],
                             MobileNumber = (string)table["MobileNumber"],
                             EmailAddress = (string)table["EmailAddress"],
                             Password = (string)table["Password"],
                             isAdmin = (bool)table["isAdmin"],
                             UserName = (string)table["UserName"]
                         }).FirstOrDefault();
            }

            return _user;

        }

        [Route("api/User/Register")]
        [HttpPost]
        public string Register(User user) {

            try
            {
                var _user = CheckUserExists(user.IDNumber,user.UserName);

                if (_user == null)
                {
                    var encryptedPassword = Cipher.Encrypt(user.Password);
                    string query = @"insert into dbo.Users values
                                ('" + user.IDNumber + "','" + user.FirstName + "','" + user.LastName + "','" + user.MobileNumber + "','" + user.EmailAddress + "','" + encryptedPassword + "','" + user.isAdmin + "','" + user.UserName + "')";

                    DataTable tbl = new DataTable();

                    using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                    using (var _cmd = new SqlCommand(query, _con))
                    using (var _ad = new SqlDataAdapter(_cmd))
                    {
                        _cmd.CommandType = CommandType.Text;
                        _ad.Fill(tbl);
                    }

                    return "Saved user successfully...";
                }
                else
                {
                    return "User already exist...";
                }
            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }

        [Route("api/User/Login")]
        [HttpPost]
        public string Login(UserLogin loginUser)
        {

            try
            {
                var _user = LoginUser(loginUser.UserName);

                if (_user == null)
                {

                    return "User does not exist...";
                }
                else
                {
                    var _password = Cipher.Encrypt(loginUser.Password);

                    if (_user.Password == _password)
                    {
                        return "Password correct";
                    }
                    else {
                        return "Password incorrect";
                    }
                }
            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }
    }
}
