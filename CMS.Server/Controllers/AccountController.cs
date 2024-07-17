using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Server.Controllers
{
    [Route("[controller]/[action]")]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToPage("/Account/SignedOut");
        }

        [HttpGet("GetLogoff")]
        public async Task<IActionResult> Logoff()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToPage("/Account/SignedOut");
        }

        public class StateIsLoggedIn
        {
            public string user { get; set; }
            public bool isloggedin { get; set; }
        }

        [HttpGet(Name = "GetIsLoggedIn")]
        public async Task<StateIsLoggedIn> IsLoggedIn()
        {
            StateIsLoggedIn state = new StateIsLoggedIn();
            state.user = User.Identity.Name == null ? "" : User.Identity.Name;
            state.isloggedin = User.Identity.IsAuthenticated;

            return state;
        }
    }
}