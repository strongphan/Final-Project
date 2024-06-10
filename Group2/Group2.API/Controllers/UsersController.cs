using Group2.Application.DTOs.AuthDTOs;
using Group2.Application.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace Group2.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
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
        [HttpPost("register")]
        public async Task<ActionResult<LoginResponse>> RegisterAsync(RegisterUserDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            return Ok(result);
        }
        [HttpPost("change_password")]
        public async Task<ActionResult<LoginResponse>> ChangePasswordAsync(ChangePasswordDTO dto)
        {
            var result = await _userService.ChangePasswordAsync(dto);
            return Ok(result);
        }
    }

}
