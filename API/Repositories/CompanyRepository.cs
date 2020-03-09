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
    public class CompanyRepository : GenericRepository<Company>
    {
        public CompanyRepository(EPAGRIFFINEntities context)
        : base(context)
        {

        }

        public IQueryable<ViewCompany> GetViewCompanies()
        {
            return this.GetQuery<ViewCompany>();
        }
        public IQueryable<Company> GetCompanies()
        {
            return this.GetQuery<Company>();
        }
        public IQueryable<ViewManufacturer> GetViewMans()
        {
            return this.GetQuery<ViewManufacturer>();
        }
        
        public IQueryable<Supplier> GetSuppliers()
        {
            return this.GetQuery<Supplier>();
        }
        public IQueryable<ViewAMProcess> GetViewAMProcess()
        {
            return this.GetQuery<ViewAMProcess>();
        }
        public IQueryable<ViewAmTechnology> GetViewAmTechnology()
        {
            return this.GetQuery<ViewAmTechnology>();
        }
        public IQueryable<ViewPrinterModel> GetViewPrinterModels()
        {
            return this.GetQuery<ViewPrinterModel>();
        }
        public IQueryable<PrintingMaterial> GetPrintingMaterials()
        {
            return this.GetQuery<PrintingMaterial>();
        }
        public IQueryable<ViewPrinter> GetViewPrinters()
        {
            return this.GetQuery<ViewPrinter>();
        }
        public IQueryable<ViewPrinter2> GetViewPrinters2()
        {
            return this.GetQuery<ViewPrinter2>();
        }
        public DbSet<ViewPrinter2> GetViewPrinters2DbSet()
        {
            return this.context.ViewPrinter2;
        }
        public DbSet<ViewCompany> GetViewCompanyDbSet()
        {
            return this.context.ViewCompanies;
        }
        public IQueryable<Material> GetMaterials()
        {
            return this.GetQuery<Material>();
        }
        public DbSet<Material> GetMaterialsDbSet()
        {
            //var ps=this.context.Materials.SqlQuery("select * from material")
            return this.context.Materials;
        }
        public Database GetDatabase()
        {
            //var ps=this.context.Materials.SqlQuery("select * from material")
            return this.context.Database;
        }
        public IQueryable<Printer> GetPrinters()
        {
            return this.GetQuery<Printer>();
        }
        public IQueryable<AspNetUser> GetAspNetUsers()
        {
            return this.GetQuery<AspNetUser>();
        }
        public AspNetUser GetAspNetUser(string email)
        {
            try
            {
                return this.GetQuery<AspNetUser>().Where(q => q.Email == email).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public AspNetUser AddRole(string email)
        {
            try
            {
                var user = this.context.AspNetUsers.FirstOrDefault(q => q.Email == email);
                var role = this.context.AspNetRoles.FirstOrDefault(q => q.Name == "Company");
                user.AspNetRoles.Add(role);
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public AspNetRole GetCompanyRole()
        {
            return this.GetQuery<AspNetRole>().Where(q => q.Name == "Company").FirstOrDefault();
        }
        public IQueryable<AspNetRole> GetAspNetRoles()
        {
            return this.GetQuery<AspNetRole>();
        }
        public IQueryable<CompanySlider> GetCompanySliders()
        {
            return this.GetQuery<CompanySlider>();
        }
        public virtual void Insert(AspNetUser entity)
        {
            this.context.AspNetUsers.Add(entity);
        }
        public IQueryable<PrinterTechnology> GetPrinterTechnologies()
        {
            return this.GetQuery<PrinterTechnology>();
        }
        public IQueryable<PrinterMaterial> GetPrinterMaterials()
        {
            return this.GetQuery<PrinterMaterial>();
        }
        public async Task<ViewCompany> GetViewCompanyById(int id)
        {

            return await this.context.ViewCompanies.FirstOrDefaultAsync(q => q.Id == id);
        }
        public async Task<ViewCompany> GetViewCompanyByEmail(string email)
        {
            return await this.context.ViewCompanies.FirstOrDefaultAsync(q => q.Email == email);
        }
        public IQueryable<ViewCompanyPrinter> GetCompanyPrinters()
        {
            return this.GetQuery<ViewCompanyPrinter>();
        }
         
        public async Task<bool> AddCompanyPrinter(int id, List<int> ids)
        {
            var exists = await this.context.CompanyPrinters.Where(q => q.CompanyId == id).ToListAsync();
            var exids = exists.Select(q => q.PrinterId).ToList();
            var newIds = ids.Where(q => !exids.Contains(q)).ToList();
            foreach (var pid in newIds)
            {
                this.context.CompanyPrinters.Add(new CompanyPrinter()
                {
                    CompanyId = id,
                    PrinterId = pid
                });
            }
            return true;
        }
        public async Task<bool> RemoveCompanyPrinter(int id)
        {
            var pc = await this.context.CompanyPrinters.Where(q => q.Id == id).FirstOrDefaultAsync();
            this.context.CompanyPrinters.Remove(pc);
            return true;
        }

        public async Task<Company> UpdateCompany(ViewModels.CompanyDto dto)
        {
            Company company = await this.context.Companies.Where(q => q.Id == dto.Id).FirstOrDefaultAsync();



            company.Name = dto.Name;
            company.Address = dto.Address;
            company.Phone = dto.Phone;
            company.Email = dto.Email;
            company.Website = dto.Website;
            company.Url = dto.Url;

            company.Twitter = dto.Twitter;
            company.LinkedIn = dto.LinkedIn;
            //  company.ImageUrl { get; set; }
            company.RushDelivery24 = dto.rush24;
            company.RushDelivery48 = dto.rush48;


            company.ZIPCode = dto.ZIPCode;
            company.City = dto.City;
            company.State = dto.State;
            company.CountryId = dto.CountryId;
            company.Remark = dto.Remark;

            var imgs = dto.SliderStr.Split('*').ToList();
            var _sl = await this.context.CompanySliders.Where(q => q.CompanyId == company.Id).ToListAsync();
            this.context.CompanySliders.RemoveRange(_sl);
            foreach (var x in imgs)
            {
                this.context.CompanySliders.Add(new CompanySlider()
                {
                    CompanyId = company.Id,
                    TypeID = 1,
                    Url = x,
                });
            }

            return company;
        }


        public async Task<Company> UpdateLogo(ViewModels.PersonImageDto dto)
        {
            Company company = await this.context.Companies.Where(q => q.Id == dto.Id).FirstOrDefaultAsync();



            company.ImageUrl = dto.Image;


            return company;
        }

        public virtual CustomActionResult Validate()
        {

            //var c = this.context.ViewPersons.FirstOrDefault(q => q.Id != dto.Id && q.Email.ToLower() == dto.Email.ToLower());
            //if (c != null)
            //    return new CustomActionResult(HttpStatusCode.NotAcceptable, "This email address is already being used.");


            return new CustomActionResult(HttpStatusCode.OK, "");
        }




    }
}