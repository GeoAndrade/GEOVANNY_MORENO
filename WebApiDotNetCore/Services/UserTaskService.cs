using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiDotNetCore.DTOs;
using WebApiDotNetCore.Entities;

namespace WebApiDotNetCore.Services
{
    public class UserTaskService(User userInfo, string ip, IMapper mapper, ApplicationDbContext context)
    {
        private readonly User _userInfo = userInfo;
        private readonly string _ip = ip;
        private readonly IMapper _mapper = mapper;
        private readonly ApplicationDbContext _context = context;

        public async Task<List<UserTaskDTO>> GetUserTasksAsync() =>
             _mapper.Map<List<UserTaskDTO>>(await _context.UserTasks
                .Where(ut => ut.User.UserName == _userInfo.UserName && ut.Active)
                .ToListAsync());
        

        public async Task<UserTaskDTO> CreateUserTaskAsync(UserTaskDTO userTaskDto)
        {
            var userTask = new UserTask()
            {
                Name = userTaskDto.Name,
                Description = userTaskDto.Description,
                Responsible = userTaskDto.Responsible,
                IdUser = _userInfo.Id,
                Active = true,
            };

            await _context.UserTasks.AddAsync(userTask);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserTaskDTO>(userTask);
        }

        public async Task<UserTaskDTO> UpdateUserTaskAsync(UserTaskDTO userTaskDto)
        {
            var userTask = await _context.UserTasks.FirstOrDefaultAsync(x => x.IdUserTask == userTaskDto.IdUserTask);
            if (userTask == null || userTask.User.UserName != _userInfo.UserName)
                throw new Exception("Ocurrió un error al actualizar la tarea");

            userTask.Name = userTaskDto.Name;
            userTask.Description = userTaskDto.Description;
            userTask.Responsible = userTaskDto.Responsible;

            await _context.SaveChangesAsync();

            return _mapper.Map<UserTaskDTO>(userTask);
        }

        public async Task<string> DeleteUserTaskAsync(UserTaskDTO userTaskDto)
        {
            var userTask = await _context.UserTasks.FindAsync(userTaskDto.IdUserTask);
            if (userTask == null || userTask.User.UserName != _userInfo.UserName)
                throw new Exception("Ocurrió un error al eliminar la tarea");

            userTask.Active = false;
            await _context.SaveChangesAsync();

            return "Tarea Eliminada";
        }
    }
}
