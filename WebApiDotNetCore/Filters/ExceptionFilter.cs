using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Net;

namespace WebApiDotNetCore.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ExceptionFilter> logger;

        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            logger.LogError("\n\n----------------------------ERROR-API----------------------------------\n" +
                             $"Request ID: {Activity.Current?.Id}\n" +
                             $"Request TraceIdentifier: {context.HttpContext.TraceIdentifier}\n" +
                             $"Date: {DateTime.UtcNow}\n" +
                             $"Controller: {context.ActionDescriptor.RouteValues["controller"]}\n" +
                             $"Endpoint: {context.ActionDescriptor.DisplayName}\n" +
                             $"Message: {context.Exception.Message}\n" +
                             $"StackTrace: {context.Exception.StackTrace}\n" +
                             $"InnerException: {context.Exception?.InnerException?.ToString() ?? ""}\n" +
                             "-------------------------------------------------------------------------\n\n");
            var errorMessage = context.HttpContext.Request.Method switch
            {
                "POST" => GetErrorMessage(context.Exception),
                "GET" => $"Ocurrió un error en la consulta: {context.Exception.Message}",
                _ => $"Ocurrió un error en el servidor: {context.Exception.Message}"
            };
            context.Result = new ObjectResult(errorMessage)
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };

            base.OnException(context);
        }

        private string GetErrorMessage(Exception exception)
        {
            if (exception is DbUpdateException dbUpdateException)
            {
                foreach (var entry in dbUpdateException.Entries)
                {
                    if (entry != null)
                    {
                        var tableName = entry.Metadata.GetTableName();
                        return $"Ocurrió un error al acceder a la tabla {tableName}: {exception.Message}";
                    }
                }
            }
            return $"Ocurrió un error en el servidor: {exception.Message}, contactarse con soporte.";
        }
    }
}