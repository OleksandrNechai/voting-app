using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VotingApp.BLL;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using System.IO;
using System.Linq;

namespace VotingApp.DAL
{
    public class UserRepository : IRepository<User>
    {
        public UserRepository(IFileProvider provider)
        {
            FilePath = provider.GetFileInfo("users.json").PhysicalPath;
        }

        private string FilePath { get; }

        public void Add(User entity)
        {
            WriteUsers(GetUsers().Concat(new[] { entity }));
        }

        public IEnumerable<User> All()
        {
            return GetUsers();
        }

        public IEnumerable<User> Find(Expression<Func<User, bool>> predicate)
        {
            return All().Where(predicate.Compile());
        }

        public void Remove(User entity)
        {
            WriteUsers(GetUsers().Where(e => e.Id != entity.Id));
        }

        private List<User> GetUsers()
        {
            return JsonConvert.DeserializeObject<List<User>>(File.ReadAllText(FilePath));
        }

        private void WriteUsers(IEnumerable<User> users)
        {
            File.WriteAllText(FilePath, JsonConvert.SerializeObject(users, Formatting.Indented));
        }
    }
}
