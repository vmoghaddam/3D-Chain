using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.OData;

using System.Web.Http.Description;
using System.Collections.Generic;
using System;
using System.Data.Entity.Validation;
using System.Web.Http.Cors;
using System.Web.Http.ModelBinding;
using API.Repositories;
using API.Models;
using System.Text;
using System.Configuration;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        //[Route("api/users/profiles")]
        //[EnableQuery]
        //public IQueryable<ViewPerson> GetCountries()
        //{

        //    return unitOfWork.PersonRepository.GetViewPeople().OrderByDescending(q => q.DateJoin);
        //}


        [Route("api/users/profiles")]
        [EnableQuery]
        public async Task<IHttpActionResult> GetProfiles(int skip,int take,int? nid=null
            ,string Location="",string Name="",string Position="",string University="",string Networks="",string exc="")
        {
            //http://localhost:58909/api/users/profiles?Location=h&Name=n&Networks=j&Position=r&University=g&skip=0&take=5
            var query = unitOfWork.PersonRepository.GetViewPeople();//.OrderByDescending(q => q.DateJoin);
            if (nid != null)
            {
                query = query.Where(q => q.NetworkIds == nid.ToString() || q.NetworkIds.Contains(nid.ToString() + ","));
            }
            if (!string.IsNullOrEmpty(exc))
            {
                var exc_prts = exc.Split('_') ;
                foreach(var x in exc_prts)
                {
                    query = query.Where(q => q.NetworkIds != x && !q.NetworkIds.Contains(x + ","));
                }
            }
            if (!string.IsNullOrEmpty(Name))
            {
                Name = Name.ToLower();
                query = query.Where(q => q.Name.ToLower().Contains(Name));
            }
            if (!string.IsNullOrEmpty(Position))
            {
                Position = Position.ToLower();
                query = query.Where(q => q.Position.ToLower().Contains(Position));
            }
            if (!string.IsNullOrEmpty(Location))
            {
                Location = Location.ToLower();
                query = query.Where(q => q.Location.ToLower().Contains(Location));
            }
            if (!string.IsNullOrEmpty(University))
            {
                University = University.ToLower();
                query = query.Where(q => q.University.ToLower().Contains(University));
            }
            if (Networks != null)
            {
                Networks = Networks.ToLower();
                query = query.Where(q =>   q.Networks.Contains(Networks  ));
            }
            var oquery = query.OrderByDescending(q => q.DateJoin);
            var _totalCount =await query.CountAsync();
            var query2 = oquery.Skip(skip).Take(take);
            var _items =await query2.ToListAsync();
            var result =new 
            {
                totalCount=_totalCount,
                items=_items,
            };
            return Ok(result);
        }


        //return NotFound();
        [Route("api/users/profile/{id}")]
        public async Task<IHttpActionResult> GetPersonProfile(int id)
        {
            var user = await unitOfWork.PersonRepository.GetViewPersonById(id);
            if (user == null)
                return NotFound();
            var publications = (await unitOfWork.PersonRepository.GetPersonViewPublications(id)).data as List<ViewPersonPublication>;
            var certifications = (await unitOfWork.PersonRepository.GetPersonViewCertifications(id)).data as List<ViewCertification>;
            var projects = (await unitOfWork.PersonRepository.GetPersonViewProjects(id)).data as List<ViewProject>;
            var awards = (await unitOfWork.PersonRepository.GetPersonViewAwards(id)).data as List<ViewAward>;
            var patents = (await unitOfWork.PersonRepository.GetPersonViewPatents(id)).data as List<ViewPersonPatent>;
            var networks = (await unitOfWork.PersonRepository.GetPersonViewNetworks(id)).data;
            var activity = (await unitOfWork.PersonRepository.GetPersonContentActivity(id)).data;
            //  var accompolishments = (await unitOfWork.PersonRepository.GetPersonAccompolishments(id)).data;
            //var _plan = await unitOfWork.FlightRepository.GetViewFlightPlans().FirstOrDefaultAsync(q => q.Id == id);
            //var ms = await unitOfWork.FlightRepository.GetFlightPlanMonth(id);
            //var ds = await unitOfWork.FlightRepository.GetFlightPlanDays(id);
            List<ViewModels.AccomplishmentObject> accs = new List<ViewModels.AccomplishmentObject>();
            foreach (var x in publications)
            {
                accs.Add(new ViewModels.AccomplishmentObject()
                {
                    Date = x.Date,
                    Item = x,
                    Type = "publication"
                });
            }
            foreach (var x in patents)
            {
                accs.Add(new ViewModels.AccomplishmentObject()
                {
                    Date = x.Date,
                    Item = x,
                    Type = "patent"
                });
            }
            foreach (var x in awards)
            {
                accs.Add(new ViewModels.AccomplishmentObject()
                {
                    Date = x.Date,
                    Item = x,
                    Type = "award"
                });
            }
            foreach (var x in projects)
            {
                accs.Add(new ViewModels.AccomplishmentObject()
                {
                    Date = x.Date,
                    Item = x,
                    Type = "project"
                });
            }
            foreach (var x in certifications)
            {
                accs.Add(new ViewModels.AccomplishmentObject()
                {
                    Date =null,
                    Item = x,
                    Type = "certification"
                });
            }

            accs = accs.OrderByDescending(q => q.Date).ToList();

            dynamic result = new
            {
                User = user,
                Publications = publications,
                Awards = awards,
                Projects = projects,
                Patents = patents,
                Certifications = certifications,
                Networks = networks,
                Activity = activity,
                Accompolishments = accs,
                Summary = new
                {
                    Reviews = (await unitOfWork.PersonRepository.GetPersonReviewCount(id)).data,
                }
            };


            return Ok(result);
        }


        [Route("api/users/accompolishments/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserAccompolishments(ViewModels.AccomplishmentDto dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }

            await unitOfWork.PersonRepository.SaveAccompolishments(dto);


            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            var result = (await unitOfWork.PersonRepository.GetPersonAccompolishments(dto.Id)).data;
            return Ok(result);
        }



        [Route("api/users/publication/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserPublication(ViewModels.PersonPublicationDto dto)
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

            PersonPublication entity = null;

            if (dto.Id == -1)
            {
                entity = new PersonPublication();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetPublicationByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.PersonPublicationDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }

        [Route("api/users/publication/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserPublication(ViewModels.PersonPublicationDto dto)
        {
            var entity = await unitOfWork.PersonRepository.GetPublicationByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.PersonRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(dto);
        }

        [Route("api/users/project/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserProject(ViewModels.PersonProjectDto dto)
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

            PersonProject entity = null;

            if (dto.Id == -1)
            {
                entity = new PersonProject();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetProjectByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.PersonProjectDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }

        [Route("api/users/project/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserProject(ViewModels.PersonProjectDto dto)
        {
            var entity = await unitOfWork.PersonRepository.GetProjectByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.PersonRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(dto);
        }

        [Route("api/users/patent/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserPatent(ViewModels.PersonPatentDto dto)
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

            PersonPatent entity = null;

            if (dto.Id == -1)
            {
                entity = new PersonPatent();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetPatentByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.PersonPatentDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }

        [Route("api/users/patent/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserPatent(ViewModels.PersonPatentDto dto)
        {
            var entity = await unitOfWork.PersonRepository.GetPatentByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.PersonRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(dto);
        }

        [Route("api/users/certification/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserCertification(ViewModels.PersonCertificationDto dto)
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

            PersonCertification entity = null;

            if (dto.Id == -1)
            {
                entity = new PersonCertification();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetCertificationByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.PersonCertificationDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }

        [Route("api/users/certification/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserCertification(ViewModels.PersonCertificationDto dto)
        {
            var entity = await unitOfWork.PersonRepository.GetCertificationByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.PersonRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(dto);
        }


        [Route("api/users/award/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserAward(ViewModels.PersonAwardDto dto)
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

            PersonAward entity = null;

            if (dto.Id == -1)
            {
                entity = new PersonAward();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetAwardByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.PersonAwardDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }


        [Route("api/users/award/delete")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> DeleteUserAward(ViewModels.PersonAwardDto dto)
        {
            var entity = await unitOfWork.PersonRepository.GetAwardByID(dto.Id);

            if (entity == null)
            {
                return NotFound();
            }
            //var canDelete = unitOfWork.PersonRepository.CanDelete(entity);
            //if (canDelete.Code != HttpStatusCode.OK)
            //    return canDelete;

            unitOfWork.PersonRepository.Delete(entity);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(dto);
        }


        [Route("api/users/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUser(ViewModels.ViewPersonDto dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }
            var validate = unitOfWork.PersonRepository.Validate(dto);
            if (validate.Code != HttpStatusCode.OK)
                return validate;

            Person entity = null;

            if (dto.Id == -1)
            {
                entity = new Person();
                unitOfWork.PersonRepository.Insert(entity);
            }

            else
            {
                entity = await unitOfWork.PersonRepository.GetByID(dto.Id);

            }

            if (entity == null)
                return Exceptions.getNotFoundException();

            //ViewModels.Location.Fill(entity, dto);
            ViewModels.ViewPersonDto.Fill(entity, dto);



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            var user = await unitOfWork.PersonRepository.GetViewPersonById(entity.Id);
            return Ok(user);
        }

        [Route("api/users/image/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserImage(ViewModels.PersonImageDto dto)
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

            var entity = await unitOfWork.PersonRepository.GetByID(dto.Id);

            if (entity == null)
                return Exceptions.getNotFoundException();

            entity.ImageUrl = dto.Image;



            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            dto.Id = entity.Id;
            return Ok(dto);
        }


        [Route("api/users/networks/update")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUpdateReview(ViewModels.PersonNetworksDto dto)
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

            unitOfWork.PersonRepository.UpdateUserNetworks(dto);


            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;


            var networks = (await unitOfWork.PersonRepository.GetPersonViewNetworks(dto.UserId)).data;
            return Ok(networks);
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
