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
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;

using System.Web;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BaseController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        [Route("api/options/{parentId}")]
        [EnableQuery]
        public IQueryable<ViewOption> GetOptionsByParentId(int parentId)
        {

            return unitOfWork.ViewOptionRepository.GetQuery().Where(q => q.ParentId == parentId).OrderBy(q => q.OrderIndex).ThenBy(q => q.Title);
        }

        [Route("api/countries")]
        [EnableQuery]
        public IQueryable<ViewCountry> GetCountries()
        {

            return unitOfWork.ViewCountryRepository.GetQuery().OrderBy(q => q.Name);
        }

        [Route("api/jobs")]
        [EnableQuery]
        public IQueryable<AssignedRole> GetJobs()
        {

            return unitOfWork.AssignedRoleRepository.GetQuery().OrderBy(q => q.AssignedRole1);
        }



        private List<string> GetErrorResult(IdentityResult result)
        {

            var _result = new List<string>();
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        _result.Add(error);
                    }
                }



                return _result;
            }

            return null;
        }
        [Route("api/users/register")]

        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUserRegister(dynamic dto)
        {
            var email = Convert.ToString(dto.Email);
            var password = Convert.ToString(dto.Password);
            var userName = Convert.ToString(dto.UserName);
            var fn = Convert.ToString(dto.FirstName);
            var ln = Convert.ToString(dto.LastName);

            ApplicationUserManager UserManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            
            var user = new ApplicationUser() { UserName = userName, Email = email };

            IdentityResult result = await UserManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                return new CustomActionResult(HttpStatusCode.BadRequest, GetErrorResult(result));

            }

            ApplicationUser created = await UserManager.FindByNameAsync(userName);
            if (dto.Roles != null)
            {
                var roles = JsonConvert.DeserializeObject<List<string>>(JsonConvert.SerializeObject(dto.Roles)); //dto.Roles as List<string>;
                foreach (var x in roles)
                {
                    await UserManager.AddToRoleAsync(created.Id, x);

                }

            }
            else
            {
                await UserManager.AddToRoleAsync(created.Id, "User");
            }


            //var ext = new UserExt()
            //{
            //    Id = created.Id,
            //    FirstName = fn,
            //    LastName = ln,
            //};

            //unitOfWork.PersonRepository.Insert(ext);
            var person = new Person()
            {
                SexId = 30,
                UserId = created.Id,
                FirstName = fn,
                LastName = ln,
                DateCreate = DateTime.Now,
                IsActive = true,
                IsDeleted = false,
                 Email=email,
                 ImageUrl="user.png"
            };
            unitOfWork.PersonRepository.Insert(person);
            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;


            return Ok(dto);




        }


        [Route("api/researcher/register")]

        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostResearcherRegister(dynamic dto)
        {
            var email = Convert.ToString(dto.Email);
            var password = Convert.ToString(dto.Password);
            var userName = Convert.ToString(dto.UserName);
            var fn = Convert.ToString(dto.FirstName);
            var ln = Convert.ToString(dto.LastName);
            var degree= Convert.ToString(dto.Degree);
            var company = Convert.ToString(dto.Company);
            var position = Convert.ToString(dto.Position);
            var website = Convert.ToString(dto.Website);
            var linkedIn = Convert.ToString(dto.LinkedIn);
            var location = Convert.ToString(dto.Location);
            string groups = Convert.ToString(dto.Groups);
            var networks = groups.Split('_').Select(q => Convert.ToInt32(q)).ToList();



            ApplicationUserManager UserManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

            var user = new ApplicationUser() { UserName = userName, Email = email };

            IdentityResult result = await UserManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                return new CustomActionResult(HttpStatusCode.BadRequest, GetErrorResult(result));

            }

            ApplicationUser created = await UserManager.FindByNameAsync(userName);
            await UserManager.AddToRoleAsync(created.Id, "Researcher");
            //if (dto.Roles != null)
            //{
            //    var roles = JsonConvert.DeserializeObject<List<string>>(JsonConvert.SerializeObject(dto.Roles)); //dto.Roles as List<string>;
            //    foreach (var x in roles)
            //    {
            //        await UserManager.AddToRoleAsync(created.Id, x);

            //    }

            //}
            //else
            //{
            //    await UserManager.AddToRoleAsync(created.Id, "User");
            //}


            //var ext = new UserExt()
            //{
            //    Id = created.Id,
            //    FirstName = fn,
            //    LastName = ln,
            //};

            //unitOfWork.PersonRepository.Insert(ext);
            var person = new Person()
            {
                SexId = 30,
                UserId = created.Id,
                FirstName = fn,
                LastName = ln,
                DateCreate = DateTime.Now,
                IsActive = true,
                IsDeleted = false,
                Email = email,
                ImageUrl = "user.png",
                LinkedIn=linkedIn,
                Website=website,
                Company=company,
                Degree=degree,
                Position2=position,
                Location2=location,
            };
            foreach (var item in networks)
                person.PersonNetworks.Add(new PersonNetwork() { NetworkId = item });
            unitOfWork.PersonRepository.Insert(person);
            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;


            return Ok(dto);




        }

        [Route("api/resp")]
        [EnableQuery]
        public async Task<IHttpActionResult> GetResp()
        {
            var users = await this.unitOfWork.PersonRepository.GetAspUsers().Where(q => q.UserName.StartsWith("babak@3dchain.io")).ToListAsync();
            foreach (var x in users)
            {
                ApplicationUserManager UserManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                var user = await UserManager.FindByIdAsync(x.Id);
                
                var token = await UserManager.GeneratePasswordResetTokenAsync(x.Id);
                IdentityResult result = await UserManager.ResetPasswordAsync(x.Id, token, /*x.UserName*/"babak" + "1234@");
            }

            //var companies =await this.unitOfWork.CompanyRepository.GetCompanies().Where(q => !string.IsNullOrEmpty(q.Email) && string.IsNullOrEmpty(q.UserId)).ToListAsync();
            //foreach(var x in companies)
            //{
            //    ApplicationUserManager UserManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            //    var user = new ApplicationUser() { UserName = x.Email.ToLower(), Email = x.Email.ToLower() };
            //    var pass = x.Email.Split('@')[0]+"1234@";
            //    IdentityResult result = await UserManager.CreateAsync(user, pass.ToLower());
            //    if (!result.Succeeded)
            //    {
            //      //  return new CustomActionResult(HttpStatusCode.BadRequest, GetErrorResult(result));

            //    }
            //    else
            //    {
            //        ApplicationUser created = await UserManager.FindByNameAsync(user.UserName);
            //        await UserManager.AddToRoleAsync(created.Id, "Company");
            //        x.UserId = created.Id;

            //    }


            //}
            //var saveResult = await unitOfWork.SaveAsync();
            //if (saveResult.Code != HttpStatusCode.OK)
            //    return saveResult;
            return Ok(true);
        }

        [Route("api/password/change")]
        [EnableQuery]
        public async Task<IHttpActionResult> PostChangePassword(dynamic dto)
        {
            var password = Convert.ToString(dto.Password);
            var old = Convert.ToString(dto.Old);
            var username= Convert.ToString(dto.UserName);

            ApplicationUserManager UserManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            ApplicationUser user = await UserManager.FindByNameAsync(username);
            IdentityResult result = await UserManager.ChangePasswordAsync(user.Id, old, password);
            if (!result.Succeeded)
            {
                return new CustomActionResult(HttpStatusCode.BadRequest, GetErrorResult(result));

            }
             
            return Ok(true);
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
