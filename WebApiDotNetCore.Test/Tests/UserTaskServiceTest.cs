using WebApiDotNetCore.Entities;

namespace WebApiDotNetCore.Test.Tests
{
    [TestFixture]
    public class UserTaskServiceTest : BaseTest
    {
        [Test]
        public async Task GetUserTasks_Test()
        {
            // Preparación
            var context = CreateContext("UserTaskServiceTestDB");
            var user = CreateUser();
            //Guardar usuario en db in memory
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync(); 
            //Servicio
            var service = CreateUserTaskService(user, "127.0.0.1", ConfigAutoMapper(), context);
            //Datos
            var userTasks = new List<UserTask>
            {
                new() { IdUserTask = 1, Name = "Test Task 1", Description = "Description 1", Responsible = "Responsible 1", IdUser = user.Id, Active = true },
                new() { IdUserTask = 2, Name = "Test Task 2", Description = "Description 2", Responsible = "Responsible 2", IdUser = user.Id, Active = true }
            };
            //Guardado en db In memory
            await context.UserTasks.AddRangeAsync(userTasks);
            await context.SaveChangesAsync(); 
            //Resultado
            var result = await service.GetUserTasksAsync();
            Assert.That(result, Has.Count.EqualTo(2));
        }
    }
}
