using System.ComponentModel.DataAnnotations;

namespace Group2.Application.DTOs.AuthDTOs
{
    public class UserLessDTO
    {
        public Guid Id { get; set; }
        [StringLength(100, MinimumLength = 3)]
        public string? Name { get; set; }
        public string? Email { get; set; }

    }
}
