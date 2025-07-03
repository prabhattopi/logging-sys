import React from 'react';

export function LogFilterBar({ filters, onFilterChange, onClearFilters }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="message">Message</label>
        <input type="text" id="message" name="message" placeholder="Search..." value={filters.message} onChange={handleInputChange} />
      </div>
      <div className="filter-group">
        <label htmlFor="level">Level</label>
        <select id="level" name="level" value={filters.level} onChange={handleInputChange}>
          <option value="">All</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="resourceId">Resource ID</label>
        <input type="text" id="resourceId" name="resourceId" placeholder="server-1234" value={filters.resourceId} onChange={handleInputChange} />
      </div>
      <div className="filter-group">
        <label htmlFor="timestamp_start">Start Date</label>
        <input type="datetime-local" id="timestamp_start" name="timestamp_start" value={filters.timestamp_start} onChange={handleInputChange} />
      </div>
      <div className="filter-group">
        <label htmlFor="timestamp_end">End Date</label>
        <input type="datetime-local" id="timestamp_end" name="timestamp_end" value={filters.timestamp_end} onChange={handleInputChange} />
      </div>
      <button onClick={onClearFilters} className="clear-button">Clear Filters</button>
    </div>
  );
}