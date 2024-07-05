using Microsoft.AspNetCore.Mvc;

public class ControllerActionBase : ControllerBase
{
    public string connectionString = "Server=.\\SQLEXPRESS2019;Database=cms;User Id=sa;Password=password;";
}