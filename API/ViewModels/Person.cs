using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.ViewModels
{
    public  class PersonPublicationDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Publisher { get; set; }
        public int PersonId { get; set; }
        public string Remark { get; set; }

        public static void Fill(Models.PersonPublication entity, ViewModels.PersonPublicationDto personpublication)
        {
            entity.Id = personpublication.Id;
            entity.Title = personpublication.Title;
            entity.Date = personpublication.Date;
            entity.Publisher = personpublication.Publisher;
            entity.PersonId = personpublication.PersonId;
            entity.Remark = personpublication.Remark;
        }
        public static void FillDto(Models.PersonPublication entity, ViewModels.PersonPublicationDto personpublication)
        {
            personpublication.Id = entity.Id;
            personpublication.Title = entity.Title;
            personpublication.Date = entity.Date;
            personpublication.Publisher = entity.Publisher;
            personpublication.PersonId = entity.PersonId;
            personpublication.Remark = entity.Remark;
        }


    }
    public  class PersonAwardDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Issuer { get; set; }
        public string Remark { get; set; }
        public int PersonId { get; set; }
        public static void Fill(Models.PersonAward entity, ViewModels.PersonAwardDto personaward)
        {
            entity.Id = personaward.Id;
            entity.Title = personaward.Title;
            entity.Date = personaward.Date;
            entity.Issuer = personaward.Issuer;
            entity.Remark = personaward.Remark;
            entity.PersonId = personaward.PersonId;
        }
        public static void FillDto(Models.PersonAward entity, ViewModels.PersonAwardDto personaward)
        {
            personaward.Id = entity.Id;
            personaward.Title = entity.Title;
            personaward.Date = entity.Date;
            personaward.Issuer = entity.Issuer;
            personaward.Remark = entity.Remark;
            personaward.PersonId = entity.PersonId;
        }

    }
    public  class PersonCertificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Authority { get; set; }
        public string Remark { get; set; }
        public int PersonId { get; set; }
        public static void Fill(Models.PersonCertification entity, ViewModels.PersonCertificationDto personcertification)
        {
            entity.Id = personcertification.Id;
            entity.Title = personcertification.Title;
            entity.Authority = personcertification.Authority;
            entity.Remark = personcertification.Remark;
            entity.PersonId = personcertification.PersonId;
        }
        public static void FillDto(Models.PersonCertification entity, ViewModels.PersonCertificationDto personcertification)
        {
            personcertification.Id = entity.Id;
            personcertification.Title = entity.Title;
            personcertification.Authority = entity.Authority;
            personcertification.Remark = entity.Remark;
            personcertification.PersonId = entity.PersonId;
        }

    }

    public  class PersonPatentDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Issuer { get; set; }
        public string Remark { get; set; }
        public int PersonId { get; set; }
        public static void Fill(Models.PersonPatent entity, ViewModels.PersonPatentDto personpatent)
        {
            entity.Id = personpatent.Id;
            entity.Title = personpatent.Title;
            entity.Date = personpatent.Date;
            entity.Issuer = personpatent.Issuer;
            entity.Remark = personpatent.Remark;
            entity.PersonId = personpatent.PersonId;
        }
        public static void FillDto(Models.PersonPatent entity, ViewModels.PersonPatentDto personpatent)
        {
            personpatent.Id = entity.Id;
            personpatent.Title = entity.Title;
            personpatent.Date = entity.Date;
            personpatent.Issuer = entity.Issuer;
            personpatent.Remark = entity.Remark;
            personpatent.PersonId = entity.PersonId;
        }

    }

    public  class PersonProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Remark { get; set; }
        public int PersonId { get; set; }
        public static void Fill(Models.PersonProject entity, ViewModels.PersonProjectDto personproject)
        {
            entity.Id = personproject.Id;
            entity.Title = personproject.Title;
            entity.Date = personproject.Date;
            entity.Remark = personproject.Remark;
            entity.PersonId = personproject.PersonId;
        }
        public static void FillDto(Models.PersonProject entity, ViewModels.PersonProjectDto personproject)
        {
            personproject.Id = entity.Id;
            personproject.Title = entity.Title;
            personproject.Date = entity.Date;
            personproject.Remark = entity.Remark;
            personproject.PersonId = entity.PersonId;
        }

    }

    public class AccomplishmentDto
    {
        public int Id { get; set; }
        public PersonPublicationDto Publication { get; set; }
        public PersonProjectDto Project { get; set; }

        public PersonAwardDto Award { get; set; }

        public PersonCertificationDto Certification { get; set; }

        public PersonPatentDto Patent { get; set; }
    }


    public class ViewPersonDto
    {
        public int Id { get; set; }
        public DateTime DateCreate { get; set; }
        public int SexId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateBirth { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string Remark { get; set; }
        public string Nickname { get; set; }
        public string IDNo { get; set; }
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public int? CountryId { get; set; }
        public string ZIPCode { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Company { get; set; }
        public string University { get; set; }
        public string Website { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Headline { get; set; }
        public int? DegreeId { get; set; }
        public int? PositionId { get; set; }
        public DateTime? DateJoin { get; set; }
        public string DateJoinStr { get; set; }
        public string Name { get; set; }
        public int? FieldOfStudyId { get; set; }
        public string Position { get; set; }
        public string FieldOfStudy { get; set; }
        public string Degree { get; set; }
        public string CountrySortName { get; set; }
        public string Country { get; set; }
        public string Location { get; set; }
        public string Education { get; set; }
        public static void Fill(Models.Person entity, ViewModels.ViewPersonDto viewperson)
        {
            entity.Id = viewperson.Id;
            entity.DateCreate = viewperson.DateCreate;
            entity.SexId = viewperson.SexId;
            entity.FirstName = viewperson.FirstName;
            entity.LastName = viewperson.LastName;
            entity.DateBirth = viewperson.DateBirth;
            entity.Email = viewperson.Email;
            entity.Mobile = viewperson.Mobile;
            entity.Address = viewperson.Address;
            entity.IsActive = viewperson.IsActive;
            entity.IsDeleted = viewperson.IsDeleted;
            entity.Remark = viewperson.Remark;
            entity.Nickname = viewperson.Nickname;
            entity.IDNo = viewperson.IDNo;
            entity.UserId = viewperson.UserId;
            entity.ImageUrl = viewperson.ImageUrl;
            entity.CountryId = viewperson.CountryId;
            entity.ZIPCode = viewperson.ZIPCode;
            entity.State = viewperson.State;
            entity.City = viewperson.City;
            entity.Company = viewperson.Company;
            entity.University = viewperson.University;
            entity.Website = viewperson.Website;
            entity.Twitter = viewperson.Twitter;
            entity.LinkedIn = viewperson.LinkedIn;
            entity.Headline = viewperson.Headline;
            entity.DegreeId = viewperson.DegreeId;
            entity.PositionId = viewperson.PositionId;
            entity.DateJoin = viewperson.DateJoin;
            
            entity.FieldOfStudyId = viewperson.FieldOfStudyId;
            
             
            
        }
        public static void FillDto(Models.ViewPerson entity, ViewModels.ViewPersonDto viewperson)
        {
            viewperson.Id = entity.Id;
            viewperson.DateCreate = entity.DateCreate;
            viewperson.SexId = entity.SexId;
            viewperson.FirstName = entity.FirstName;
            viewperson.LastName = entity.LastName;
            viewperson.DateBirth = entity.DateBirth;
            viewperson.Email = entity.Email;
            viewperson.Mobile = entity.Mobile;
            viewperson.Address = entity.Address;
            viewperson.IsActive = entity.IsActive;
            viewperson.IsDeleted = entity.IsDeleted;
            viewperson.Remark = entity.Remark;
            viewperson.Nickname = entity.Nickname;
            viewperson.IDNo = entity.IDNo;
            viewperson.UserId = entity.UserId;
            viewperson.ImageUrl = entity.ImageUrl;
            viewperson.CountryId = entity.CountryId;
            viewperson.ZIPCode = entity.ZIPCode;
            viewperson.State = entity.State;
            viewperson.City = entity.City;
            viewperson.Company = entity.Company;
            viewperson.University = entity.University;
            viewperson.Website = entity.Website;
            viewperson.Twitter = entity.Twitter;
            viewperson.LinkedIn = entity.LinkedIn;
            viewperson.Headline = entity.Headline;
            viewperson.DegreeId = entity.DegreeId;
            viewperson.PositionId = entity.PositionId;
            viewperson.DateJoin = entity.DateJoin;
            viewperson.DateJoinStr = entity.DateJoinStr;
            viewperson.Name = entity.Name;
            viewperson.FieldOfStudyId = entity.FieldOfStudyId;
            viewperson.Position = entity.Position;
            viewperson.FieldOfStudy = entity.FieldOfStudy;
            viewperson.Degree = entity.Degree;
            viewperson.CountrySortName = entity.CountrySortName;
            viewperson.Country = entity.Country;
            viewperson.Location = entity.Location;
            viewperson.Education = entity.Education;
        }
    }

    public class PersonImageDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
    }

    public class ReviewDto
    {
        public int Id { get; set; }
        public string Body { get; set; }

        public int UserId { get; set; }
    }

    public class PersonNetworksDto
    {
        public int UserId { get; set; }
        public List<int> Networks { get; set; }
    }

    public class PersonAccompolishmentsDto
    {
        public Models.ViewPersonPublication Publication { get; set; }
        public Models.ViewPersonPatent Patent { get; set; }

        public Models.ViewProject Project { get; set; }

        public Models.ViewCertification Certification { get; set; }

        public Models.ViewAward Award { get; set; }
    }

    public class AccomplishmentObject
    {
        public object Item { get; set; }
        public DateTime? Date { get; set; }

        public string Type { get; set; }
    }

    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Remark { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> DateVerified { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<bool> RushDelivery24 { get; set; }
        public Nullable<bool> RushDelivery48 { get; set; }
        public bool? rush24 { get; set; }
        public bool? rush48 { get; set; }



        public string ZIPCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string SliderStr { get; set; }


    }


}