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
using Z.Expressions;
using Z.EntityFramework.Extensions;
using Z.EntityFramework;
using LinqKit;
using System.Diagnostics;

namespace API.Controllers
{
    public class CompanyController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        //[Route("api/companies")]
        //[EnableQuery]
        //public async Task<IHttpActionResult> GetCompanies(int skip, int take, bool? r24=null,bool? r48=null,string zip=""
        //    , string materials = "", string techs = "", int? bvw=null,int? bvh=null,int? bvd=null,int? min=null,int? max=null,string location="")
        //{
        //    var query_printers = from x in unitOfWork.CompanyRepository.GetViewPrinters()
        //                         select x;
        //    if (!string.IsNullOrEmpty(materials))
        //    {
        //        var _materials = materials.ToLower().Split('_');

        //        var con = "";
        //        for (var i= 0;i<= _materials.Count()-1;i++)
        //        {

        //            con += "q.Materials.ToLower().Contains(\"" + _materials[i] + "\")";
        //            if (i != _materials.Count() - 1)
        //                con += " || ";
        //        }
        //        query_printers= query_printers.Where(q => con);
        //    }
        //    if (!string.IsNullOrEmpty(techs))
        //    {
        //        var _techs = techs.ToLower().Split('_');

        //        var con = "";
        //        for (var i = 0; i <= _techs.Count() - 1; i++)
        //        {

        //            con += "q.Technologies.ToLower().Contains(\"" + _techs[i] + "\")";
        //            if (i != _techs.Count() - 1)
        //                con += " || ";
        //        }
        //        query_printers = query_printers.Where(q => con);
        //    }

        //    if (bvw != null)
        //        query_printers = query_printers.Where(q => q.BuildVolume_W == bvw);
        //    if (bvh != null)
        //        query_printers = query_printers.Where(q => q.BuildVolume_H== bvh);
        //    if (bvd != null)
        //        query_printers = query_printers.Where(q => q.BuildVolume_D == bvd);

        //    if (min != null)
        //        query_printers = query_printers.Where(q => q.Min_LH == min);
        //    if (max != null)
        //        query_printers = query_printers.Where(q => q.Max_LH == min);


        //    var query_company = from x in unitOfWork.CompanyRepository.GetViewCompanies()
        //                        select x;
        //    if (r24==true)
        //        query_company = query_company.Where(q => q.RushDelivery24 == true);
        //    if (r48==true)
        //        query_company = query_company.Where(q => q.RushDelivery48 == true);



        //    if (!string.IsNullOrEmpty(zip))
        //        query_company = query_company.Where(q => q.ZIPCode.ToLower().Contains(zip.ToLower()) || q.City.ToLower().Contains(zip) || q.State.ToLower().Contains(zip.ToLower()));


        //    var query = (from x in query_company
        //                 join y in query_printers on x.Id equals y.CompanyId
        //                // orderby x.DateJoin descending
        //                 select x).Distinct();
        //    var oquery = query.OrderByDescending(q => q.DateJoin);
        //    var _totalCount = await query.CountAsync();
        //    var query2 = oquery.Skip(skip).Take(take);
        //    var _items = await query2.ToListAsync();
        //    var result = new
        //    {
        //        totalCount = _totalCount,
        //        items = _items,
        //    };
        //    return Ok(result);


        //}
        [Route("api/company/register")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostRegisterCompany(dynamic dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }
            var validate = unitOfWork.CompanyRepository.Validate();
            if (validate.Code != HttpStatusCode.OK)
                return validate;
            var id = Convert.ToInt32(dto.id);
            var name = dto.name;
            var email =Convert.ToString( dto.email);
            var password = dto.password;
            var repassword = dto.confirmPassword;
            var website = dto.website;
            var address = dto.address;
            Company company = new Company() {
                 Name=name,
                 Email=email,
                 Website=website,
                 Address=address,
                 DateJoin=DateTime.Now,
                 ImageUrl= "_x2.png",
            };

            unitOfWork.CompanyRepository.Insert(company);
 
            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;
            //RegisterBindingModel
            AccountController ac = new AccountController();
            var register=await ac.RegisterInternal(new RegisterBindingModel()
            {
                 ConfirmPassword=dto.confirmPassword,
                 Password=dto.password,
                  Email=email,

            });

            var user = (AspNetUser)unitOfWork.CompanyRepository.AddRole(email);
           // var user = (AspNetUser)    unitOfWork.CompanyRepository.GetAspNetUser(email);
            company.UserId = user.Id;
            //var role =    unitOfWork.CompanyRepository.GetCompanyRole();
            //user.AspNetRoles.Add(new AspNetRole()
            //{
                 
            //});
            //user.AspNetRoles.Add(role);


            saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(company);
        }

