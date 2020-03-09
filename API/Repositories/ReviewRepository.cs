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
    public class ReviewRepository : GenericRepository<Review>
    {
        public ReviewRepository(EPAGRIFFINEntities context)
           : base(context)
        {
        }

       

        
        public async Task<ViewPersonReview> GetViewReviewById(int id)
        {

            return await this.context.ViewPersonReviews.FirstOrDefaultAsync(q => q.Id == id);
        }
        


    }
}