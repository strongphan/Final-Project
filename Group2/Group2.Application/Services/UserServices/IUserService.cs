using Group2.Application.Common.Paging;
using Group2.Application.DTOs.AuthDTOs;
using Group2.Domain.Entity;

namespace Group2.Application.Services.UserServices
{
    public interface IUserService
    {
        Task<User?> FindUserByUserNameAsync(string email);
        Task<LoginResponse> LoginAsync(LoginDTO dto);
        Task<UserResponse> GetByIdAsync(Guid id);
        Task<bool> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO);
        Task<PaginationResponse<UserResponse>> GetFilterAsync(FilterRequest request);
    }
}
