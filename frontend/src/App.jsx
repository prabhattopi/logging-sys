import React, { useState, useEffect, useMemo } from 'react';
import { LogFilterBar } from './components/LogFilterBar';
import { LogList } from './components/LogList';
import { getLogs } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const INITIAL_FILTERS = {
  level: '', message: '', resourceId: '', timestamp_start: '',
  timestamp_end: '', traceId: '', spanId: '', commit: '',
};

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedMessage = useDebounce(filters.message, 500);
  const debouncedResourceId = useDebounce(filters.resourceId, 500);

  const activeFilters = useMemo(() => ({
    ...filters,
    message: debouncedMessage,
    resourceId: debouncedResourceId,
  }), [filters, debouncedMessage, debouncedResourceId]);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      const fetchedLogs = await getLogs(activeFilters);
      setLogs(fetchedLogs);
      setIsLoading(false);
    };
    fetchLogs();
  }, [activeFilters]);

  const handleFilterChange = (name, value) => {
    let finalValue = value;
    if (name === 'timestamp_start' || name === 'timestamp_end') {
      finalValue = value ? new Date(value).toISOString() : '';
    }
    setFilters(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="app-container">
      <h1>Log Query System</h1>
      <LogFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <LogList logs={logs} isLoading={isLoading} />
    </div>
  );
}

export default App;