using System;
using System.Collections.Generic;

namespace VotingApp.BLL.Polls
{
    public interface IPollService
    {
        Poll CreatePoll(Poll poll);
        List<Poll> GetAllPolls();
        List<Poll> GetAllPollsOfUser(Guid userId);
        Poll GetPoll(Guid id);
        void IncrementOption(Guid pollId, Guid optionId);
        void DeletePoll(Guid id);
    }
}
