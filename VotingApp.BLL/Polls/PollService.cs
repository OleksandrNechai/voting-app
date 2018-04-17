using System;
using System.Collections.Generic;
using System.Linq;

namespace VotingApp.BLL.Polls
{
    public class PollService : IPollService
    {
        private IRepository<Poll> Repo { get; }

        public PollService(IRepository<Poll> repo)
        {
            Repo = repo;
        }

        public Poll CreatePoll(Poll poll)
        {
            var pollToSave = poll
                .WithId(Guid.NewGuid())
                .WithOptions(poll.Options
                    .Select(option => option.WithId(Guid.NewGuid())));

            Repo.Add(pollToSave);
            return pollToSave;
        }

        public List<Poll> GetAllPolls()
        {
            return Repo.All().ToList();
        }
    }
}
