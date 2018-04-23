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
            if (string.IsNullOrEmpty(poll.Text))
                throw new ApplicationException("Poll text can not be empty");
            if (poll.Options.Any(o => string.IsNullOrEmpty(o.Text)))
                throw new ApplicationException("No option can have empty text");
            Repo.Add(pollToSave);
            return pollToSave;
        }

        public List<Poll> GetAllPolls()
        {
            return Repo.All().ToList();
        }
    }
}
