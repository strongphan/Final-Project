using Group2.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Group2.Application.DTOs.AuthDTOs
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        [StringLength(100, MinimumLength = 3)]
        public string? Name { get; set; }
        public Role? Role { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
