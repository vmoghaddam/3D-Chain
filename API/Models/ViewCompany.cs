//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ViewCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> DateVerified { get; set; }
        public string DateVerifiedStr { get; set; }
        public int IsVerified { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public Nullable<bool> RushDelivery24 { get; set; }
        public string ImageUrl { get; set; }
        public string ImageUrl2 { get; set; }
        public Nullable<bool> RushDelivery48 { get; set; }
        public Nullable<int> PersonId { get; set; }
        public System.DateTime DateJoin { get; set; }
        public string DateJoinStr { get; set; }
        public Nullable<decimal> TotalRate { get; set; }
        public Nullable<int> TotalRateCount { get; set; }
        public string ZIPCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string CountrySortName { get; set; }
        public string Country { get; set; }
        public string Location { get; set; }
        public string Network { get; set; }
        public string Remark { get; set; }
        public string MaterialsGeneral { get; set; }
        public string Technology { get; set; }
        public string DimX { get; set; }
        public string DimY { get; set; }
        public string DimZ { get; set; }
        public string MinLayer { get; set; }
        public string MaxLayer { get; set; }
    }
}