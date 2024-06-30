namespace WebApiDotNetCore.DTOs
{
    public class UserTaskDTO
    {
        public long IdUserTask { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Responsible { get; set; }
    }
}
