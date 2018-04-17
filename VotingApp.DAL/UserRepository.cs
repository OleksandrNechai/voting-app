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
    public class Repository<T> : IRepository<T> where T : IEntity
    {
        public Repository(IFileProvider provider, string fileName)
        {
            FilePath = provider.GetFileInfo(fileName).PhysicalPath;
        }

        private string FilePath { get; }

        public void Add(T entity)
        {
            Write(Read().Concat(new[] { entity }));
        }

        public IEnumerable<T> All()
        {
            return Read();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return All().Where(predicate.Compile());
        }

        public void Remove(T entity)
        {
            Write(Read().Where(e => e.Id != entity.Id));
        }

        private List<T> Read()
        {
            if (!File.Exists(FilePath))
            {
                File.WriteAllText(FilePath, "[]");
            }

            return JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(FilePath));
        }

        private void Write(IEnumerable<T> users)
        {
            File.WriteAllText(FilePath, JsonConvert.SerializeObject(users, Formatting.Indented));
        }
    }
}
