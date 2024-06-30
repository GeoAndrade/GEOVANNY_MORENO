using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiDotNetCore.DTOs;
using WebApiDotNetCore.DTOs.SecurityDTOs;
using WebApiDotNetCore.Entities;
using WebApiDotNetCore.Services;
using WebApiDotNetCore.Utilities;

namespace WebApiDotNetCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserTaskController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;
        private readonly IAuthorizationService authorizationService;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<User> userManager;
        private static readonly HttpClient client = new HttpClient();
        protected UserTaskService service;
        private readonly MapperHelper mapperHelper;

        public UserTaskController(IConfiguration configuration,
                                  IAuthorizationService authorizationService,
                                  UserManager<User> userManager,
                                  IHttpContextAccessor httpContextAccessor,
                                  ApplicationDbContext context,
                                  MapperHelper mapperHelper)
        {
            this.authorizationService = authorizationService;
            this.configuration = configuration;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.context = context;
            this.mapperHelper = mapperHelper;
            User userInfo = Task.Run(async () =>
           (await userManager.FindByNameAsync(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c =>
           c.Type.Contains("email", StringComparison.CurrentCultureIgnoreCase))?.Value ?? ""))).Result;

            var ip = httpContextAccessor.HttpContext.Connection.RemoteIpAddress?.ToString();
            this.service = new UserTaskService(userInfo, ip, mapperHelper, context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTaskDTO>>> GetUserTasks() => 
             HTTPHelper.CustomHTTPResponse(HttpCode.OK, await service.GetUserTasksAsync());

        [HttpPost]
        public async Task<ActionResult<UserTaskDTO>> PostUserTask(UserTaskDTO userTaskDto) => 
        HTTPHelper.CustomHTTPResponse(HttpCode.Created, await service.CreateUserTaskAsync(userTaskDto));
        
        [HttpPatch]
        public async Task<ActionResult<UserTaskDTO>> PatchUserTask( UserTaskDTO userTaskDto) => 
        HTTPHelper.CustomHTTPResponse(HttpCode.OK, await service.UpdateUserTaskAsync(userTaskDto));
              
        [HttpDelete]
        public async Task<ActionResult> DeleteUserTask(UserTaskDTO userTaskDto) =>
            HTTPHelper.CustomHTTPResponse(HttpCode.OK, await service.DeleteUserTaskAsync(userTaskDto));
        
        
    }
}
