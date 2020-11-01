using Account_Management_API.Models;
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
    public class CustomerController : ApiController
    {
        [Route("api/Customer/GetAll")]
        [HttpGet]
        public List<Customer> GetAll()
        {
            var _cust = new List<Customer>();
            string query = @"select * from dbo.Customer";

            DataTable tbl = new DataTable();

            using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            using (var _cmd = new SqlCommand(query, _con))
            using (var _ad = new SqlDataAdapter(_cmd))
            {
                _cmd.CommandType = CommandType.Text;
                _ad.Fill(tbl);
                _con.Close();

                _cust = ( from table in tbl.AsEnumerable()
                           select new Customer
                            {
                                CustomerID = (long)table["CustomerID"],
                                IDNumber = (string)table["IDNumber"],
                                FirstName = (string)table["FirstName"],
                                LastName = (string)table["LastName"],
                                MobileNumber = (string)table["MobileNumber"],
                                EmailAddress = (string)table["EmailAddress"]
                           }).ToList();
            }

            return _cust;
        }

        [Route("api/Customer/GetCustomer")]
        [HttpGet]
        public Customer GetCustomer(long id)
        {
                var _cust = new Customer();
                string query = @"select * from dbo.Customer
                             where CustomerID = '" + id + "'";

                DataTable tbl = new DataTable();

                using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                using (var _cmd = new SqlCommand(query, _con))
                using (var _ad = new SqlDataAdapter(_cmd))
                {
                    _cmd.CommandType = CommandType.Text;
                    _ad.Fill(tbl);
                    _con.Close();
                    _cust = (from table in tbl.AsEnumerable()
                             select new Customer
                             {
                                 CustomerID = (long)table["CustomerID"],
                                 IDNumber = (string)table["IDNumber"],
                                 FirstName = (string)table["FirstName"],
                                 LastName = (string)table["LastName"],
                                 MobileNumber = (string)table["MobileNumber"],
                                 EmailAddress = (string)table["EmailAddress"]
                             }).FirstOrDefault();
                }

                return _cust;
            
        }

        [Route("api/Customer/GetCustomerById")]
        [HttpGet]
        public Customer GetCustomerById(string id)
        {
            var _cust = new Customer();
            string query = @"select * from dbo.Customer
                             where IDNumber = '" + id + "'";

            DataTable tbl = new DataTable();

            using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            using (var _cmd = new SqlCommand(query, _con))
            using (var _ad = new SqlDataAdapter(_cmd))
            {
                _cmd.CommandType = CommandType.Text;
                _ad.Fill(tbl);
                _con.Close();
                _cust = (from table in tbl.AsEnumerable()
                         select new Customer
                         {
                             CustomerID = (long)table["CustomerID"],
                             IDNumber = (string)table["IDNumber"],
                             FirstName = (string)table["FirstName"],
                             LastName = (string)table["LastName"],
                             MobileNumber = (string)table["MobileNumber"],
                             EmailAddress = (string)table["EmailAddress"]
                         }).FirstOrDefault();
            }

            return _cust;

        }

        [Route("api/Customer/SaveCustomer")]
        [HttpPost]
        public string SaveCustomer(Customer customer)
        {
            try
            {
                var user = GetCustomerById(customer.IDNumber);

                if (user == null)
                {
                    string query = @"insert into dbo.Customer values
                                ('" + customer.IDNumber + "','" + customer.FirstName + "','" + customer.LastName + "','" + customer.MobileNumber + "','" + customer.EmailAddress + "')";

                    DataTable tbl = new DataTable();

                    using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                    using (var _cmd = new SqlCommand(query, _con))
                    using (var _ad = new SqlDataAdapter(_cmd))
                    {
                        _cmd.CommandType = CommandType.Text;
                        _ad.Fill(tbl);
                    }

                    return "Saved customer successfully...";
                }
                else
                {
                    return "Customer with the ID Number already exist...";
                }
            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }
        [Route("api/Customer/UpdateCustomer")]
        [HttpPut]
        public string UpdateCustomer(Customer customer)
        {
            try
            {

                var user = GetCustomerById(customer.IDNumber);

                if (user == null)
                {
                    return "Customer does not exist...";
                }
                else
                {
                    string query = @"update dbo.Customer
                                set IDNumber = '" + customer.IDNumber + "', " +
                                "FirstName = '" + customer.FirstName + "', " +
                                "LastName = '" + customer.LastName + "', " +
                                "MobileNumber = '" + customer.MobileNumber + "', " +
                                "EmailAddress = '" + customer.EmailAddress + "'" +
                                "where CustomerID = '" + customer.CustomerID + "'";

                    DataTable tbl = new DataTable();

                    using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                    using (var _cmd = new SqlCommand(query, _con))
                    using (var _ad = new SqlDataAdapter(_cmd))
                    {
                        _cmd.CommandType = CommandType.Text;
                        _ad.Fill(tbl);
                    }

                    return "Updated customer successfully...";
                }

                
            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }

        [Route("api/Customer/DeleteCustomer")]
        [HttpDelete]
        public string DeleteCustomer(string id)
        {
            try
            {

                var user = GetCustomerById(id);

                if (user == null)
                {
                    return "Customer does not exist...";
                }
                else
                {
                    string query = @"delete dbo.Customer" +
                                   " where IDNumber = '" + id + "'";

                    DataTable tbl = new DataTable();

                    using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                    using (var _cmd = new SqlCommand(query, _con))
                    using (var _ad = new SqlDataAdapter(_cmd))
                    {
                        _cmd.CommandType = CommandType.Text;
                        _ad.Fill(tbl);
                    }

                    return "Removed customer successfully...";
                }


            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }

        [Route("api/Customer/DeleteCustomerById")]
        [HttpDelete]
        public string DeleteCustomerById(string id)
        {
            try
            {

                var user = GetCustomerById(id);

                if (user == null)
                {
                    return "Customer does not exist...";
                }
                else
                {
                    string query = @"delete dbo.Customer" +
                                   " where IDNumber = '" + id + "'";

                    DataTable tbl = new DataTable();

                    using (var _con = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                    using (var _cmd = new SqlCommand(query, _con))
                    using (var _ad = new SqlDataAdapter(_cmd))
                    {
                        _cmd.CommandType = CommandType.Text;
                        _ad.Fill(tbl);
                    }

                    return "Removed customer successfully...";
                }


            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }
    }
}
