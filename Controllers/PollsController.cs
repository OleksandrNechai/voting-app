using System;
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
        [HttpGet("{userId}")]
        public IActionResult Get(Guid userId)
        {
            try
            {
                return Ok(PollService.GetAllPollsOfUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // POST: api/Polls
        [HttpPost]
        public IActionResult Post([FromBody]Poll poll)
        {
            try
            {
                return Ok(PollService.CreatePoll(poll));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        // PUT: api/Polls/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                PollService.DeletePoll(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
