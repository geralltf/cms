namespace CMS.Server
{
    public class Page
    {
        public long ID { get; set; }

        public string PageName { get; set; }
        public string PageTitle { get; set; }
        public long CategoryID { get; set; }
        public long ParentID { get; set; }
        public long PageAreaID { get; set; }
        public string PageContent { get; set; }
        public string HeaderContent { get; set; }
        public string FooterContent { get; set; }
        public long SequenceOrderID { get; set; }
        public long AuthorID { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }
        public bool IsDeleted { get; set; }
        public long ThemeID { get; set; }
        public long SiteID { get; set; }
        public string SiteLocalityName { get; set; }
        public string PublishVersionID { get; set; }
        public bool IsPublished { get; set; }
    }
}
