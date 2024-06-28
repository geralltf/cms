using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text.Json.Serialization; // installed through nuget. Found by searching "System.Data.SqlClient" in nuget package manager.

namespace CMS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerActionBase
    {
        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ILogger<CompanyController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostCompany")]
        public bool Post(Company company)
        {
            int recordAffectedCount = -1;

            string insertQuery = "INSERT INTO [dbo].[Companies] ([CompanyName], [CompanyDescription], [CompanyABN], [CompanyPhoneNumber]) "
                + "VALUES (@CompanyName, @CompanyDescription, @CompanyABN, @CompanyPhoneNumber)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@CompanyName", company.CompanyName);
                command.Parameters.AddWithValue("@CompanyDescription", company.CompanyDescription);
                command.Parameters.AddWithValue("@CompanyABN", company.CompanyABN);
                command.Parameters.AddWithValue("@CompanyPhoneNumber", company.CompanyPhoneNumber);

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

        [HttpPut(Name = "PutCompany")]
        public bool Put(Company company)
        {
            int recordAffectedCount = -1;

            string insertQuery = "UPDATE [dbo].[Companies] SET [CompanyName] = @CompanyName, [CompanyDescription] = @CompanyDescription, [CompanyABN] = @CompanyABN, [CompanyPhoneNumber] = @CompanyPhoneNumber WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", company.ID);
                command.Parameters.AddWithValue("@CompanyName", company.CompanyName);
                command.Parameters.AddWithValue("@CompanyDescription", company.CompanyDescription);
                command.Parameters.AddWithValue("@CompanyABN", company.CompanyABN);
                command.Parameters.AddWithValue("@CompanyPhoneNumber", company.CompanyPhoneNumber);

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

        [HttpDelete(Name = "DeleteCompany")]
        public bool Delete(Company company)
        {
            int recordAffectedCount = -1;

            string insertQuery = "DELETE FROM [dbo].[Companies] WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", company.ID);

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

        [HttpGet(Name = "GetCompany")]
        public IEnumerable<Company> Get()
        {
            List<Company> result = new List<Company>(); 
            string queryString = "SELECT [ID], [CompanyName], [CompanyDescription], [CompanyABN], [CompanyPhoneNumber] FROM [cms].[dbo].[Companies]";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                //command.Parameters.AddWithValue("@tPatSName", "Your-Parm-Value");
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        Company company = new Company();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        company.ID = id;

                        company.CompanyName = reader["CompanyName"].ToString();
                        company.CompanyDescription = reader["CompanyDescription"].ToString();
                        company.CompanyABN = reader["CompanyABN"].ToString();
                        company.CompanyPhoneNumber = reader["CompanyPhoneNumber"].ToString();

                        result.Add(company);
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
