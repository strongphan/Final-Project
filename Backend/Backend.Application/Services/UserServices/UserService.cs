﻿using AutoMapper;
using Backend.Application.AuthProvide;
using Backend.Application.Common;
using Backend.Application.Common.Paging;
using Backend.Application.DTOs.AuthDTOs;
using Backend.Application.IRepositories;
using Backend.Domain.Entity;
using Backend.Domain.Exceptions;

namespace Backend.Application.Services.UserServices
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
        public async Task<UserResponse> InsertAsync(UserDTO dto)
        {
            var user = _mapper.Map<User>(dto);
            user = await _userRepo.GenerateUserInformation(user);
            await _userRepo.InsertAsync(user);
            user = await FindUserByUserNameAsync(user.UserName);
            var res = _mapper.Map<UserResponse>(user);
            return res;

        }
        public async Task<bool> ChangePasswordAsync(ChangePasswordDTO changePasswordDTO)
        {
            var user = await _userRepo.GetByIdAsync(changePasswordDTO.Id) ?? throw new NotFoundException();
            if (changePasswordDTO.OldPassword != user.Password)
            {
                throw new DataInvalidException("Wrong password");
            }
            if (changePasswordDTO.NewPassword == user.Password)
            {
                throw new DataInvalidException("Do not re-enter the old password");
            }
            var check = new PasswordRegex();
            if (!check.IsPasswordValid(changePasswordDTO.NewPassword))
                throw new DataInvalidException("The password having at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol");

            user.Password = changePasswordDTO.NewPassword;
            user.ModifiedAt = DateTime.UtcNow;
            user.ModifiedBy = user.FirstName;
            user.FirstLogin = false;
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
        public async Task<User?> FindUserByUserNameAsync(string email) => await _userRepo.FindUserByUserNameAsync(email);

        public async Task<LoginResponse> LoginAsync(LoginDTO dto)
        {
            var getUser = await FindUserByUserNameAsync(dto.UserName!);
            if (getUser == null)
                return new LoginResponse(false, "User not found");

            if (dto.Password == getUser.Password)
            {
                return new LoginResponse(true, "Login success", _tokenService.GenerateJWTWithUser(getUser));

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
