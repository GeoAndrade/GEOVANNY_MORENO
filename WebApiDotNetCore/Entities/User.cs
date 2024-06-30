using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApiDotNetCore.Entities
{
    [Table("Users", Schema = "SEG")]
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Active { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserTask> Tasks { get; set; }

    }
}