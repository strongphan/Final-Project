using Group2.Domain.Enum;

namespace Group2.Application.DTOs.AuthDTOs
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime JoinedDate { get; set; }

        public Gender Gender { get; set; }

        public Role Type { get; set; }
    }
}
