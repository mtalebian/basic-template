namespace Forms.Controllers
{
    public class GroupInfoDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public GroupItemDTO[] Items { get; set; }
    }
}