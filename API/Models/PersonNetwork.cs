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
    
    public partial class PersonNetwork
    {
        public int Id { get; set; }
        public int NetworkId { get; set; }
        public int PersonId { get; set; }
        public string Remark { get; set; }
    
        public virtual NetworkGroup NetworkGroup { get; set; }
        public virtual Person Person { get; set; }
    }
}