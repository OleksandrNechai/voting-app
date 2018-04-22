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
        void ChangePassword(Guid id, string oldPassword, string newPassword);
        string GetHashForPassword(string password);
    }
}
