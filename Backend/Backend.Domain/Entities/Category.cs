using Group2.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Group2.Domain.Entity
{
    public class Category : BaseEntity
    {

        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

        public ICollection<Asset> Assets { get; set; }
    }
}
