using AutoMapper;
using Group2.Application.DTOs.AuthDTOs;
using Group2.Domain.Entity;

namespace Group2.Application.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<User, UserLessDTO>();
        }
    }
}
