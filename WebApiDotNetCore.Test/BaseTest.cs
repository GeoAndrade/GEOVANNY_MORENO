using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApiDotNetCore.DTOs;
using WebApiDotNetCore.Entities;
using WebApiDotNetCore.Services;
using AutoMapper;

namespace WebApiDotNetCore.Test
{
    public class BaseTest
    {
        protected static ApplicationDbContext CreateContext(string dbName)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
               .UseInMemoryDatabase(dbName)
               .Options;
            var dbContext = new ApplicationDbContext(options);
            return dbContext;
        }

        protected static IMapper ConfigAutoMapper()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserTask, UserTaskDTO>().ReverseMap();
            });
          return mapperConfig.CreateMapper();

        }

        protected static User CreateUser()
        {
            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "testuser"
            };
            return user;
        }

        protected static UserTaskService CreateUserTaskService(User user, string ip,IMapper mapper,  ApplicationDbContext context )
        {
            var service = new UserTaskService(user, ip, mapper, context);
            return service;
        }
    }
}
