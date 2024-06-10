using Group2.Application.DTOs.AuthDTOs;
using Group2.Domain.Entity;

namespace Group2.Application.Services.UserServices
{
    public interface IUserService
    {
        Task<User?> FindUserByEmailAsync(string email);
        Task<LoginResponse> LoginAsync(LoginDTO dto);
        Task<RegistrationResponse> RegisterAsync(RegisterUserDto dto);
        Task<UserDTO> GetByIdAsync(Guid id);
        Task<bool> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO);
    }
}
