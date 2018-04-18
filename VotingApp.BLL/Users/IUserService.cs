using System;
using System.Collections.Generic;
using System.Text;

namespace VotingApp.BLL.Users
{
    public interface IUserService
    {
        IEnumerable<User> GetUsersWithName(string name);
        IEnumerable<User> GetUsersWithId(Guid id);
        IEnumerable<User> GetAllUsers();
        User RegisterUser(User user);
        string GetHashForPassword(string password);
    }
}
