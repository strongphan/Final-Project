﻿using Backend.Application.Common.Paging;
using Backend.Application.DTOs.AuthDTOs;
using Backend.Application.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var dto = await _userService.GetByIdAsync(id);
            return Ok(dto);
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginAsync(LoginDTO dto)
        {
            var result = await _userService.LoginAsync(dto);
            return Ok(result);
        }
        [HttpPost("change_password")]
        public async Task<ActionResult<LoginResponse>> ChangePasswordAsync(ChangePasswordDTO dto)
        {
            var result = await _userService.ChangePasswordAsync(dto);
            return Ok(result);
        }
        [HttpPost("filter")]
        public async Task<IActionResult> GetFilterAsync(FilterRequest request)
        {
            var res = await _userService.GetFilterAsync(request);
            return Ok(res);
        }
    }

}
