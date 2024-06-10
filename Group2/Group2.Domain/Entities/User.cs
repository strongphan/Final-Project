using Group2.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Group2.Domain.Entity
{
    public class User : BaseEntity
    {

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string? Name { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string? Password { get; set; }
        [Required]
        public Role Role { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
