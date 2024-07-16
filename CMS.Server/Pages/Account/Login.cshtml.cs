using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using CMS.Server.Model;
using CMS.Server;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
//using Microsoft.AspNet.Identity;

namespace AuthorizationSample.Pages.Account
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; private set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string ConfirmedPassword { get; set; }

            [Required]
            [DataType(DataType.Text)]
            public string IsRegister { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            // Clear the existing external cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;

            if (ModelState.IsValid)
            {
                if(Input.IsRegister == "LOGIN")
                {
                    var user = await AuthenticateUser(Input.Email, Input.Password);

                    if (user == null)
                    {
                        ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                        return Page();
                    }

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim("FullName", user.FullName)
                    };

                    IEnumerable<string> userRoles = GetRolesByUserEmail(user.Email);
                    foreach (string roleName in userRoles)
                    {
                        Claim cl = new Claim(ClaimTypes.Role, roleName);
                        claims.Add(cl);
                    }


                    var claimsIdentity = new ClaimsIdentity(
                        claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity));

                    return LocalRedirect(Url.GetLocalUrl(returnUrl));
                }
                else if(Input.IsRegister == "REGISTER")
                {
                    var user = await RegisterUser(Input.Email, Input.Password, Input.ConfirmedPassword);

                    if (user == null)
                    {
                        ModelState.AddModelError(string.Empty, "Account invalid.");
                        return Page();
                    }

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim("FullName", user.FullName)
                    };

                    IEnumerable<string> userRoles = GetRolesByUserEmail(user.Email);
                    foreach (string roleName in userRoles)
                    {
                        Claim cl = new Claim(ClaimTypes.Role, roleName);
                        claims.Add(cl);
                    }


                    var claimsIdentity = new ClaimsIdentity(
                        claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity));

                    return LocalRedirect(Url.GetLocalUrl(returnUrl));
                }
            }

            // Something failed. Redisplay the form.
            return Page();
        }

        private IEnumerable<string> GetRolesByUserEmail(string emailAddress)
        {
            List<string> results =  new List<string>();
            string queryString = "SELECT [UserRoles].[ID] as [ID], [UserRoles].[UserID] as [UserID], [UserRoles].[Role] as [RoleName] FROM [dbo].[UserRoles] INNER JOIN Users ON UserRoles.UserID = Users.ID WHERE Users.EmailAddress = @EmailAddress";
            using (SqlConnection connection = new SqlConnection(ControllerActionBase.connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Parameters.AddWithValue("@EmailAddress", emailAddress);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        string role = reader["RoleName"].ToString();
                        results.Add(role);
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            return results;
        }

        private async Task<ApplicationUser> AuthenticateUser(string email, string password)
        {
            // For demonstration purposes, authenticate a user
            // with a static email address. Ignore the password.
            // Assume that checking the database takes 500ms

            //await Task.Delay(500);

            //if (string.Equals(email, "geralltf@gmail.com", StringComparison.OrdinalIgnoreCase) && (password == "test" || password == "testuser"))
            //{
            //    return new ApplicationUser()
            //    {
            //        Email = "geralltf@gmail.com",
            //        FullName = "Gerallt Franke"
            //    };
            //}
            //else
            //{
            //    return null;
            //}

            string salt = string.Empty;

            string queryString = "SELECT TOP(1) [ID], [UserName], [EmailAddress], [Password], [Salt], [Is2FAEnabled], [ProfileURL] FROM [cms].[dbo].[Users] WHERE EmailAddress = @EmailAddress";
            using (SqlConnection connection = new SqlConnection(ControllerActionBase.connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Parameters.AddWithValue("@EmailAddress", email);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        salt =  reader["Salt"].ToString();
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }

            // Get the generated 128-bit salt which is from a sequence of cryptographically strong random bytes.

            //byte[] saltBytes = System.Text.UTF8Encoding.UTF8.GetBytes(salt);
            byte[] saltBytes = Convert.FromBase64String(salt);

            // Derive a 256-bit subkey. (use HMACSHA256 with 100,000 iterations).
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            queryString = "SELECT TOP(1) [ID], [UserName], [EmailAddress], [Password], [Is2FAEnabled], [ProfileURL] FROM [cms].[dbo].[Users] WHERE EmailAddress = @EmailAddress AND Password = @Password";
            using (SqlConnection connection = new SqlConnection(ControllerActionBase.connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Parameters.AddWithValue("@EmailAddress", email);
                command.Parameters.AddWithValue("@Password", hashedPassword);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        string UserName = reader["UserName"].ToString();
                        string Email = reader["EmailAddress"].ToString();
                        return new ApplicationUser()
                        {
                            Email = Email,
                            FullName = UserName
                        };
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
                return null;
            }
        }

        private async Task<ApplicationUser> RegisterUser(string email, string password, string confirmedPassword)
        {
            //await Task.Delay(500);

            //if (string.Equals(email, "geralltf@gmail.com", StringComparison.OrdinalIgnoreCase) && (password == "test" || password == "testuser") && password == confirmedPassword)
            //{
            //    return new ApplicationUser()
            //    {
            //        Email = "geralltf@gmail.com",
            //        FullName = "Gerallt Franke"
            //    };
            //}
            //else
            //{
            //    return null;
            //}
            bool userAlreadyExists = false;

            string queryStringExistingAcc = "SELECT TOP(1) [ID], [UserName], [EmailAddress], [Password], [Is2FAEnabled], [ProfileURL] FROM [cms].[dbo].[Users] WHERE EmailAddress = @EmailAddress";
            using (SqlConnection connection = new SqlConnection(ControllerActionBase.connectionString))
            {
                SqlCommand command = new SqlCommand(queryStringExistingAcc, connection);
                command.Parameters.AddWithValue("@EmailAddress", email);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        string UserName = reader["UserName"].ToString();
                        string Email = reader["EmailAddress"].ToString();

                        if(Email == email)
                        {
                            userAlreadyExists = true;
                            return null;
                        }
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }

            // Generate a 128-bit salt using a sequence of cryptographically strong random bytes.
            byte[] saltBytes = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
            //Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            // Derive a 256-bit subkey. (use HMACSHA256 with 100,000 iterations).
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            //string salt  = System.Text.UTF8Encoding.UTF8.GetString(saltBytes);
            string salt = Convert.ToBase64String(saltBytes);

            string queryString = "INSERT INTO [dbo].[Users] ([UserName], [EmailAddress], [Password], [Is2FAEnabled], [ProfileURL], [Salt]) VALUES (@UserName, @EmailAddress, @Password, @Is2FAEnabled, @ProfileURL, @Salt)";

            using (SqlConnection connection = new SqlConnection(ControllerActionBase.connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command.Parameters.AddWithValue("@UserName", email);
                command.Parameters.AddWithValue("@EmailAddress", email);
                command.Parameters.AddWithValue("@Password", hashedPassword);
                command.Parameters.AddWithValue("@Is2FAEnabled", false);
                command.Parameters.AddWithValue("@ProfileURL", "");
                command.Parameters.AddWithValue("@Salt", salt);

                connection.Open();
                int numRowsAffected = command.ExecuteNonQuery();

                if (numRowsAffected > 0)
                {
                    string Email = email;
                    return new ApplicationUser()
                    {
                        Email = Email,
                        FullName = ""
                    };
                }

                return null;
            }
        }
    }
}
