using Group2.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Group2.Domain.Entity
{
    public class User : BaseEntity
    {

        public string StaffCode { get; set; }

        public string Username { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public DateTime JoinedDate { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public Role Type { get; set; }

        [Required]
        public string Location { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
