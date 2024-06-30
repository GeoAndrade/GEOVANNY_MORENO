namespace WebApiDotNetCore.DTOs
{
    public class UserTaskDTO
    {
        public long IdUserTask { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
    }
}