        [Route("api/company/update")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostUpdateCompany(ViewModels.CompanyDto dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }

          Company company=  await unitOfWork.CompanyRepository.UpdateCompany(dto);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            return Ok(company);
        }


        [Route("api/company/image/save")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostCompanyLogo(ViewModels.PersonImageDto dto)
        {
            // return Ok(client);
            if (dto == null)
                return Exceptions.getNullException(ModelState);
            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
                return Exceptions.getModelValidationException(ModelState);
            }


            Company company = await unitOfWork.CompanyRepository.UpdateLogo(dto);

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;

            
            return Ok(company);
        }

        [Route("api/company/printers/add")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostAddCompanyPrinter(dynamic dto)
        {
            var id = Convert.ToInt32(dto.id);
            string ids = Convert.ToString(dto.ids);
            var _ids = ids.Split('_').Select(q=>Convert.ToInt32(q)).ToList();
            await unitOfWork.CompanyRepository.AddCompanyPrinter(id, _ids);
            // return Ok(client);
             

            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;
             

            return Ok(true);
        }

        [Route("api/company/printers/remove")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostRemoveCompanyPrinter(dynamic dto)
        {
            var id = Convert.ToInt32(dto.id);

            await unitOfWork.CompanyRepository.RemoveCompanyPrinter(id);
            // return Ok(client);


            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;


            return Ok(true);
        }

        [Route("api/company/slider/remove")]
        [AcceptVerbs("POST")]
        public async Task<IHttpActionResult> PostRemoveCompanySlider(dynamic dto)
        {
            string url = Convert.ToString(dto.url);

            await unitOfWork.CompanyRepository.RemoveCompanySlider(url);
            // return Ok(client);


            var saveResult = await unitOfWork.SaveAsync();
            if (saveResult.Code != HttpStatusCode.OK)
                return saveResult;


            return Ok(true);
        }

        //mami
        [Route("api/companies")]
        [EnableQuery]
        public IQueryable<ViewCompany> GetCompanies(int top,int? skip=null, int? take=null, bool? r24 = null, bool? r48 = null, string zip = ""
           , string materials = "", string techs = "", int? bvw = null, int? bvh = null, int? bvd = null, int? min = null, int? max = null, string location = "")
        {
            //var query_printers = from x in unitOfWork.CompanyRepository.GetViewPrinters()
            //                     select x;
            if (take == null)
                take = top;
            if (skip == null)
                skip = 0;
            List<string> where = new List<string>();
            if (!string.IsNullOrEmpty(materials))
            {
                var _materials = materials.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                //var con = "";
                //for (var i = 0; i <= _materials.Count() - 1; i++)
                //{

                //    con += "q.Materials.ToLower().Contains(\"" + _materials[i] + "\")";
                //    if (i != _materials.Count() - 1)
                //        con += " || ";
                //}
                //query_printers = query_printers.Where(q => con);

                foreach (var _sup in _materials)
                {
                    supwhere.Add(" MaterialsGeneral like '%" + _sup + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");


            }
            if (!string.IsNullOrEmpty(techs))
            {
                 var _techs = techs.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                foreach (var _sup in _techs)
                {
                    supwhere.Add(" Technology like '%" + _sup + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");
                //var con = "";
                //for (var i = 0; i <= _techs.Count() - 1; i++)
                //{

                //    con += "q.Technologies.ToLower().Contains(\"" + _techs[i] + "\")";
                //    if (i != _techs.Count() - 1)
                //        con += " || ";
                //}
                //query_printers = query_printers.Where(q => con);
            }

            //if (bvw != null)
            //    query_printers = query_printers.Where(q => q.BuildVolume_W == bvw);
            if (bvw != null)
            {
               where.Add("DimX like '%" + bvw + "%'");
            }
            if (bvh != null)
            {
                where.Add("DimY like '%" + bvh + "%'");
            }
            if (bvd != null)
            {
                where.Add("DimZ like '%" + bvh + "%'");
            }

            if (min != null)
            {
                where.Add("MinLayer like '%" + min + "%'");
            }
            if (max != null)
            {
                where.Add("MaxLayer like '%" + max + "%'");
            }


            //if (bvh != null)
            //    query_printers = query_printers.Where(q => q.BuildVolume_H == bvh);
            //if (bvd != null)
            //    query_printers = query_printers.Where(q => q.BuildVolume_D == bvd);

            //if (min != null)
            //    query_printers = query_printers.Where(q => q.Min_LH == min);
            //if (max != null)
            //    query_printers = query_printers.Where(q => q.Max_LH == min);


            //var query_company = from x in unitOfWork.CompanyRepository.GetViewCompanies()
              //                  select x;
            //if (r24 == true)
            //    query_company = query_company.Where(q => q.RushDelivery24 == true);
            //if (r48 == true)
            //    query_company = query_company.Where(q => q.RushDelivery48 == true);
            if (r24 == true)
            {
                where.Add("RushDelivery24 =1");
            }
            if (r48 == true)
            {
                where.Add("RushDelivery48 =1");
            }


            if (!string.IsNullOrEmpty(location))
                where.Add("Lower(Location) like '%" + location.ToLower() + "%'");


            //var query = (from x in query_company
            //             join y in query_printers on x.Id equals y.CompanyId

            //             select x).Distinct();
            //var oquery = query.OrderByDescending(q => q.DateJoin);
            //var _totalCount = await query.CountAsync();
            //var query2 = oquery.Skip(skip).Take(take);
            //var _items = await query2.ToListAsync();
            //var result = new
            //{
            //    totalCount = _totalCount,
            //    items = _items,
            //};
            //return Ok(result);
            var whr = string.Join(" and ", where);


            var cmd = "SELECT  Id,Name,Address,Phone,Email,Website,Url,DateVerified,DateVerifiedStr,IsVerified,Twitter,LinkedIn,RushDelivery24,ImageUrl,ImageUrl2,RushDelivery48,PersonId,DateJoin,DateJoinStr,TotalRate,TotalRateCount,ZIPCode,City,State,CountryId,CountrySortName,Country,Location,Network,Remark,MaterialsGeneral,Technology,DimX,DimY,DimZ,MinLayer,MaxLayer "
                + "FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY Name ) AS RowNum, * "
                + " FROM      ViewCompany "
                + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "")
                + "   ) AS RowConstrainedResult "
                + " WHERE   RowNum >" + skip + "     AND RowNum <= " + (skip + take)
                + " ORDER BY RowNum";
            var cmdCount = "select count(*) From ViewCompany"
                 + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "");


            var companies = unitOfWork.CompanyRepository.GetViewCompanyDbSet().SqlQuery(cmd);

            var _items = companies.ToList();
            //   var _totalCount = unitOfWork.CompanyRepository.GetDatabase().SqlQuery<int>(cmdCount).ToList().First();
            //try
            //{
            //    var _items = companies.ToList();
            //    var result = new
            //    {
            //        totalCount = _totalCount,
            //        items = _items,
            //    };
            //    return Ok(result);
            //}
            //catch(Exception ex)
            //{
            //    return Ok();
            //}
            return _items.AsQueryable();


        }

        [Route("api/company/{id}")]
        public async Task<IHttpActionResult> GetCompanyProfile(int id)
        {
            //var company = await unitOfWork.CompanyRepository.GetViewCompanyById(id);
            //if (company == null)
            //    return NotFound();
            //var _printers = await unitOfWork.CompanyRepository.GetViewPrinters().Where(q => q.CompanyId == id).ToListAsync();
            //var techs = await (from x in unitOfWork.CompanyRepository.GetPrinterTechnologies()
            //                   join y in unitOfWork.CompanyRepository.GetPrinters() on x.PrinterId equals y.Id
            //                   where y.CompanyId == id
            //                   select x).ToListAsync();
            //var mats = await (from x in unitOfWork.CompanyRepository.GetPrinterMaterials()
            //                   join y in unitOfWork.CompanyRepository.GetPrinters() on x.PrinterId equals y.Id
            //                   where y.CompanyId == id
            //                   select x).ToListAsync();

            //dynamic result = new
            //{
            //    User = company,
            //    technologies=techs,
            //    materials=mats,

            //    data = new
            //    {
            //        printers = _printers,
            //        printer_technology = _printers.Select(q => string.IsNullOrEmpty(q.Technologies) ? "_" + q.Id : q.Technologies).ToList(),
            //        materials = _printers.Select(q => string.IsNullOrEmpty(q.Materials) ? "_" + q.Id : q.Materials).ToList(),
            //        build_volume = _printers.Select(q => string.IsNullOrEmpty(q.BuildVolume) ? "_" + q.Id : q.BuildVolume).ToList(),
            //        min_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MinLayerHeight) ? "_" + q.Id : q.MinLayerHeight).ToList(),
            //        max_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MaxLayerHeight) ? "_" + q.Id : q.MaxLayerHeight).ToList(),
            //        printing_speed = _printers.Select(q => string.IsNullOrEmpty(q.PrintingSpeedStr) ? "_" + q.Id : q.PrintingSpeedStr).ToList(),
            //        object_file= _printers.Select(q => string.IsNullOrEmpty(q.ObjectFile) ? "_" + q.Id : q.ObjectFile).ToList(),
            //        color= _printers.Select(q => string.IsNullOrEmpty(q.Color) ? "_" + q.Id : q.Color).ToList(),
            //        slider=await unitOfWork.CompanyRepository.GetCompanySliders().Where(q=>q.CompanyId==id).ToListAsync(),
            //    }
            //};


            //return Ok(result);

            var company = await unitOfWork.CompanyRepository.GetViewCompanyById(id);
            if (company == null)
                return NotFound();
            var printers = await unitOfWork.CompanyRepository.GetCompanyPrinters().Where(q => q.CompanyId == id).ToListAsync();
            var slider = await unitOfWork.CompanyRepository.GetCompanySliders().Where(q => q.CompanyId == id).Select(q=>q.Url) .ToListAsync();
            var result = new
            {
                User=company,
                data=new
                {
                    printers,
                    slider
                }
            };
            //$scope.profile.data.slider
            return Ok(result);

        }

        [Route("api/printer/{id}")]
        public async Task<IHttpActionResult> GetPrinter(int id)
        {
            var printer = await unitOfWork.CompanyRepository.GetViewPrinters2().FirstOrDefaultAsync(q => q.Id == id);

            dynamic result = new
            {
                User = printer,
                //User = company,
                //technologies = techs,
                //materials = mats,

                //data = new
                //{
                //    printers = _printers,
                //    printer_technology = _printers.Select(q => string.IsNullOrEmpty(q.Technologies) ? "_" + q.Id : q.Technologies).ToList(),
                //    materials = _printers.Select(q => string.IsNullOrEmpty(q.Materials) ? "_" + q.Id : q.Materials).ToList(),
                //    build_volume = _printers.Select(q => string.IsNullOrEmpty(q.BuildVolume) ? "_" + q.Id : q.BuildVolume).ToList(),
                //    min_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MinLayerHeight) ? "_" + q.Id : q.MinLayerHeight).ToList(),
                //    max_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MaxLayerHeight) ? "_" + q.Id : q.MaxLayerHeight).ToList(),
                //    printing_speed = _printers.Select(q => string.IsNullOrEmpty(q.PrintingSpeedStr) ? "_" + q.Id : q.PrintingSpeedStr).ToList(),
                //    object_file = _printers.Select(q => string.IsNullOrEmpty(q.ObjectFile) ? "_" + q.Id : q.ObjectFile).ToList(),
                //    color = _printers.Select(q => string.IsNullOrEmpty(q.Color) ? "_" + q.Id : q.Color).ToList(),
                //    slider = await unitOfWork.CompanyRepository.GetCompanySliders().Where(q => q.CompanyId == id).ToListAsync(),
                //}
            };


            return Ok(result);
        }
        [Route("api/material/{id}")]
        public async Task<IHttpActionResult> GetMaterial(int id)
        {
            var printer = await unitOfWork.CompanyRepository.GetMaterials().FirstOrDefaultAsync(q => q.Id == id);

            dynamic result = new
            {
                User = printer,
                //User = company,
                //technologies = techs,
                //materials = mats,

                //data = new
                //{
                //    printers = _printers,
                //    printer_technology = _printers.Select(q => string.IsNullOrEmpty(q.Technologies) ? "_" + q.Id : q.Technologies).ToList(),
                //    materials = _printers.Select(q => string.IsNullOrEmpty(q.Materials) ? "_" + q.Id : q.Materials).ToList(),
                //    build_volume = _printers.Select(q => string.IsNullOrEmpty(q.BuildVolume) ? "_" + q.Id : q.BuildVolume).ToList(),
                //    min_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MinLayerHeight) ? "_" + q.Id : q.MinLayerHeight).ToList(),
                //    max_layer_height = _printers.Select(q => string.IsNullOrEmpty(q.MaxLayerHeight) ? "_" + q.Id : q.MaxLayerHeight).ToList(),
                //    printing_speed = _printers.Select(q => string.IsNullOrEmpty(q.PrintingSpeedStr) ? "_" + q.Id : q.PrintingSpeedStr).ToList(),
                //    object_file = _printers.Select(q => string.IsNullOrEmpty(q.ObjectFile) ? "_" + q.Id : q.ObjectFile).ToList(),
                //    color = _printers.Select(q => string.IsNullOrEmpty(q.Color) ? "_" + q.Id : q.Color).ToList(),
                //    slider = await unitOfWork.CompanyRepository.GetCompanySliders().Where(q => q.CompanyId == id).ToListAsync(),
                //}
            };


            return Ok(result);
        }
        [Route("api/manufacturers")]
        [EnableQuery]
         
        // [Authorize]
        public IQueryable<ViewManufacturer> GetMans()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetViewMans();
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }

        [Route("api/suppliers")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<Supplier> GetSuppliers()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetSuppliers().OrderBy(q=>q.Name);
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("api/amprocess")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<ViewAMProcess> GetAMProcess()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetViewAMProcess().OrderBy(q=>q.AMProcess);
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("api/amtechnology")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<ViewAmTechnology> GetAMTechnology()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetViewAmTechnology().OrderBy(q=>q.AMTechnology);
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }

        [Route("api/gmats")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<PrintingMaterial> GetGMats()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetPrintingMaterials().Where(q=>q.IsSpecific==null || q.IsSpecific==false);
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("api/smats")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<PrintingMaterial> GetSMats()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetPrintingMaterials().Where(q => q.IsSpecific == true);
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("api/models")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<ViewPrinterModel> GetModels()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetViewPrinterModels();
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }

        [Route("api/printers2")]
        [EnableQuery]

        // [Authorize]
        public IQueryable<ViewPrinter2> GetPrinters2()
        {
            try
            {
                return unitOfWork.CompanyRepository.GetViewPrinters2();
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }


        [Route("api/materials2")]
        [EnableQuery]
        //[DeflateCompression]
        public  IQueryable<Material> GetMaterials2()
        {
            try
            {
                //MemoryCacher mc = new MemoryCacher();
               // var _items = mc.GetValue("materials" ) as List<Material>;
                //if (_items == null)
                //  _items=  CacheMaterials();
                return unitOfWork.CompanyRepository.GetMaterials();
              //  return _items.AsQueryable();
                
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }


        [Route("api/printers")]
        [EnableQuery]
        public IQueryable<ViewPrinter2> GetPrinters(int top,int? skip=null, int? take=null,string models="",string mans="",string mmodes="",string astms="",string techs=""
            ,string gmats="",string smats=""
            ,int? minprice=null,int? maxprice=null
            ,int? xdmin=null,int? xdmax=null
            , int? ydmin = null, int? ydmax = null
            , int? zdmin = null, int? zdmax = null
            , int? mbv_w = null
            , int? mbv_h = null
            , int? mbv_d = null
            , string Model=""
            
            )
        {
            if (take == null)
                take = top;
            if (skip == null)
                skip = 0;
            List<string> where = new List<string>();
            if (!string.IsNullOrEmpty(Model))
            {
                Model = Model.ToLower();
                where.Add("Model like '%" + Model + "%'");
            }

            if (!string.IsNullOrEmpty(mans))
            {

                var _gSup = mans.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                foreach (var _sup in _gSup)
                {
                    supwhere.Add(" Manufacturer like '%" + _sup + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");

            }
            if (!string.IsNullOrEmpty(techs))
            {
                var _gmaterials = techs.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                foreach (var _mat in _gmaterials)
                {
                    supwhere.Add(" AMTechnology like '%" + _mat + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");
            }

            if (!string.IsNullOrEmpty(astms))
            {
                var _gmaterials = astms.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                foreach (var _mat in _gmaterials)
                {
                    supwhere.Add(" AMProcess like '%" + _mat + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");
            }

            if (!string.IsNullOrEmpty(gmats))
            {
                var _gmaterials = gmats.ToLower().Split('_');
                List<string> supwhere = new List<string>();
                foreach (var _mat in _gmaterials)
                {
                    supwhere.Add(" MaterialsGeneral like '%" + _mat + "%'");
                }
                where.Add("(" + string.Join(" or ", supwhere) + ")");
            }

            if (mbv_d != null)
            {

               // where.Add("TensileStrength is not null and  TensileStrength>=" + mts);

            }
            if (mbv_h != null)
            {
              //  where.Add("FlexuralStrength is not null and  FlexuralStrength>=" + mfs);

            }
            if (mbv_w != null)
            {
              //  where.Add("FlexuralStrength is not null and  FlexuralStrength>=" + mfs);

            }

            var whr = string.Join(" and ", where);


            var cmd = "SELECT  Id ,ModelId ,MachineModeId ,AMProcessId ,AMTechnologyId ,MinPrice ,MaxPrice ,PriceRange ,YearRetired ,DimensionX ,DimensionY ,DimensionZ ,DimensionXinch ,DimensionYinch ,DimensionZinch ,LayerMin ,LayerMax ,FocusDiameterMin ,FocusDiameterMininch ,FocusDiameterMax ,FocusDiameterMaxinch ,ScanningSpeedMax ,ScanningSpeedMaxinch ,ScanningSpeedMin ,ScanningSpeedMininch ,Power ,PrintheadNo ,FilamentDiameter ,Tolerance ,LasersNo ,LaserTypeId ,LaserWavelength ,MaxBeamPower ,OpenSourceId ,RestrictedId ,HeatedPlatformId ,ControlsId ,CategoryId ,GUID ,Category ,Controls ,HeatedPlatform ,Restricted ,OpenSource ,LaserType ,AMProcess ,MachineMode ,Model ,Manufacturer ,Website ,ManufacturerId ,MaterialsGeneral ,MaterialsSpecific ,AMTechnology ,Optics ,ImageUrl "
                + "FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY Manufacturer,Model ) AS RowNum, * "
                + " FROM      ViewPrinter2 "
                + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "")
                + "   ) AS RowConstrainedResult "
                + " WHERE   RowNum >" + skip + "     AND RowNum <= " + (skip + take)
                + " ORDER BY RowNum";
            var cmdCount = "select count(*) From ViewPrinter2"
                 + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "");


            var materials = unitOfWork.CompanyRepository.GetViewPrinters2DbSet().SqlQuery(cmd);


          //  var _totalCount = unitOfWork.CompanyRepository.GetDatabase().SqlQuery<int>(cmdCount).ToList().First();

            var _items = materials.ToList();
            //var result = new
            //{
            //    totalCount = _totalCount,
            //    items = _items,
            //};
            //return Ok(result);

            return _items.AsQueryable();

        }

        public  List<Material>  CacheMaterials()
        {
           // MemoryCacher mc = new MemoryCacher();
            //var cnt =await unitOfWork.CompanyRepository.GetMaterials().CountAsync();
            //mc.Add("materials_count", cnt, DateTimeOffset.UtcNow.AddMinutes(5));

           // var items =   unitOfWork.CompanyRepository.GetMaterials().ToList();
           // mc.Add("materials", items, DateTimeOffset.UtcNow.AddHours(5));

            return null;
        }


        //dood
        [Route("api/materials")]
        [EnableQuery]
        public IQueryable<Material> GetMaterials(int top, int? skip=null, int? take=null, string gmaterials = "",  string sups=""
           
           , int? mts = null, int? mfs = null
           
           , string Material = ""

           )
        {
            if (take == null)
                take = top;
            if (skip == null)
                skip = 0;
            int _totalCount = -1;
            long elapsed = 0;
            List<Material> _items = null;
 


                List<string> where = new List<string>();
                if (!string.IsNullOrEmpty(Material))
                {
                    Material = Material.ToLower();
                    where.Add("Material like '%" + Material + "%'");
                }

                if (!string.IsNullOrEmpty(sups))
                {

                    var _gSup = sups.ToLower().Split('_');
                    List<string> supwhere = new List<string>();
                    foreach (var _sup in _gSup)
                    {
                        supwhere.Add(" SUPPLIER like '%" + _sup + "%'");
                    }
                    where.Add("(" + string.Join(" or ", supwhere) + ")");

                }
                if (!string.IsNullOrEmpty(gmaterials))
                {
                    var _gmaterials = gmaterials.ToLower().Split('_');
                    List<string> supwhere = new List<string>();
                    foreach (var _mat in _gmaterials)
                    {
                        supwhere.Add(" GENERAL like '%" + _mat + "%'");
                    }
                    where.Add("(" + string.Join(" or ", supwhere) + ")");
                }

                if (mts != null)
                {

                    where.Add("TensileStrength is not null and  TensileStrength>=" + mts);

                }
                if (mfs != null)
                {
                    where.Add("FlexuralStrength is not null and  FlexuralStrength>=" + mfs);

                }


                var whr = string.Join(" and ", where);


                var cmd = "select  Id ,Material as Material1 ,Supplier ,ManWebsite ,General ,Specific ,TensileStrength ,TensileStrengthStandard ,FlexuralStrength ,FlexuralStrengthStandard ,FlexuralModulus,FlexuralModulusStandard ,ElongationAtBreak ,SolidDensity ,DensityStandard ,MinParticleSize ,MaxParticleSize ,PostProcessed ,PostProcessingConditions ,SolubleSupport ,SupportMaterialName ,SupportMaterialType ,YearReleased "
                    + "FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY Supplier,Material ) AS RowNum, * "
                    + " FROM      Material "
                    + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "")
                    + "   ) AS RowConstrainedResult "
                    + " WHERE   RowNum >" + skip + "     AND RowNum <= " + (skip + take)
                    + " ORDER BY RowNum";
                var cmdCount = "select count(*) From material"
                     + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "");

                Stopwatch stopwatch = new Stopwatch();

                // Begin timing.
                stopwatch.Start();
                var materials = unitOfWork.CompanyRepository.GetMaterialsDbSet().SqlQuery(cmd);


               //   _totalCount = unitOfWork.CompanyRepository.GetDatabase().SqlQuery<int>(cmdCount).ToList().First();
               
                  _items = materials.ToList();
                stopwatch.Stop();
                elapsed = stopwatch.ElapsedMilliseconds;
            // mc.Add("materials_" + skip + "_" + take, _items, DateTimeOffset.UtcNow.AddMinutes(5));

            //var result = new
            //{
            //    totalCount = _totalCount,
            //    items = _items,
            //    elapsed
            //};
            //return Ok(result);

            return _items.AsQueryable();


        }



        [Route("api/materials3")]
        [EnableQuery]
        public IQueryable<Material> GetMaterials3( int top ,int? skip=null)
        {
            return unitOfWork.CompanyRepository.GetMaterials();
            //if (take == null)
            //    take = top;
            //if (skip == null)
            //    skip = 0;
            //int _totalCount = -1;
            //long elapsed = 0;
            //List<Material> _items = null;

            //MemoryCacher mc = new MemoryCacher();
            //_items = mc.GetValue("materials_" + skip + "_" + take) as List<Material>;

            //if (_items == null)
            //{


            //    List<string> where = new List<string>();
            //    if (!string.IsNullOrEmpty(Material))
            //    {
            //        Material = Material.ToLower();
            //        where.Add("Material like '%" + Material + "%'");
            //    }

            //    if (!string.IsNullOrEmpty(sups))
            //    {

            //        var _gSup = sups.ToLower().Split('_');
            //        List<string> supwhere = new List<string>();
            //        foreach (var _sup in _gSup)
            //        {
            //            supwhere.Add(" SUPPLIER like '%" + _sup + "%'");
            //        }
            //        where.Add("(" + string.Join(" or ", supwhere) + ")");

            //    }
            //    if (!string.IsNullOrEmpty(gmaterials))
            //    {
            //        var _gmaterials = gmaterials.ToLower().Split('_');
            //        List<string> supwhere = new List<string>();
            //        foreach (var _mat in _gmaterials)
            //        {
            //            supwhere.Add(" GENERAL like '%" + _mat + "%'");
            //        }
            //        where.Add("(" + string.Join(" or ", supwhere) + ")");
            //    }

            //    if (mts != null)
            //    {

            //        where.Add("TensileStrength is not null and  TensileStrength>=" + mts);

            //    }
            //    if (mfs != null)
            //    {
            //        where.Add("FlexuralStrength is not null and  FlexuralStrength>=" + mfs);

            //    }


            //    var whr = string.Join(" and ", where);


            //    var cmd = "select  Id ,Material as Material1 ,Supplier ,ManWebsite ,General ,Specific ,TensileStrength ,TensileStrengthStandard ,FlexuralStrength ,FlexuralStrengthStandard ,FlexuralModulus,FlexuralModulusStandard ,ElongationAtBreak ,SolidDensity ,DensityStandard ,MinParticleSize ,MaxParticleSize ,PostProcessed ,PostProcessingConditions ,SolubleSupport ,SupportMaterialName ,SupportMaterialType ,YearReleased "
            //        + "FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY Supplier,Material ) AS RowNum, * "
            //        + " FROM      Material "
            //        + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "")
            //        + "   ) AS RowConstrainedResult "
            //        + " WHERE   RowNum >" + skip + "     AND RowNum <= " + (skip + take)
            //        + " ORDER BY RowNum";
            //    var cmdCount = "select count(*) From material"
            //         + (!string.IsNullOrEmpty(whr) ? " WHERE " + whr : "");

            //    Stopwatch stopwatch = new Stopwatch();

            //    // Begin timing.
            //    stopwatch.Start();
            //    var materials = unitOfWork.CompanyRepository.GetMaterialsDbSet().SqlQuery(cmd);


            //    _totalCount = unitOfWork.CompanyRepository.GetDatabase().SqlQuery<int>(cmdCount).ToList().First();
            //    // mc.Add("materials_count", _totalCount, DateTimeOffset.UtcNow.AddMinutes(5));

            //    _items = materials.ToList();
            //    stopwatch.Stop();
            //    elapsed = stopwatch.ElapsedMilliseconds;
            //    // mc.Add("materials_" + skip + "_" + take, _items, DateTimeOffset.UtcNow.AddMinutes(5));
            //}
            //else
            //{
            //    _totalCount = Convert.ToInt32(mc.GetValue("materials_count"));
            //}
            //var result = new
            //{
            //    totalCount = _totalCount,
            //    items = _items,
            //    elapsed
            //};
            //return Ok(result);




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
