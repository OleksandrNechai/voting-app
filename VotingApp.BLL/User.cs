using System;
using System.Collections.Generic;
using System.Text;

namespace VotingApp.BLL
{
    public interface IEntity
    {
        Guid Id { get; set; }
    }
    public class User : IEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User WithId(Guid id)
        {
            return new User
            {
                Id = id,
                Name = Name,
                Email = Email,
                Password = Password
            };
        }

        public User WithPassword(string password)
        {
            return new User
            {
                Id = Id,
                Name = Name,
                Email = Email,
                Password = password
            };
        }
    }
}
