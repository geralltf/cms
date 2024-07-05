using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;
using System.Text.Json.Serialization; // installed through nuget. Found by searching "System.Data.SqlClient" in nuget package manager.

namespace CMS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize(Roles = "Administrators")]
    [Authorize]
    public class CategoryController : ControllerActionBase
    {
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ILogger<CategoryController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostCategory")]
        public bool Post(Category category)
        {
            int recordAffectedCount = -1;

            string insertQuery = "INSERT INTO [dbo].[Categories] ([CategoryID], [CategoryName], [CategoryDescription]) "
                + "VALUES (@CategoryID, @CategoryName, @CategoryDescription)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@CategoryID", category.CategoryID);
                command.Parameters.AddWithValue("@CategoryName", category.CategoryName);
                command.Parameters.AddWithValue("@CategoryDescription", category.CategoryDescription);

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

        [HttpPut(Name = "PutCategory")]
        public bool Put(Category category)
        {
            int recordAffectedCount = -1;

            string insertQuery = "UPDATE [dbo].[Categories] SET [CategoryID] = @CategoryID, [CategoryName] = @CategoryName, [CategoryDescription] = @CategoryDescription WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", category.ID);
                command.Parameters.AddWithValue("@CategoryID", category.CategoryID);
                command.Parameters.AddWithValue("@CategoryName", category.CategoryName);
                command.Parameters.AddWithValue("@CategoryDescription", category.CategoryDescription);

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

        [HttpDelete(Name = "DeleteCategory")]
        public bool Delete(Category category)
        {
            int recordAffectedCount = -1;

            string insertQuery = "DELETE FROM [dbo].[Categories] WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", category.ID);

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

        [HttpGet(Name = "GetCategory")]
        public IEnumerable<Category> Get()
        {
            List<Category> result = new List<Category>(); 
            string queryString = "SELECT [ID], [CategoryID], [CategoryName], [CategoryDescription], [IsDeleted] FROM [cms].[dbo].[Categories]";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        Category category = new Category();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        category.ID = id;

                        long categoryID;
                        long.TryParse(reader["CategoryID"].ToString(), out categoryID);
                        category.CategoryID = categoryID;

                        category.CategoryName = reader["CategoryName"].ToString();
                        category.CategoryDescription = reader["CategoryDescription"].ToString();

                        string isDeleted = reader["IsDeleted"].ToString();
                        category.IsDeleted = !(isDeleted.Equals("False") || (isDeleted.Equals("0")));

                        result.Add(category);
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
