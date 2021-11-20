namespace Forms.Controllers
{
    public class GroupDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }

        public string Title { get; set; }
        public string AzView{ get; set; }
    }
}