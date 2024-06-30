
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiDotNetCore.Entities
{
    public class UserTask
    {
        [Key]
        public long IdUserTask { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Responsible { get; set; }
        public bool Active { get; set; }
        [ForeignKey(nameof(Entities.User))]
        public string IdUser { get; set; }
        public User User { get; set; }
    }
}
