using AutoMapper;
using WebApiDotNetCore.DTOs;
using WebApiDotNetCore.DTOs.SecurityDTOs;
using WebApiDotNetCore.Entities;

namespace WebApiDotNetCore.Utilidades
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {   // Origen, Destino
            CreateMap<User, UserInfoDTO>().ReverseMap();
            CreateMap<UserTask, UserTaskDTO>().ReverseMap();
        }
    }
}