using System.Collections.Generic;

namespace VotingApp.BLL.Polls
{
    public interface IPollService
    {
        Poll CreatePoll(Poll poll);
        List<Poll> GetAllPolls();
    }
}
