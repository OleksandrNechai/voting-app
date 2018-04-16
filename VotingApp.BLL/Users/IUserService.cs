using System;
using System.Collections.Generic;
using System.Text;

namespace VotingApp.BLL.Users
{
    public interface IUserService
    {
        IEnumerable<User> GetUsersWithName(string name);
        string GetHashForPassword(string password);
    }
}
