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
        public IQueryable<AspNetUser> GetAspUsers()
        {
            return this.GetQuery<AspNetUser>();
        }

        public async Task<ViewPerson> GetViewPersonByUserId(string id)
        {

            return await this.context.ViewPersons.FirstOrDefaultAsync(q => q.UserId == id);
        }
        public async Task<ViewPerson> GetViewPersonById(int id)
        {

            return await this.context.ViewPersons.FirstOrDefaultAsync(q => q.Id == id);
        }
        public async Task<CustomActionResult> GetPersonViewPublications(int id)
        {

            var query = this.context.ViewPersonPublications.Where(q => q.PersonId == id).OrderByDescending(q=>q.Date);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonViewProjects(int id)
        {

            var query = this.context.ViewProjects.Where(q => q.PersonId == id).OrderByDescending(q => q.Date);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonViewPatents(int id)
        {

            var query = this.context.ViewPersonPatents.Where(q => q.PersonId == id).OrderByDescending(q => q.Date);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonViewCertifications(int id)
        {

            var query = this.context.ViewCertifications.Where(q => q.PersonId == id).OrderByDescending(q => q.Title);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonViewAwards(int id)
        {

            var query = this.context.ViewAwards.Where(q => q.PersonId == id).OrderByDescending(q => q.Date);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonViewNetworks(int id)
        {

            var query = this.context.ViewPersonNetworks.Where(q => q.PersonId == id);
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }
        public async Task<CustomActionResult> GetPersonContentActivity(int id)
        {

            var query = from x in this.context.ViewUserContentActivities
                        where x.PersonId==id
                        group x by x.Type into g
                        select g.OrderByDescending(q => q.Date).FirstOrDefault();
            
            var result = await query.ToListAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }

        public async Task<CustomActionResult> GetPersonReviewCount(int id)
        {

            var query = this.context.Reviews.Where(q => q.PersonId == id);
            var result = await query.CountAsync();
            return new CustomActionResult(HttpStatusCode.OK, result);
        }

        public async Task<CustomActionResult> GetPersonAccompolishments(int id)
        {

            var result = new ViewModels.PersonAccompolishmentsDto();
            result.Publication =await this.context.ViewPersonPublications.FirstOrDefaultAsync(q => q.PersonId == id);
            result.Project = await this.context.ViewProjects.FirstOrDefaultAsync(q => q.PersonId == id);
            result.Patent = await this.context.ViewPersonPatents.FirstOrDefaultAsync(q => q.PersonId == id);
            result.Certification = await this.context.ViewCertifications.FirstOrDefaultAsync(q => q.PersonId == id);
            result.Award = await this.context.ViewAwards.FirstOrDefaultAsync(q => q.PersonId == id);
            return new CustomActionResult(HttpStatusCode.OK, result);
        }


        public virtual void Insert(Models.PersonPublication entity)
        {
            this.context.PersonPublications.Add(entity);
        }
        public virtual void Insert(Models.PersonProject entity)
        {
            this.context.PersonProjects.Add(entity);
        }
       
        public virtual void Insert(Models.PersonPatent entity)
        {
            this.context.PersonPatents.Add(entity);
        }
        public virtual void Insert(Models.PersonCertification entity)
        {
            this.context.PersonCertifications.Add(entity);
        }
        public virtual void Insert(Models.PersonAward entity)
        {
            this.context.PersonAwards.Add(entity);
        }

        public virtual async Task<PersonPublication> GetPublicationByID(object id)
        {
            return await this.context.PersonPublications.FindAsync(id);
        }
        public virtual async Task<PersonPatent> GetPatentByID(object id)
        {
            return await this.context.PersonPatents.FindAsync(id);
        }
        public virtual async Task<PersonProject> GetProjectByID(object id)
        {
            return await this.context.PersonProjects.FindAsync(id);
        }
        public virtual async Task<PersonCertification> GetCertificationByID(object id)
        {
            return await this.context.PersonCertifications.FindAsync(id);
        }
        public virtual async Task<PersonAward> GetAwardByID(object id)
        {
            return await this.context.PersonAwards.FindAsync(id);
        }

        public virtual void Delete(PersonPublication entity)
        {
            this.context.PersonPublications.Remove(entity);
        }
        public virtual void Delete(PersonPatent entity)
        {
            this.context.PersonPatents.Remove(entity);
        }
        public virtual void Delete(PersonProject entity)
        {
            this.context.PersonProjects.Remove(entity);
        }
        public virtual void Delete(PersonCertification entity)
        {
            this.context.PersonCertifications.Remove(entity);
        }
        public virtual void Delete(PersonAward entity)
        {
            this.context.PersonAwards.Remove(entity);
        }
        public async Task<CustomActionResult> SaveAccompolishments(ViewModels.AccomplishmentDto dto)
        {
            var publication = await this.context.PersonPublications.FirstOrDefaultAsync(q=>q.PersonId==dto.Id);
            var patent = await this.context.PersonPatents.FirstOrDefaultAsync(q => q.PersonId == dto.Id);
            var project = await this.context.PersonProjects.FirstOrDefaultAsync(q => q.PersonId == dto.Id);
            var certification = await this.context.PersonCertifications.FirstOrDefaultAsync(q => q.PersonId == dto.Id);
            var award = await this.context.PersonAwards.FirstOrDefaultAsync(q => q.PersonId == dto.Id);

            if (string.IsNullOrEmpty( dto.Publication.Title) && publication != null)
            {
                this.context.PersonPublications.Remove(publication);
            } 
            else
            {
                if (publication == null)
                {
                    publication = new PersonPublication() { PersonId=dto.Id };
                    this.context.PersonPublications.Add(publication);
                }
                publication.Publisher = dto.Publication.Publisher;
                publication.Remark = dto.Publication.Remark;
                publication.Title = dto.Publication.Title;
                publication.Date = dto.Publication.Date;
            }

            if (string.IsNullOrEmpty(dto.Patent.Title) && patent != null)
            {
                this.context.PersonPatents.Remove(patent);
            }
            else
            {
                if (patent == null)
                {
                    patent = new PersonPatent() { PersonId = dto.Id };
                    this.context.PersonPatents.Add(patent);
                }
                patent.Title = dto.Patent.Title;
                patent.Date = dto.Patent.Date;
                patent.Remark = dto.Patent.Remark;
                patent.Issuer = dto.Patent.Issuer;
                
            }

            if (string.IsNullOrEmpty(dto.Project.Title) && project != null)
            {
                this.context.PersonProjects.Remove(project);
            }
            else
            {
                if (project == null)
                {
                    project = new PersonProject() { PersonId = dto.Id };
                    this.context.PersonProjects.Add(project);
                }
                project.Title = dto.Project.Title;
                project.Remark = dto.Project.Remark;
                project.Date = dto.Project.Date;
                
            }

            if (string.IsNullOrEmpty(dto.Certification.Title) && certification != null)
            {
                this.context.PersonCertifications.Remove(certification);
            }
            else
            {
                if (certification == null)
                {
                    certification = new PersonCertification() { PersonId = dto.Id };
                    this.context.PersonCertifications.Add(certification);
                }
                certification.Remark = dto.Certification.Remark;
                certification.Title = dto.Certification.Title;
                certification.Authority = dto.Certification.Authority;
            }

            if (string.IsNullOrEmpty(dto.Award.Title) && award != null)
            {
                this.context.PersonAwards.Remove(award);
            }
            else
            {
                if (award == null)
                {
                    award = new PersonAward() { PersonId = dto.Id };
                    this.context.PersonAwards.Add(award);
                }
                award.Date = dto.Award.Date;
                award.Issuer = dto.Award.Issuer;
                award.Remark = dto.Award.Remark;
                award.Title = dto.Award.Title;
            }

            return new CustomActionResult(HttpStatusCode.OK, true);
        }

        public void UpdateUserNetworks (ViewModels.PersonNetworksDto dto)
        {
            var current = (from x in this.context.PersonNetworks
                           where x.PersonId == dto.UserId
                           select x);
            this.context.PersonNetworks.RemoveRange(current);
            foreach (var x in dto.Networks)
            {
                this.context.PersonNetworks.Add(new PersonNetwork() {
                     NetworkId=x,
                      PersonId=dto.UserId
                });
            }
           
        }



        public virtual CustomActionResult Validate(ViewModels.ViewPersonDto dto)
        {

            var c = this.context.ViewPersons.FirstOrDefault(q => q.Id != dto.Id && q.Email.ToLower() == dto.Email.ToLower());
            if (c != null)
                  return new CustomActionResult(HttpStatusCode.NotAcceptable, "This email address is already being used.");
             

            return new CustomActionResult(HttpStatusCode.OK, "");
        }


    }
}