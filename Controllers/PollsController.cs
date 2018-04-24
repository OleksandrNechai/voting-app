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

        // GET: api/Polls/user/5
        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(Guid userId)
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

        // GET: api/Polls/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                return Ok(PollService.GetPoll(id));
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
        [HttpPut("{pollId}/{optionId}")]
        public IActionResult Put(Guid pollId, Guid optionId)
        {
            try
            {
                PollService.IncrementOption(pollId, optionId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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
