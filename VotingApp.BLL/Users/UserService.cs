using System.Collections.Generic;
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

        public string GetHashForPassword(string password)
        {
            SHA1Managed hashProvider = new SHA1Managed();
            byte[] hashedPassword = Encoding.Unicode.GetBytes(password);
            byte[] hash = hashProvider.ComputeHash(hashedPassword);
            return Encoding.Unicode.GetString(hash);
        }
    }
}
