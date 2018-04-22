using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VotingApp.BLL;
using VotingApp.BLL.Users;

namespace VotingApp.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        public IUserService UserService { get; }

        public UsersController(IUserService userService)
        {
            UserService = userService;
        }
        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return UserService.GetAllUsers();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return UserService.GetUsersWithId(Guid.Parse(id)).First();
        }
        
        // POST: api/Users
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                return Ok(UserService.RegisterUser(user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // PUT: api/Users/5
        [HttpPut("{id}/{oldPassword}/{newPassword}")]
        public IActionResult Put(Guid id, string oldPassword, string newPassword)
        {
            try
            {
                UserService.ChangePassword(id, oldPassword, newPassword);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
