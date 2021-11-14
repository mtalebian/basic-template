namespace Forms.Controllers
{
    public class UpdateVariantDTO
    {
        public int Serial { get; set; }

        public string Title { get; set; }
        public bool IsPublic { get; set; }
        public bool AutoApply { get; set; }
    }
}