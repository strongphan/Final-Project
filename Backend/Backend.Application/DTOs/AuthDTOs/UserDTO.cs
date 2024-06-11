using Backend.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.AuthDTOs
{
    public class UserDTO
    {
        [Required]
        [StringLength(maximumLength: 20)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(maximumLength: 20)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public DateTime JoinedDate { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public Role Type { get; set; }


    }
}
