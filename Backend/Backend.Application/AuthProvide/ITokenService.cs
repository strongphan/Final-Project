using Backend.Domain.Entity;
using System.Security.Claims;

namespace Backend.Application.AuthProvide
{
    public interface ITokenService
    {
        string GenerateJWT(IEnumerable<Claim>? additionalClaims = null);
        string GenerateJWT(User user, IEnumerable<Claim>? additionalClaims = null);
    }
}
