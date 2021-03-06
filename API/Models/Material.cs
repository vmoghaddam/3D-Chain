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
    
    public partial class Material
    {
        public int Id { get; set; }
        public string Material1 { get; set; }
        public string Supplier { get; set; }
        public string ManWebsite { get; set; }
        public string General { get; set; }
        public string Specific { get; set; }
        public Nullable<double> TensileStrength { get; set; }
        public string TensileStrengthStandard { get; set; }
        public Nullable<double> FlexuralStrength { get; set; }
        public string FlexuralStrengthStandard { get; set; }
        public Nullable<double> FlexuralModulus { get; set; }
        public string FlexuralModulusStandard { get; set; }
        public Nullable<double> ElongationAtBreak { get; set; }
        public Nullable<double> SolidDensity { get; set; }
        public string DensityStandard { get; set; }
        public Nullable<double> MinParticleSize { get; set; }
        public Nullable<double> MaxParticleSize { get; set; }
        public string PostProcessed { get; set; }
        public string PostProcessingConditions { get; set; }
        public string SolubleSupport { get; set; }
        public string SupportMaterialName { get; set; }
        public string SupportMaterialType { get; set; }
        public Nullable<int> YearReleased { get; set; }
    }
}
