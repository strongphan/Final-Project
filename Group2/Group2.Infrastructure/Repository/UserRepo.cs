using Group2.Application.IRepositories;
using Group2.Domain.Entity;
using Group2.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Group2.Infrastructure.Repository
{


    public class UserRepo(LibraryContext context) : BaseRepo<User>(context), IUserRepo
    {
        public async Task<User?> FindUserByEmailAsync(string email) => await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
    }
}
