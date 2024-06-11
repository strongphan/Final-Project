using Group2.Application.Common.Paging;
using Group2.Domain.Entity;

namespace Group2.Application.IRepositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> FindUserByUserNameAsync(string userName);
        Task<User> GenerateUserInformation(User user);
        Task<PaginationResponse<User>> GetFilterAsync(FilterRequest request);
    }
}

