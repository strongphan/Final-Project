using AutoMapper;
using Group2.Application.AuthProvide;
using Group2.Application.DTOs.AuthDTOs;
using Group2.Application.IRepositories;
using Group2.Domain.Entity;
using Group2.Domain.Exceptions;

namespace Group2.Application.Services.UserServices
{
    public class UserService(IUserRepo userRepo, ITokenService tokenService, IMapper mapper) : IUserService
    {
        private readonly IUserRepo _userRepo = userRepo;
        private readonly ITokenService _tokenService = tokenService;
        private readonly IMapper _mapper = mapper;

        public async Task<UserDTO> GetByIdAsync(Guid id)
        {
            var entity = await _userRepo.GetByIdAsync(id) ?? throw new NotFoundException();
            var dto = _mapper.Map<UserDTO>(entity);
            return dto;

        }
        public async Task<bool> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO)
        {
            var user = await _userRepo.GetByIdAsync(changePasswordDTO.Id) ?? throw new NotFoundException();
            bool checkPassword = BCrypt.Net.BCrypt.Verify(changePasswordDTO.OldPassword, user.Password);
            if (checkPassword)
            {
                throw new DataInvalidException("Wrong password");
            }
            else
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordDTO.NewPassword);
                user.ModifiedAt = DateTime.UtcNow;
                user.ModifiedBy = user.FirstName;
                try
                {
                    await _userRepo.UpdateAsync(user);

                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                return true;
            }
        }
        public async Task<User?> FindUserByEmailAsync(string email) => await _userRepo.FindUserByEmailAsync(email);

        public async Task<LoginResponse> LoginAsync(LoginDTO dto)
        {
            var getUser = await FindUserByEmailAsync(dto.Email!);
            if (getUser == null)
                return new LoginResponse(false, "User not found");

            bool checkPassword = BCrypt.Net.BCrypt.Verify(dto.Password, getUser.Password);
            if (checkPassword)
            {
                return new LoginResponse(true, "Login success", _tokenService.GenerateJWT(getUser));

            }
            else
            {
                return new LoginResponse(false, "Invalid credentials");
            }
        }

        public async Task<RegistrationResponse> RegisterAsync(RegisterUserDto dto)
        {
            var getUser = await FindUserByEmailAsync(dto.Email!);
            if (getUser != null)
                return new RegistrationResponse(false, "User already exist");

            var user = new User
            {
                FirstName = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Type = Domain.Enum.Role.Admin,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
                CreatedBy = "ManhPhan",
                ModifiedBy = "ManhPhan",
            };
            await _userRepo.InsertAsync(user);
            return new RegistrationResponse(true, "Register success");

        }

    }
}
