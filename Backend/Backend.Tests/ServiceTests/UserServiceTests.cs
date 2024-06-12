﻿using AutoMapper;
using Backend.Application.AuthProvide;
using Backend.Application.Common.Paging;
using Backend.Application.DTOs.AuthDTOs;
using Backend.Application.IRepositories;
using Backend.Application.Services.UserServices;
using Backend.Domain.Entity;
using Backend.Domain.Exceptions;
using FluentValidation;
using FluentValidation.Results;
using Moq;
using System.Security.Claims;

namespace Backend.Tests.ServiceTests
{
    [TestFixture]
    public class UserServiceTests
    {
        private Mock<IUserRepository> _userRepoMock;
        private Mock<ITokenService> _tokenServiceMock;
        private Mock<IMapper> _mapperMock;
        private Mock<IValidator<UserDTO>> _validatorMock;
        private UserService _userService;

        [SetUp]
        public void SetUp()
        {
            _userRepoMock = new Mock<IUserRepository>();
            _tokenServiceMock = new Mock<ITokenService>();
            _mapperMock = new Mock<IMapper>();
            _validatorMock = new Mock<IValidator<UserDTO>>();
            _userService = new UserService(_userRepoMock.Object, _tokenServiceMock.Object, _mapperMock.Object, _validatorMock.Object);
        }

        [Test]
        public async Task GetByIdAsync_WhenUserExists_ReturnsUserResponse()
        {
            // Arrange
            var userId = 1;
            var user = new User { Id = userId };
            var userResponse = new UserResponse { Id = userId };

            _userRepoMock.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync(user);
            _mapperMock.Setup(mapper => mapper.Map<UserResponse>(user)).Returns(userResponse);

            // Act
            var result = await _userService.GetByIdAsync(userId);

            // Assert
            Assert.That(result, Is.EqualTo(userResponse));
        }

        [Test]
        public void GetByIdAsync_WhenUserDoesNotExist_ThrowsNotFoundException()
        {
            // Arrange
            var userId = 1;

            _userRepoMock.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync((User)null);

            // Act & Assert
            Assert.ThrowsAsync<NotFoundException>(() => _userService.GetByIdAsync(userId));
        }

        [Test]
        public async Task InsertAsync_WhenUserIsValid_ReturnsUserResponse()
        {
            // Arrange
            var userDto = new UserDTO();
            var validationResult = new ValidationResult();
            var user = new User();
            var userResponse = new UserResponse();

            _validatorMock.Setup(validator => validator.ValidateAsync(userDto, default)).ReturnsAsync(validationResult);
            _mapperMock.Setup(mapper => mapper.Map<User>(userDto)).Returns(user);
            _userRepoMock.Setup(repo => repo.GenerateUserInformation(user)).ReturnsAsync(user);
            _userRepoMock.Setup(repo => repo.InsertAsync(user)).Returns(Task.CompletedTask);
            _userRepoMock.Setup(repo => repo.FindUserByUserNameAsync(user.UserName)).ReturnsAsync(user);
            _mapperMock.Setup(mapper => mapper.Map<UserResponse>(user)).Returns(userResponse);

            // Act
            var result = await _userService.InsertAsync(userDto);

            // Assert
            Assert.That(result, Is.EqualTo(userResponse));
        }

        [Test]
        public void InsertAsync_WhenUserIsInvalid_ThrowsDataInvalidException()
        {
            // Arrange
            var userDto = new UserDTO();
            var validationResult = new ValidationResult(new List<ValidationFailure> {
                new ValidationFailure("PropertyName", "Error message")
            });

            _validatorMock.Setup(validator => validator.ValidateAsync(userDto, default)).ReturnsAsync(validationResult);

            // Act & Assert
            Assert.ThrowsAsync<DataInvalidException>(() => _userService.InsertAsync(userDto));
        }

        [Test]
        public async Task ChangePasswordAsync_WhenOldPasswordIsCorrect_ChangesPassword()
        {
            // Arrange
            var changePasswordDto = new ChangePasswordDTO { Id = 1, OldPassword = "oldPass", NewPassword = "NewPass123!" };
            var user = new User { Id = 1, Password = "oldPass" };

            _userRepoMock.Setup(repo => repo.GetByIdAsync(changePasswordDto.Id)).ReturnsAsync(user);

            // Act
            var result = await _userService.ChangePasswordAsync(changePasswordDto);

            // Assert
            Assert.That(result, Is.True);
            Assert.That(user.Password, Is.EqualTo(changePasswordDto.NewPassword));
        }

        [Test]
        public void ChangePasswordAsync_WhenOldPasswordIsIncorrect_ThrowsDataInvalidException()
        {
            // Arrange
            var changePasswordDto = new ChangePasswordDTO { Id = 1, OldPassword = "wrongPass", NewPassword = "NewPass123!" };
            var user = new User { Id = 1, Password = "oldPass" };

            _userRepoMock.Setup(repo => repo.GetByIdAsync(changePasswordDto.Id)).ReturnsAsync(user);

            // Act & Assert
            Assert.ThrowsAsync<DataInvalidException>(() => _userService.ChangePasswordAsync(changePasswordDto));
        }

        [Test]
        public async Task LoginAsync_WhenCredentialsAreCorrect_ReturnsLoginResponse()
        {
            // Arrange
            var loginDto = new LoginDTO { UserName = "user", Password = "password" };
            var user = new User { UserName = "user", Password = "password" };
            var token = "token";

            _userRepoMock.Setup(repo => repo.FindUserByUserNameAsync(loginDto.UserName)).ReturnsAsync(user);
            _tokenServiceMock.Setup(tokenService => tokenService.GenerateJWTWithUser(It.IsAny<User>(), It.IsAny<IEnumerable<Claim>?>())).Returns(token);

            // Act
            var result = await _userService.LoginAsync(loginDto);

            // Assert
            Assert.That(result.Flag, Is.True);
            Assert.That(result.Message, Is.EqualTo("Login success"));
            Assert.That(result.Token, Is.EqualTo(token));
        }

        [Test]
        public async Task LoginAsync_WhenCredentialsAreIncorrect_ReturnsLoginResponse()
        {
            // Arrange
            var loginDto = new LoginDTO { UserName = "user", Password = "wrongPassword" };
            var user = new User { UserName = "user", Password = "password" };

            _userRepoMock.Setup(repo => repo.FindUserByUserNameAsync(loginDto.UserName)).ReturnsAsync(user);

            // Act
            var result = await _userService.LoginAsync(loginDto);

            // Assert
            Assert.That(result.Flag, Is.False);
            Assert.That(result.Message, Is.EqualTo("Invalid credentials"));
        }

        [Test]
        public async Task GetFilterAsync_ReturnsPaginationResponse()
        {
            // Arrange
            var filterRequest = new UserFilterRequest();
            var users = new List<User> { new User() };
            var paginationResponse = new PaginationResponse<User>(users, 1);
            var userResponses = new List<UserResponse> { new UserResponse() };

            _userRepoMock.Setup(repo => repo.GetFilterAsync(filterRequest)).ReturnsAsync(paginationResponse);
            _mapperMock.Setup(mapper => mapper.Map<IEnumerable<UserResponse>>(users)).Returns(userResponses);

            // Act
            var result = await _userService.GetFilterAsync(filterRequest);

            // Assert
            Assert.That(result.Data, Is.EqualTo(userResponses));
            Assert.That(result.TotalCount, Is.EqualTo(1));
        }

    }

}
