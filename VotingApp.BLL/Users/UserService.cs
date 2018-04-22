using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace VotingApp.BLL.Users
{
    public class UserService : IUserService
    {

        public IRepository<User> Repo { get; }

        public UserService(IRepository<User> repo)
        {
            Repo = repo;
        }

        public IEnumerable<User> GetUsersWithName(string name)
        {
            return Repo.Find(user => user.Name == name);
        }

        public IEnumerable<User> GetUsersWithId(Guid id)
        {
            return Repo.Find(user => user.Id.Equals(id));
        }

        public IEnumerable<User> GetAllUsers()
        {
            return Repo.All();
        }

        public User RegisterUser(User user)
        {
            var userToSave = user.WithId(Guid.NewGuid()).WithPassword(GetHashForPassword(user.Password));
            if (GetUsersWithName(userToSave.Name).Any())
                throw new ApplicationException("User with such name already exists");
            Repo.Add(userToSave);
            return userToSave;
        }

        public void ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var user = Repo.Find(u => u.Id.Equals(id)).Single();
            if (user.Password != GetHashForPassword(oldPassword))
                throw new ApplicationException("Can not update password, because old password is incorrect.");
            var userToSave = user.WithPassword(GetHashForPassword(newPassword));
            Repo.Remove(user);
            Repo.Add(userToSave);
        }


        public string GetHashForPassword(string password)
        {
            SHA1Managed hashProvider = new SHA1Managed();
            byte[] hashedPassword = Encoding.Unicode.GetBytes(password);
            byte[] hash = hashProvider.ComputeHash(hashedPassword);
            return Encoding.Unicode.GetString(hash);
        }
    }
}
