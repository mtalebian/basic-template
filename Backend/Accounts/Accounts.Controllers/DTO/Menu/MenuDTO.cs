namespace Accounts.Controllers
{
    public class MenuDTO
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string TCodeId { get; set; }
        public bool OpenInNewTab { get; set; }
        public int SortOrder { get; set; }
    }
}