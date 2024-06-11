using Group2.Domain.Entity;
using System.Security.Claims;

namespace Group2.Application.AuthProvide
{
    public interface ITokenService
    {
        string GenerateJWT(IEnumerable<Claim>? additionalClaims = null);
        string GenerateJWT(User user, IEnumerable<Claim>? additionalClaims = null);
    }
}
