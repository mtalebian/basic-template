namespace Accounts.Controllers
{
    public class MenuFolderDTO
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Title { get; set; }
        public int SortOrder { get; set; }
    }
}