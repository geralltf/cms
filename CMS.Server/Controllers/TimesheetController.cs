using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient; // installed through nuget. Found by searching "System.Data.SqlClient" in nuget package manager.
using System.Text.Json.Serialization; 

namespace CMS.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize(Roles = "Administrators")]
    [Authorize]
    public class TimesheetController : ControllerActionBase
    {
        private readonly ILogger<TimesheetController> _logger;

        public TimesheetController(ILogger<TimesheetController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostTimesheet")]
        public bool Post(Timesheet timesheet)
        {
            int recordAffectedCount = -1;

            string insertQuery = "INSERT INTO [dbo].[Timesheets] ([TimesheetCategory], [TimesheetDescription], [TimesheetTimeSpanBegin], [TimesheetTimeSpanEnd], [TimesheetCompanyID], [IsDeleted]) " 
                + "VALUES (@TimesheetCategory, @TimesheetDescription, @TimesheetTimeSpanBegin, @TimesheetTimeSpanEnd, @TimesheetCompanyID, @IsDeleted)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@TimesheetCategory", timesheet.TimesheetCategory);
                command.Parameters.AddWithValue("@TimesheetDescription", timesheet.TimesheetDescription);
                command.Parameters.AddWithValue("@TimesheetTimeSpanBegin", timesheet.TimesheetTimeSpanBegin);
                command.Parameters.AddWithValue("@TimesheetTimeSpanEnd", timesheet.TimesheetTimeSpanEnd);
                command.Parameters.AddWithValue("@TimesheetCompanyID", timesheet.TimesheetCompanyID);
                command.Parameters.AddWithValue("@IsDeleted", (timesheet.IsDeleted == false) ? "0" : "1");

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

        [HttpPut(Name = "PutTimesheet")]
        public bool Put(Timesheet timesheet)
        {
            int recordAffectedCount = -1;

            string insertQuery = "UPDATE [dbo].[Timesheets] SET [TimesheetCategory] = @TimesheetCategory, [TimesheetDescription] = @TimesheetDescription, [TimesheetTimeSpanBegin] = @TimesheetTimeSpanBegin, [TimesheetTimeSpanEnd] = @TimesheetTimeSpanEnd, [TimesheetCompanyID] = @TimesheetCompanyID, [IsDeleted] = @IsDeleted WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", timesheet.ID);
                command.Parameters.AddWithValue("@TimesheetCategory", timesheet.TimesheetCategory);
                command.Parameters.AddWithValue("@TimesheetDescription", timesheet.TimesheetDescription);
                command.Parameters.AddWithValue("@TimesheetTimeSpanBegin", timesheet.TimesheetTimeSpanBegin);
                command.Parameters.AddWithValue("@TimesheetTimeSpanEnd", timesheet.TimesheetTimeSpanEnd);
                command.Parameters.AddWithValue("@TimesheetCompanyID", timesheet.TimesheetCompanyID);
                command.Parameters.AddWithValue("@IsDeleted", (timesheet.IsDeleted == false) ? "0" : "1");

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

        [HttpDelete(Name = "DeleteTimesheet")]
        public bool Delete(Timesheet timesheet)
        {
            int recordAffectedCount = -1;

            //string insertQuery = "DELETE FROM [dbo].[Timesheets] WHERE [ID] = @ID";
            string updateQuery = "UPDATE [dbo].[Timesheets] SET IsDeleted = 1 WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateQuery, connection);
                command.Parameters.AddWithValue("@ID", timesheet.ID);

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

        [HttpGet(Name = "GetTimesheet")]
        public IEnumerable<Timesheet> Get()
        {
            List<Timesheet> result = new List<Timesheet>();
            //string queryString = "SELECT [ID], [TimesheetCategory], [TimesheetDescription], [TimesheetTimeSpanBegin], [TimesheetTimeSpanEnd], [TimesheetCompanyID], [IsDeleted] FROM [cms].[dbo].[Timesheets]";
            string queryString = "SELECT [dbo].[Companies].CompanyName as CompanyName, [dbo].[Timesheets].[ID] as ID, [dbo].[Timesheets].[TimesheetCategory] as TimesheetCategory, [dbo].[Timesheets].[TimesheetDescription] as TimesheetDescription, [dbo].[Timesheets].[TimesheetTimeSpanBegin] as TimesheetTimeSpanBegin, [dbo].[Timesheets].[TimesheetTimeSpanEnd] as TimesheetTimeSpanEnd, [dbo].[Timesheets].[TimesheetCompanyID] as TimesheetCompanyID, [dbo].[Timesheets].[IsDeleted] as IsDeleted FROM [dbo].[Timesheets] LEFT JOIN [dbo].[Companies] ON [Timesheets].[TimesheetCompanyID] = [dbo].[Companies].ID WHERE [isDeleted] = 0;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        Timesheet timesheet = new Timesheet();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        timesheet.ID = id;

                        timesheet.TimesheetDescription = reader["TimesheetDescription"].ToString();

                        DateTime begin;
                        DateTime.TryParse(reader["TimesheetTimeSpanBegin"].ToString(), out begin);
                        timesheet.TimesheetTimeSpanBegin = begin;

                        DateTime end;
                        DateTime.TryParse(reader["TimesheetTimeSpanEnd"].ToString(), out end);
                        timesheet.TimesheetTimeSpanEnd = end;

                        long companyID;
                        long.TryParse(reader["TimesheetCompanyID"].ToString(), out companyID);
                        timesheet.TimesheetCompanyID = companyID;

                        timesheet.CompanyName = reader["CompanyName"].ToString();
                        
                        long TimesheetCategoryID;
                        long.TryParse(reader["TimesheetCategory"].ToString(), out TimesheetCategoryID);
                        timesheet.TimesheetCategory = TimesheetCategoryID;

                        string isDeleted = reader["IsDeleted"].ToString();

                        timesheet.IsDeleted = !(isDeleted.Equals("False") || (isDeleted.Equals("0")));

                        result.Add(timesheet);
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
