namespace CMS.Server.Model
{
    public class Employee
    {
        public long ID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string StreetAddress { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }
        public string Email { get; set; }
        public DateOnly DOB { get; set; }
        public string Gender { get; set; }
        public string TFN { get; set; }
        public string ABN { get; set; }
    }
}
