namespace CMS.Server
{
    public class Category
    {
        public long ID { get; set; }
        public long CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public bool IsDeleted { get; set; }
    }
}
