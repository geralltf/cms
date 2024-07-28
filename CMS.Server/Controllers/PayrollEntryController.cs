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
    [Authorize]
    public class PayrollEntryController : ControllerActionBase
    {
        private readonly ILogger<PayrollEntryController> _logger;

        public PayrollEntryController(ILogger<PayrollEntryController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "PostPayrollEntry")]
        public bool Post(PayrollEntry payrollEntry)
        {
            int recordAffectedCount = -1;

            string insertQuery = "INSERT INTO [dbo].[PayrollEntries] ([EmployeeID],[EmploymentStartDate],[EmploymentClassification],[UsualWorkingHoursPerDay],[JobStatus],[Reference],[LeaveEntitlements],[WageSupplements],[BasicSalaryPerHour],[OverTimePerHour],[GrossPay],[NetPay],[Tax],[PensionAndSuperannuation],[StudentLoan],[InsurancePay],[Deductions],[Grade],[Department],[PayDate],[TaxPeroid],[InsuranceNumber],[SuperannuationRate],[TaxiblePay],[MedicareDeduction],[OtherDeductions],[PayGWithholdingNumber],[EmployerCompany]) " +
                "VALUES (@EmployeeID,@EmploymentStartDate,@EmploymentClassification,@UsualWorkingHoursPerDay,@JobStatus,@Reference,@LeaveEntitlements,@WageSupplements,@BasicSalaryPerHour,@OverTimePerHour,@GrossPay,@NetPay,@Tax,@PensionAndSuperannuation,@StudentLoan,@InsurancePay,@Deductions,@Grade,@Department,@PayDate,@TaxPeroid,@InsuranceNumber,@SuperannuationRate,@TaxiblePay,@MedicareDeduction,@OtherDeductions,@PayGWithholdingNumber,@EmployerCompany)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                //command.Parameters.AddWithValue("@ID", payrollEntry.ID);
                command.Parameters.AddWithValue("@EmployeeID", payrollEntry.EmployeeID);
                command.Parameters.AddWithValue("@EmploymentStartDate", payrollEntry.EmploymentStartDate);
                command.Parameters.AddWithValue("@EmploymentClassification", payrollEntry.EmploymentClassification);
                command.Parameters.AddWithValue("@UsualWorkingHoursPerDay", payrollEntry.UsualWorkingHoursPerDay);
                command.Parameters.AddWithValue("@JobStatus", payrollEntry.JobStatus);
                command.Parameters.AddWithValue("@Reference", payrollEntry.Reference);
                command.Parameters.AddWithValue("@LeaveEntitlements", payrollEntry.LeaveEntitlements);
                command.Parameters.AddWithValue("@WageSupplements", payrollEntry.WageSupplements);
                command.Parameters.AddWithValue("@BasicSalaryPerHour", payrollEntry.BasicSalaryPerHour);
                command.Parameters.AddWithValue("@OverTimePerHour", payrollEntry.OverTimePerHour);
                command.Parameters.AddWithValue("@GrossPay", payrollEntry.GrossPay);
                command.Parameters.AddWithValue("@NetPay", payrollEntry.NetPay);
                command.Parameters.AddWithValue("@Tax", payrollEntry.Tax);
                command.Parameters.AddWithValue("@PensionAndSuperannuation", payrollEntry.PensionAndSuperannuation);
                command.Parameters.AddWithValue("@StudentLoan", payrollEntry.StudentLoan);
                command.Parameters.AddWithValue("@InsurancePay", payrollEntry.InsurancePay);
                command.Parameters.AddWithValue("@Deductions", payrollEntry.Deductions);
                command.Parameters.AddWithValue("@Grade", payrollEntry.Grade);
                command.Parameters.AddWithValue("@Department", payrollEntry.Department);
                command.Parameters.AddWithValue("@PayDate", payrollEntry.PayDate);
                command.Parameters.AddWithValue("@TaxPeroid", payrollEntry.TaxPeroid);
                command.Parameters.AddWithValue("@InsuranceNumber", payrollEntry.InsurancePay);
                command.Parameters.AddWithValue("@SuperannuationRate", payrollEntry.SuperannuationRate);
                command.Parameters.AddWithValue("@TaxiblePay", payrollEntry.TaxiblePay);
                command.Parameters.AddWithValue("@MedicareDeduction", payrollEntry.MedicareDeduction);
                command.Parameters.AddWithValue("@OtherDeductions", payrollEntry.OtherDeductions);
                command.Parameters.AddWithValue("@PayGWithholdingNumber", payrollEntry.PayGWitholdingNumber);
                command.Parameters.AddWithValue("@EmployerCompany", payrollEntry.EmployerCompany);

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

        [HttpPut(Name = "PutPayrollEntry")]
        public bool Put(PayrollEntry payrollEntry)
        {
            int recordAffectedCount = -1;
            string updateQuery = string.Empty;
            string updateSetEmploymentSD = string.Empty;
            string updateSetPayDate = string.Empty;

            if (payrollEntry.PayDate != null)
            {
                updateSetPayDate = "[PayDate] = @PayDate,";
            }
            if (payrollEntry.EmploymentStartDate != null)
            {
                updateSetEmploymentSD = "[EmploymentStartDate] = @EmploymentStartDate,";
            }

            updateQuery = "UPDATE [dbo].[PayrollEntries] SET " + updateSetEmploymentSD + "[EmploymentClassification] = @EmploymentClassification,[UsualWorkingHoursPerDay] = @UsualWorkingHoursPerDay," +
"[JobStatus] = @JobStatus,[Reference] = @Reference,[LeaveEntitlements] = @LeaveEntitlements,[WageSupplements] = @WageSupplements," +
"[BasicSalaryPerHour] = @BasicSalaryPerHour,[OverTimePerHour] = @OverTimePerHour,[GrossPay] = @GrossPay,[NetPay] = @NetPay," +
"[Tax] = @Tax,[PensionAndSuperannuation] = @PensionAndSuperannuation,[StudentLoan] = @StudentLoan,[InsurancePay] = @InsurancePay," +
"[Deductions] = @Deductions,[Grade] = @Grade,[Department] = @Department,"+updateSetPayDate+"[TaxPeroid] = @TaxPeroid," +
"[InsuranceNumber] = @InsuranceNumber,[SuperannuationRate] = @SuperannuationRate,[TaxiblePay] = @TaxiblePay," +
"[MedicareDeduction] = @MedicareDeduction,[OtherDeductions] = @OtherDeductions,[PayGWithholdingNumber] = @PayGWithholdingNumber," +
"[EmployerCompany] = @EmployerCompany WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(updateQuery, connection);
                command.Parameters.AddWithValue("@ID", payrollEntry.ID);
                command.Parameters.AddWithValue("@EmployeeID", payrollEntry.EmployeeID);
                if (payrollEntry.EmploymentStartDate != null)
                {
                    command.Parameters.AddWithValue("@EmploymentStartDate", payrollEntry.EmploymentStartDate);
                }
                command.Parameters.AddWithValue("@EmploymentClassification", payrollEntry.EmploymentClassification);
                command.Parameters.AddWithValue("@UsualWorkingHoursPerDay", payrollEntry.UsualWorkingHoursPerDay);
                command.Parameters.AddWithValue("@JobStatus", payrollEntry.JobStatus);
                command.Parameters.AddWithValue("@Reference", payrollEntry.Reference);
                command.Parameters.AddWithValue("@LeaveEntitlements", payrollEntry.LeaveEntitlements);
                command.Parameters.AddWithValue("@WageSupplements", payrollEntry.WageSupplements);
                command.Parameters.AddWithValue("@BasicSalaryPerHour", payrollEntry.BasicSalaryPerHour);
                command.Parameters.AddWithValue("@OverTimePerHour", payrollEntry.OverTimePerHour);
                command.Parameters.AddWithValue("@GrossPay", payrollEntry.GrossPay);
                command.Parameters.AddWithValue("@NetPay", payrollEntry.NetPay);
                command.Parameters.AddWithValue("@Tax", payrollEntry.Tax);
                command.Parameters.AddWithValue("@PensionAndSuperannuation", payrollEntry.PensionAndSuperannuation);
                command.Parameters.AddWithValue("@StudentLoan", payrollEntry.StudentLoan);
                command.Parameters.AddWithValue("@InsurancePay", payrollEntry.InsurancePay);
                command.Parameters.AddWithValue("@Deductions", payrollEntry.Deductions);
                command.Parameters.AddWithValue("@Grade", payrollEntry.Grade);
                command.Parameters.AddWithValue("@Department", payrollEntry.Department);
                if (payrollEntry.PayDate != null)
                {
                    command.Parameters.AddWithValue("@PayDate", payrollEntry.PayDate);
                }
                command.Parameters.AddWithValue("@TaxPeroid", payrollEntry.TaxPeroid);
                command.Parameters.AddWithValue("@InsuranceNumber", payrollEntry.InsurancePay);
                command.Parameters.AddWithValue("@SuperannuationRate", payrollEntry.SuperannuationRate);
                command.Parameters.AddWithValue("@TaxiblePay", payrollEntry.TaxiblePay);
                command.Parameters.AddWithValue("@MedicareDeduction", payrollEntry.MedicareDeduction);
                command.Parameters.AddWithValue("@OtherDeductions", payrollEntry.OtherDeductions);
                command.Parameters.AddWithValue("@PayGWithholdingNumber", payrollEntry.PayGWitholdingNumber);
                command.Parameters.AddWithValue("@EmployerCompany", payrollEntry.EmployerCompany);
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

        [HttpDelete(Name = "DeletePayrollEntry")]
        public bool Delete(PayrollEntry payrollEntry)
        {
            int recordAffectedCount = -1;

            string insertQuery = "DELETE FROM [dbo].[PayrollEntries] WHERE [ID] = @ID";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@ID", payrollEntry.ID);

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

        [HttpGet(Name = "GetPayrollEntry")]
        public IEnumerable<PayrollEntry> Get()
        {
            List<PayrollEntry> result = new List<PayrollEntry>();
            string queryString = "SELECT [ID],[EmployeeID],[EmploymentStartDate],[EmploymentClassification],[UsualWorkingHoursPerDay],[JobStatus],[Reference]," +
                "[LeaveEntitlements],[WageSupplements],[BasicSalaryPerHour],[OverTimePerHour],[GrossPay],[NetPay],[Tax],[PensionAndSuperannuation]," +
                "[StudentLoan],[InsurancePay],[Deductions],[Grade],[Department],[PayDate],[TaxPeroid],[InsuranceNumber],[SuperannuationRate]," +
                "[TaxiblePay],[MedicareDeduction],[OtherDeductions],[PayGWithholdingNumber],[EmployerCompany] FROM [dbo].[PayrollEntries]";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        PayrollEntry payrollEntry = new PayrollEntry();

                        long id;
                        long.TryParse(reader["ID"].ToString(), out id);
                        payrollEntry.ID = id;

                        long employeeID;
                        long.TryParse(reader["EmployeeID"].ToString(), out employeeID);
                        payrollEntry.EmployeeID = employeeID;

                        DateTime employmentStartDate;
                        DateTime.TryParse(reader["EmploymentStartDate"].ToString(), out employmentStartDate);
                        payrollEntry.EmploymentStartDate = employmentStartDate;

                        long employmentClassification;
                        long.TryParse(reader["EmploymentClassification"].ToString(), out employmentClassification);
                        payrollEntry.EmploymentClassification = employmentClassification;    

                        decimal usualWorkingHoursPerDay;
                        decimal.TryParse(reader["UsualWorkingHoursPerDay"].ToString(), out usualWorkingHoursPerDay);
                        payrollEntry.UsualWorkingHoursPerDay = usualWorkingHoursPerDay;

                        long jobStatus;
                        long.TryParse(reader["JobStatus"].ToString(), out jobStatus);
                        payrollEntry.JobStatus = jobStatus;

                        payrollEntry.Reference = reader["Reference"].ToString();

                        long leaveEntitlements;
                        long.TryParse(reader["LeaveEntitlements"].ToString(), out leaveEntitlements);
                        payrollEntry.LeaveEntitlements = leaveEntitlements;

                        long wageSupplements;
                        long.TryParse(reader["WageSupplements"].ToString(), out wageSupplements);
                        payrollEntry.WageSupplements = wageSupplements;

                        decimal basicSalaryPerHour;
                        decimal.TryParse(reader["BasicSalaryPerHour"].ToString(), out basicSalaryPerHour);
                        payrollEntry.BasicSalaryPerHour = basicSalaryPerHour;

                        decimal overTimePerHour;
                        decimal.TryParse(reader["OverTimePerHour"].ToString(), out overTimePerHour);
                        payrollEntry.OverTimePerHour = overTimePerHour;

                        decimal grossPay;
                        decimal.TryParse(reader["GrossPay"].ToString(), out grossPay);
                        payrollEntry.GrossPay = grossPay;

                        decimal netPay;
                        decimal.TryParse(reader["NetPay"].ToString(), out netPay);
                        payrollEntry.NetPay = netPay;

                        decimal tax;
                        decimal.TryParse(reader["Tax"].ToString(), out tax);
                        payrollEntry.Tax = tax;

                        decimal pensionAndSuperannuation;
                        decimal.TryParse(reader["PensionAndSuperannuation"].ToString(), out pensionAndSuperannuation);
                        payrollEntry.PensionAndSuperannuation = pensionAndSuperannuation;

                        decimal studentLoan;
                        decimal.TryParse(reader["StudentLoan"].ToString(), out studentLoan);
                        payrollEntry.StudentLoan = studentLoan;

                        decimal insurancePay;
                        decimal.TryParse(reader["InsurancePay"].ToString(), out insurancePay);
                        payrollEntry.InsurancePay = insurancePay;

                        decimal deductions;
                        decimal.TryParse(reader["Deductions"].ToString(), out deductions);
                        payrollEntry.Deductions = deductions;

                        long grade;
                        long.TryParse(reader["Grade"].ToString(), out grade);
                        payrollEntry.Grade = grade;

                        long department;
                        long.TryParse(reader["Department"].ToString(), out department);
                        payrollEntry.Department = department;

                        DateTime payDate;
                        DateTime.TryParse(reader["PayDate"].ToString(), out payDate);
                        payrollEntry.PayDate = payDate;

                        payrollEntry.TaxPeroid = reader["TaxPeroid"].ToString();
                        payrollEntry.InsuranceNumber = reader["InsuranceNumber"].ToString();

                        decimal superannuationRate;
                        decimal.TryParse(reader["SuperannuationRate"].ToString(), out superannuationRate);
                        payrollEntry.SuperannuationRate = superannuationRate;

                        decimal taxiblePay;
                        decimal.TryParse(reader["TaxiblePay"].ToString(), out taxiblePay);
                        payrollEntry.TaxiblePay = taxiblePay;

                        decimal medicareDeduction;
                        decimal.TryParse(reader["MedicareDeduction"].ToString(), out medicareDeduction);
                        payrollEntry.MedicareDeduction = medicareDeduction;

                        decimal otherDeductions;
                        decimal.TryParse(reader["OtherDeductions"].ToString(), out otherDeductions);
                        payrollEntry.OtherDeductions = otherDeductions;

                        payrollEntry.PayGWitholdingNumber = reader["PayGWithholdingNumber"].ToString();

                        long employerCompany;
                        long.TryParse(reader["EmployerCompany"].ToString(), out employerCompany);
                        payrollEntry.EmployerCompany = employerCompany;

                        result.Add(payrollEntry);
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
