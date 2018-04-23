using System;
using System.Collections.Generic;

namespace VotingApp.BLL.Polls
{
    public interface IPollService
    {
        Poll CreatePoll(Poll poll);
        List<Poll> GetAllPolls();
        List<Poll> GetAllPollsOfUser(Guid userId);
        void DeletePoll(Guid id);
    }
}
