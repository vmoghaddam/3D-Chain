using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net;

namespace API.Repositories
{
    public class PersonRepository : GenericRepository<Person>
    {
        public PersonRepository(EPAGRIFFINEntities context)
           : base(context)
        {
        }

        public IQueryable<ViewPerson> GetViewPeople()
        {
            return this.GetQuery<ViewPerson>();
        }

        public async Task<ViewPerson> GetViewPersonByUserId(string id)
        {

            return await this.context.ViewPersons.FirstOrDefaultAsync(q => q.UserId == id);
        }

    }
}