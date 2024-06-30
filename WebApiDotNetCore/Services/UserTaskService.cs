using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApiDotNetCore.DTOs;
using WebApiDotNetCore.DTOs.SecurityDTOs;
using WebApiDotNetCore.Entities;

namespace WebApiDotNetCore.Services
{
    public class UserTaskService(User userInfo, string ip, MapperHelper mapperHelper, ApplicationDbContext context)
    {
        private readonly ApplicationDbContext context = context;
        private string ip = ip;
        private readonly MapperHelper mapperHelper = mapperHelper;

        public async Task<List<UserTaskDTO>> GetUserTasksAsync() => 
              mapperHelper.GetMappedList<UserTask, UserTaskDTO>(await context.UserTasks
                .Where(ut => ut.User.UserName == userInfo.UserName && ut.Active)
                .ToListAsync(), x=> true)

           ;

        public async Task<UserTaskDTO> CreateUserTaskAsync(UserTaskDTO userTaskDto)
        {
            var userTask = new UserTask()
            {
                Name = userTaskDto.Name,
                Description = userTaskDto.Description,
                Responsible = userTaskDto.Responsible,
                IdUser = userInfo.Id,
                Active = true,
            };
            await context.UserTasks.AddAsync(userTask);
            await context.SaveChangesAsync();
            return mapperHelper.GetMappedObject<UserTask, UserTaskDTO>(userTask);
        }

        public async Task<UserTaskDTO> UpdateUserTaskAsync( UserTaskDTO userTaskDto)
        {
            var userTask = await context.UserTasks.FirstOrDefaultAsync(x => x.IdUserTask == userTaskDto.IdUserTask) ?? 
                throw new Exception("Ocurrio un error al actualizar la tarea");
            userTask.Name = userTaskDto.Name;
            userTask.Description = userTaskDto.Description;
            userTask.Responsible = userTaskDto.Responsible;
            await context.SaveChangesAsync();
            return mapperHelper.GetMappedObject<UserTask, UserTaskDTO>(userTask); ;
        }

        public async Task<string> DeleteUserTaskAsync(UserTaskDTO userTaskDto)
        {
            var userTask = await context.UserTasks.FindAsync(userTaskDto.IdUserTask);
            if (userTask == null || userTask.User.UserName != userInfo.UserName)
                throw new Exception("Ocurrio un error al eliminar la tarea");
            userTask.Active = false;
            await context.SaveChangesAsync();
            return "Tarea Eliminada";
        }
    }
}
