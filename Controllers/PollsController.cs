using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using VotingApp.BLL;
using VotingApp.BLL.Polls;

namespace VotingApp.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Polls")]
    public class PollsController : Controller
    {
        private IPollService PollService { get; }

        public PollsController(IPollService pollService)
        {
            PollService = pollService;
        }
        // GET: api/Polls
        [HttpGet]
        public IEnumerable<Poll> Get()
        {
            return PollService.GetAllPolls();
        }

        // GET: api/Polls/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "poll";
        }
        
        // POST: api/Polls
        [HttpPost]
        public IActionResult Post([FromBody]Poll poll)
        {
            return Ok(PollService.CreatePoll(poll));
        }
        
        // PUT: api/Polls/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
