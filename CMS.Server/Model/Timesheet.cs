namespace CMS.Server
{
    public class Timesheet
    {
        public long ID { get; set; }

        public long TimesheetCategory { get; set; }

        public string TimesheetDescription { get; set; }

        public DateTime TimesheetTimeSpanBegin { get; set; }

        public DateTime TimesheetTimeSpanEnd { get; set; }

        public long TimesheetCompanyID { get; set; }

        public bool IsDeleted { get; set; }
    }
}
