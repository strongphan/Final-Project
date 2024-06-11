﻿using Group2.Application.IRepositories;
using Group2.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Group2.Infrastructure.Repository
{
    public abstract class BaseRepoitory<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected AssetContext _context;
        protected DbSet<TEntity> _table;
        public BaseRepoitory(AssetContext dbContext)
        {
            _context = dbContext;
            _table = _context.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _table.ToListAsync();

        }

        public virtual async Task<TEntity?> GetByIdAsync(int id)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            return await _table.FindAsync(id);
        }

        public async Task InsertAsync(TEntity entity)
        {
            _table.Add(entity);
            await SaveChangeAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            _table.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await SaveChangeAsync();
        }
        public async Task DeleteAsync(TEntity entity)
        {
            _table.Remove(entity);
            await SaveChangeAsync();
        }
        public async Task SaveChangeAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

