using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VotingApp.BLL.Users;

[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
public class LoginController : Controller
{
    public IUserService UserService { get; }

    public LoginController(IUserService userService)
    {
        UserService = userService;
    }

    [HttpPost("api/login")]
    [AllowAnonymous]
    public async Task<IActionResult> Post([FromBody]Credentials credentials)
    {
        var aligibleUsers = UserService.GetUsersWithName(credentials.UserName);
        if (!aligibleUsers.Any())
        {
            return BadRequest("Incorrect username or password");
        }

        var user = aligibleUsers.First();
        if (UserService.GetHashForPassword(credentials.Password) != user.Password)
        {
            return BadRequest("Incorrect username or password");
        }

        var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, credentials.UserName));
        identity.AddClaim(new Claim(ClaimTypes.Name, credentials.UserName));
        var principal = new ClaimsPrincipal(identity);
        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal,
            new AuthenticationProperties { IsPersistent = credentials.RememberMe });
        return Ok(new { user.Id, user.Email, UserName = user.Name });
    }

    [HttpGet("api/login")]
    [AllowAnonymous]
    public IActionResult Get()
    {
        if (User.Identity.Name != null)
        {
            var aligibleUsers = UserService.GetUsersWithName(User.Identity.Name);
            if (!aligibleUsers.Any())
            {
                return Ok();
            }
            var user = aligibleUsers.First();
            return Ok(new { user.Id, user.Email, UserName = user.Name });
        }
        return Ok();
    }

    [HttpPost("api/logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}

public class Credentials
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}