using System;
using System.Collections.Generic;
using System.Linq;

namespace VotingApp.BLL
{
    public class Poll : IEntity
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public List<Option> Options { get; set; }

        public Poll WithId(Guid id)
        {
            return new Poll
            {
                Id = id,
                Text = Text,
                UserId = UserId,
                Options = Options
            };
        }
        public Poll WithOptions(IEnumerable<Option> options)
        {
            return new Poll
            {
                Id = Id,
                Text = Text,
                UserId = UserId,
                Options = options.ToList()
            };
        }
    }

    public class Option
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public long VotesCount { get; set; }
        public Option WithId(Guid id)
        {
            return new Option
            {
                Id = id,
                Text = Text,
                VotesCount = VotesCount
            };
        }
    }
}
