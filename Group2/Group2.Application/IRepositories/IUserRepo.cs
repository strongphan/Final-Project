using Group2.Domain.Entity;

namespace Group2.Application.IRepositories
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User?> FindUserByEmailAsync(string email);
    }
}
