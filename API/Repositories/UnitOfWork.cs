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

        private CompanyRepository companyRepository;
        public CompanyRepository CompanyRepository
        {
            get
            {

                if (this.companyRepository == null)
                {
                    this.companyRepository = new CompanyRepository(context);
                }
                return companyRepository;
            }
        }


        private ReviewRepository reviewRepository;
        public ReviewRepository ReviewRepository
        {
            get
            {

                if (this.reviewRepository == null)
                {
                    this.reviewRepository = new ReviewRepository(context);
                }
                return reviewRepository;
            }
        }

        private GenericRepository<ViewOption> viewOptionRepository;
        public GenericRepository<ViewOption> ViewOptionRepository
        {
            get
            {

                if (this.viewOptionRepository == null)
                {
                    this.viewOptionRepository = new GenericRepository<ViewOption>(context);
                }
                return viewOptionRepository;
            }
        }

        private GenericRepository<ViewCountry> viewCountryRepository;
        public GenericRepository<ViewCountry> ViewCountryRepository
        {
            get
            {

                if (this.viewCountryRepository == null)
                {
                    this.viewCountryRepository = new GenericRepository<ViewCountry>(context);
                }
                return viewCountryRepository;
            }
        }
        private GenericRepository<AssignedRole> assignedRoleRepository;
        public GenericRepository<AssignedRole> AssignedRoleRepository
        {
            get
            {

                if (this.assignedRoleRepository == null)
                {
                    this.assignedRoleRepository = new GenericRepository<AssignedRole>(context);
                }
                return assignedRoleRepository;
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