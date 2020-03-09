using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.OData;
using API.Models;
using System.Web.Http.Description;
using System.Collections.Generic;
using System;
using System.Data.Entity.Validation;
using System.Web.Http.Cors;
using System.Web.Http.ModelBinding;
using API.Repositories;
using System.Text;
using System.Configuration;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReviewController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        [Route("api/reviews/{id}")]
        public async Task<IHttpActionResult> GetPersonReview(int id)
        {
            var review = await unitOfWork.ReviewRepository.GetViewReviewById(id);
            if (review == null)
                return NotFound();
             


            return Ok(review);
        }

        [Route("api/reviews/update")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUpdateReview(ViewModels.ReviewDto dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }
            // var validate = unitOfWork.PersonMiscRepository.Validate(dto);
            // if (validate.Code != HttpStatusCode.OK)
            //      return validate;

            Review entity = await unitOfWork.ReviewRepository.GetByID(dto.Id);

            
            if (entity == null)
                return Exceptions.getNotFoundException();

            entity.Body = dto.Body;


            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            
            var review = await unitOfWork.ReviewRepository.GetViewReviewById(dto.Id);
            return Ok(review.BodyAbs);
        }


        [Route("api/reviews/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserPublication(ViewModels.ReviewDto dto)
        {
            var entity = await unitOfWork.ReviewRepository.GetByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.ReviewRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;
            var activity = (await unitOfWork.PersonRepository.GetPersonContentActivity(dto.UserId)).data;
            return Ok(activity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //db.Dispose();
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}
