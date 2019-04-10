using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace API.Repositories
{
    public class UnitOfWork : IDisposable
    {
        private EPAGRIFFINEntities context = null;
        public UnitOfWork()
        {
            context = new EPAGRIFFINEntities();
            context.Configuration.LazyLoadingEnabled = false;
        }

        private PersonRepository personRepository;
        public PersonRepository PersonRepository
        {
            get
            {

                if (this.personRepository == null)
                {
                    this.personRepository = new PersonRepository(context);
                }
                return personRepository;
            }
        }

        public async Task<CustomActionResult> SaveAsync()
        {
            // context.SaveChanges();
            var result = await context.SaveAsync();
            return result;
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}