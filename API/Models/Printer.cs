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
    
    public partial class Printer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Printer()
        {
            this.PrinterMaterials = new HashSet<PrinterMaterial>();
        }
    
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Technology { get; set; }
        public string Material { get; set; }
        public string BuildVolume { get; set; }
        public string MinLayerHeight { get; set; }
        public string MaxLayerHeight { get; set; }
        public Nullable<int> PrintingSpeed { get; set; }
        public string ObjectFile { get; set; }
        public string Color { get; set; }
        public Nullable<int> BuildVolume_W { get; set; }
        public Nullable<int> BuildVolume_H { get; set; }
        public Nullable<int> BuildVolume_D { get; set; }
        public Nullable<int> Min_LH { get; set; }
        public Nullable<int> Max_LH { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PrinterMaterial> PrinterMaterials { get; set; }
        public virtual Company Company { get; set; }
    }
}