using AutoMapper;
using Group2.Application.AuthProvide;
using Group2.Application.Common.Paging;
using Group2.Application.DTOs.AuthDTOs;
using Group2.Application.IRepositories;
using Group2.Domain.Entity;
using Group2.Domain.Exceptions;

namespace Group2.Application.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepo, ITokenService tokenService, IMapper mapper)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        public async Task<UserResponse> GetByIdAsync(int id)
        {
            var entity = await _userRepo.GetByIdAsync(id) ?? throw new NotFoundException();
            var dto = _mapper.Map<UserResponse>(entity);
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
        public async Task<User?> FindUserByUserNameAsync(string email) => await _userRepo.FindUserByUserNameAsync(email);

        public async Task<LoginResponse> LoginAsync(LoginDTO dto)
        {
            var getUser = await FindUserByUserNameAsync(dto.UserName!);
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


        public async Task<PaginationResponse<UserResponse>> GetFilterAsync(FilterRequest request)
        {
            var res = await _userRepo.GetFilterAsync(request);
            var dtos = _mapper.Map<IEnumerable<UserResponse>>(res.Data);
            return new(dtos, res.TotalCount);

        }

    }
}
