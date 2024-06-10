using Group2.Domain.Entity;

namespace Group2.Domain.Entities
{
    public class Asset : BaseEntity
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Category { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public string State { get; set; } // "Available" or "Not available"
    }
}
