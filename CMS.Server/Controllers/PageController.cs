using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text.Json.Serialization; // installed through nuget. Found by searching "System.Data.SqlClient" in nuget package manager.

namespace CMS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Administrators")]
    [Authorize]
    public class PageController : ControllerActionBase
    {
        private readonly ILogger<PageController> _logger;

        public PageController(ILogger<PageController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostPage")]
        public bool Post(Page page)
        {
            int recordAffectedCount = -1;

            string insertQuery = "INSERT INTO [dbo].[Pages] ([PageName], [PageTitle], [CategoryID], [ParentID], [PageAreaID], [PageContent], [HeaderContent], [FooterContent], [SequenceOrderID], [AuthorID], [DateCreated], [DateLastModified], [IsDeleted], [ThemeID], [SiteID], [SiteLocalityName], [PublishVersionID], [IsPublished]) " 
                + "VALUES (@PageName, @PageTitle, @CategoryID, @ParentID, @PageAreaID, @PageContent, @HeaderContent, @FooterContent, @SequenceOrderID, @AuthorID, @DateCreated, @DateLastModified, @IsDeleted, @ThemeID, @SiteID, @SiteLocalityName, @PublishVersionID, @IsPublished)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@PageName", page.PageName);
                command.Parameters.AddWithValue("@PageTitle", page.PageTitle);
                command.Parameters.AddWithValue("@CategoryID", page.CategoryID);
                command.Parameters.AddWithValue("@ParentID", page.ParentID);
                command.Parameters.AddWithValue("@PageAreaID", page.PageAreaID);
                command.Parameters.AddWithValue("@PageContent", page.PageContent);
                command.Parameters.AddWithValue("@HeaderContent", page.HeaderContent);
                command.Parameters.AddWithValue("@FooterContent", page.FooterContent);
                command.Parameters.AddWithValue("@SequenceOrderID", page.SequenceOrderID);
                command.Parameters.AddWithValue("@AuthorID", page.AuthorID);
                command.Parameters.AddWithValue("@DateCreated", page.DateCreated);
                command.Parameters.AddWithValue("@DateLastModified", page.DateLastModified);
                command.Parameters.AddWithValue("@IsDeleted", page.IsDeleted);
                command.Parameters.AddWithValue("@ThemeID", page.ThemeID);
                command.Parameters.AddWithValue("@SiteID", page.SiteID);
                command.Parameters.AddWithValue("@SiteLocalityName", page.SiteLocalityName);
                command.Parameters.AddWithValue("@PublishVersionID", page.PublishVersionID);
                command.Parameters.AddWithValue("@IsPublished", page.IsPublished);

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

        [HttpPut(Name = "PutPage")]
        public bool Put(Page page)
        {
            int recordAffectedCount = -1;

            string updateQuery = "UPDATE [dbo].[Pages] SET [PageName] = @PageName, [PageTitle] = @PageTitle, [CategoryID] = @CategoryID, [ParentID] = @ParentID, [PageAreaID] = @PageAreaID, [PageContent] = @PageContent, [HeaderContent] = @HeaderContent, [FooterContent] = @FooterContent, [SequenceOrderID] = @SequenceOrderID, [AuthorID] = @AuthorID, [DateCreated] = @DateCreated, [DateLastModified] = @DateLastModified, [IsDeleted] = @IsDeleted, [ThemeID] = @ThemeID, [SiteID] = @SiteID, [SiteLocalityName] = @SiteLocalityName, [PublishVersionID] = @PublishVersionID, [IsPublished] = @IsPublished WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateQuery, connection);
                command.Parameters.AddWithValue("@ID", page.ID);
                command.Parameters.AddWithValue("@PageName", page.PageName);
                command.Parameters.AddWithValue("@PageTitle", page.PageTitle);
                command.Parameters.AddWithValue("@CategoryID", page.CategoryID);
                command.Parameters.AddWithValue("@ParentID", page.ParentID);
                command.Parameters.AddWithValue("@PageAreaID", page.PageAreaID);
                command.Parameters.AddWithValue("@PageContent", page.PageContent);
                command.Parameters.AddWithValue("@HeaderContent", page.HeaderContent);
                command.Parameters.AddWithValue("@FooterContent", page.FooterContent);
                command.Parameters.AddWithValue("@SequenceOrderID", page.SequenceOrderID);
                command.Parameters.AddWithValue("@AuthorID", page.AuthorID);
                command.Parameters.AddWithValue("@DateCreated", page.DateCreated);
                command.Parameters.AddWithValue("@DateLastModified", page.DateLastModified);
                command.Parameters.AddWithValue("@IsDeleted", page.IsDeleted);
                command.Parameters.AddWithValue("@ThemeID", page.ThemeID);
                command.Parameters.AddWithValue("@SiteID", page.SiteID);
                command.Parameters.AddWithValue("@SiteLocalityName", page.SiteLocalityName);
                command.Parameters.AddWithValue("@PublishVersionID", page.PublishVersionID);
                command.Parameters.AddWithValue("@IsPublished", page.IsPublished);
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

        [HttpDelete(Name = "DeletePage")]
        public bool Delete(Page page)
        {
            int recordAffectedCount = -1;

            string insertQuery = "DELETE FROM [dbo].[Pages] WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", page.ID);

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

        [HttpGet(Name = "GetPage")]
        public IEnumerable<Page> Get()
        {
            List<Page> result = new List<Page>();
            string queryString = "SELECT [ID], [PageName], [PageTitle], [CategoryID], [ParentID], [PageAreaID], [PageContent], [HeaderContent], [FooterContent], [SequenceOrderID], [AuthorID], [DateCreated], [DateLastModified], [IsDeleted], [ThemeID], [SiteID], [SiteLocalityName], [PublishVersionID], [IsPublished] FROM [dbo].[Pages]";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        Page page = new Page();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        page.ID = id;

                        page.PageName = reader["PageName"].ToString();
                        page.PageTitle = reader["PageTitle"].ToString();

                        long categoryID;
                        long.TryParse(reader["CategoryID"].ToString(), out categoryID);
                        page.CategoryID = categoryID;

                        long parentID;
                        long.TryParse(reader["ParentID"].ToString(), out parentID);
                        page.ParentID = parentID;

                        long pageAreaID;
                        long.TryParse(reader["PageAreaID"].ToString(), out pageAreaID);
                        page.PageAreaID = pageAreaID;

                        page.PageContent = reader["PageContent"].ToString();
                        page.HeaderContent = reader["HeaderContent"].ToString();
                        page.FooterContent = reader["FooterContent"].ToString();

                        long sequenceOrderID;
                        long.TryParse(reader["SequenceOrderID"].ToString(), out sequenceOrderID);
                        page.SequenceOrderID = sequenceOrderID;

                        long authorID;
                        long.TryParse(reader["AuthorID"].ToString(), out authorID);
                        page.AuthorID = authorID;

                        DateTime created;
                        DateTime.TryParse(reader["DateCreated"].ToString(), out created);
                        page.DateCreated = created;

                        DateTime lastModified;
                        DateTime.TryParse(reader["DateLastModified"].ToString(), out lastModified);
                        page.DateLastModified = lastModified;

                        string isDeleted = reader["IsDeleted"].ToString();
                        page.IsDeleted = !(isDeleted.Equals("False") || (isDeleted.Equals("0")));

                        long themeID;
                        long.TryParse(reader["ThemeID"].ToString(), out themeID);
                        page.ThemeID = themeID;

                        long siteID;
                        long.TryParse(reader["SiteID"].ToString(), out siteID);
                        page.SiteID = siteID;

                        page.SiteLocalityName = reader["SiteLocalityName"].ToString();
                        page.PublishVersionID = reader["PublishVersionID"].ToString();

                        bool isPublished;
                        Boolean.TryParse(reader["IsPublished"].ToString(), out isPublished);
                        page.IsPublished = isPublished;

                        result.Add(page);
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
