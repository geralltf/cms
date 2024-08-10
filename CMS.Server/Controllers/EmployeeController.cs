using CMS.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text.Json.Serialization; // installed through nuget. Found by searching "System.Data.SqlClient" in nuget package manager.

namespace CMS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Administrators,Finance")]
    public class EmployeeController : ControllerActionBase
    {
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostEmployee")]
        public bool Post(Employee employee)
        {
            DateTime? dateTimeDOB = null;

            if (employee.DOB != null)
            {
                dateTimeDOB = new DateTime(employee.DOB.Value.Year, employee.DOB.Value.Month, employee.DOB.Value.Day);
            }

            int recordAffectedCount = -1;

            string insertQueryDOB = string.Empty;
            string insertQueryDOBParam = string.Empty;
            if(dateTimeDOB!= null)
            {
                insertQueryDOB = "[DOB],";
                insertQueryDOBParam = "@DOB,";
            }
            string insertQuery = "INSERT INTO [dbo].[Employees] ([EmployeeFirstName],[EmployeeMidleName],[EmployeeLastName],[StreetAddress],[Suburb],[City],[State],[Country],[Postcode],[Email],"+ insertQueryDOB + "[Gender],[TFN],[ABN]) "
                + "VALUES (@EmployeeFirstName, @EmployeeMidleName, @EmployeeLastName, @StreetAddress, @Suburb, @City, @State, @Country, @Postcode, @Email, "+ insertQueryDOBParam + " @Gender, @TFN, @ABN)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@EmployeeFirstName", employee.FirstName);
                command.Parameters.AddWithValue("@EmployeeMidleName", employee.MiddleName);
                command.Parameters.AddWithValue("@EmployeeLastName", employee.LastName);
                command.Parameters.AddWithValue("@StreetAddress", employee.StreetAddress);
                command.Parameters.AddWithValue("@Suburb", employee.Suburb);
                command.Parameters.AddWithValue("@City", employee.City);
                command.Parameters.AddWithValue("@State", employee.State);
                command.Parameters.AddWithValue("@Country", employee.Country);
                command.Parameters.AddWithValue("@Postcode", employee.Postcode);
                command.Parameters.AddWithValue("@Email", employee.Email);
                if(dateTimeDOB != null)
                {
                    command.Parameters.AddWithValue("@DOB", dateTimeDOB);
                }
                command.Parameters.AddWithValue("@Gender", employee.Gender);
                command.Parameters.AddWithValue("@TFN", employee.TFN);
                command.Parameters.AddWithValue("@ABN", employee.ABN);

                try
                {
                    connection.Open();
                    recordAffectedCount = command.ExecuteNonQuery();
                }
                finally
                {
                    connection.Close();
                }
            }

            return recordAffectedCount > 0;
        }

        [HttpPut(Name = "PutEmployee")]
        public bool Put(Employee employee)
        {
            int recordAffectedCount = -1;

            string updateQuery = string.Empty;
            string updateQueryDOB = string.Empty;

            if (employee.DOB != null)
            {
                updateQueryDOB = "[DOB] = @DOB,";
            }
            updateQuery = "UPDATE [dbo].[Employees] SET [EmployeeFirstName] = @EmployeeFirstName,[EmployeeMidleName] = @EmployeeMidleName, [EmployeeLastName] = @EmployeeLastName, [StreetAddress] = @StreetAddress, [Suburb] = @Suburb, [City] = @City, [State] = @State, [Country] = @Country, [Postcode] = @Postcode, [Email] = @Email, " + updateQueryDOB + " [Gender] = @Gender, [TFN] = @TFN, [ABN] = @ABN WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateQuery, connection);
                command.Parameters.AddWithValue("@ID", employee.ID);
                command.Parameters.AddWithValue("@EmployeeFirstName", employee.FirstName);
                command.Parameters.AddWithValue("@EmployeeMidleName", employee.MiddleName);
                command.Parameters.AddWithValue("@EmployeeLastName", employee.LastName);
                command.Parameters.AddWithValue("@StreetAddress", employee.StreetAddress);
                command.Parameters.AddWithValue("@Suburb", employee.Suburb);
                command.Parameters.AddWithValue("@City", employee.City);
                command.Parameters.AddWithValue("@State", employee.State);
                command.Parameters.AddWithValue("@Country", employee.Country);
                command.Parameters.AddWithValue("@Postcode", employee.Postcode);
                command.Parameters.AddWithValue("@Email", employee.Email);
                if(employee.DOB!= null)
                {
                    DateTime dtDOB = new DateTime(employee.DOB.Value.Year, employee.DOB.Value.Month, employee.DOB.Value.Day);
                    command.Parameters.AddWithValue("@DOB", dtDOB);
                }
                command.Parameters.AddWithValue("@Gender", employee.Gender);
                command.Parameters.AddWithValue("@TFN", employee.TFN);
                command.Parameters.AddWithValue("@ABN", employee.ABN);
                try
                {
                    connection.Open();
                    recordAffectedCount = command.ExecuteNonQuery();
                }
                finally
                {
                    connection.Close();
                }
            }

            return recordAffectedCount > 0;
        }

        [HttpDelete(Name = "DeleteEmployee")]
        public bool Delete(Employee employee)
        {
            int recordAffectedCount = -1;

            string insertQuery = "DELETE FROM [dbo].[Employees] WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", employee.ID);

                try
                {
                    connection.Open();
                    recordAffectedCount = command.ExecuteNonQuery();
                }
                finally
                {
                    connection.Close();
                }
            }

            return recordAffectedCount > 0;
        }

        [HttpGet(Name = "GetEmployee")]
        public IEnumerable<Employee> Get()
        {
            List<Employee> result = new List<Employee>(); 
            string queryString = "SELECT [ID], [EmployeeFirstName],[EmployeeMidleName],[EmployeeLastName],[StreetAddress],[Suburb],[City],[State],[Country],[Postcode],[Email],[DOB],[Gender],[TFN],[ABN] FROM [cms].[dbo].[Employees]\r\n";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        Employee employee = new Employee();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        employee.ID = id;

                        employee.FirstName = reader["EmployeeFirstName"].ToString();
                        employee.MiddleName = reader["EmployeeMidleName"].ToString();
                        employee.LastName = reader["EmployeeLastName"].ToString();
                        employee.StreetAddress = reader["StreetAddress"].ToString();
                        employee.Suburb = reader["Suburb"].ToString();
                        employee.City = reader["City"].ToString();
                        employee.State = reader["State"].ToString();
                        employee.Country = reader["Country"].ToString();
                        employee.Postcode = reader["Postcode"].ToString();
                        employee.Email = reader["Email"].ToString();

                        DateOnly dob;
                        DateOnly.TryParse(reader["DOB"].ToString(), out dob);
                        employee.DOB = dob;

                        employee.Gender = reader["Gender"].ToString();
                        employee.TFN = reader["TFN"].ToString();
                        employee.ABN = reader["ABN"].ToString();

                        result.Add(employee);
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }

            return result;
        }
    }
}
