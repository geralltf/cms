namespace CMS.Server
{
    public class PayrollEntry
    {
        public long ID { get; set; }
        public long EmployeeID { get; set; }
        public DateTime? EmploymentStartDate { get; set; }
        public long EmploymentClassification { get; set; }
        public decimal UsualWorkingHoursPerDay { get; set; }
        public long JobStatus { get; set; }
        public string Reference { get; set; }
        public long LeaveEntitlements { get; set; }
        public long WageSupplements { get; set; }
        public decimal BasicSalaryPerHour { get; set; }
        public decimal OverTimePerHour { get; set; }
        public decimal GrossPay { get; set; }
        public decimal NetPay { get; set; }
        public decimal Tax { get; set; }
        public decimal PensionAndSuperannuation { get; set; }
        public decimal StudentLoan { get; set; }
        public decimal InsurancePay { get; set; }
        public decimal Deductions { get; set; }
        public long Grade { get; set; }
        public long Department { get; set; }
        public DateTime? PayDate { get; set; }
        public string TaxPeroid { get; set; }
        public string InsuranceNumber { get; set; }
        public decimal SuperannuationRate { get; set; }
        public decimal TaxiblePay { get; set; }
        public decimal MedicareDeduction { get; set; }
        public decimal OtherDeductions { get; set; }
        public string PayGWitholdingNumber { get; set; }
        public long EmployerCompany { get; set; }
    }
}
