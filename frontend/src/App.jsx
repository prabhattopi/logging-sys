import React, { useState, useEffect } from 'react';
import { LogFilterBar } from './components/LogFilterBar';
import { LogList } from './components/LogList';
import { getLogs } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const INITIAL_FILTERS = {
  level: '',
  message: '',
  resourceId: '',
  timestamp_start: '',
  timestamp_end: '',
  traceId: '',
  spanId: '',
  commit: '',
};

function App() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      const fetchedLogs = await getLogs(debouncedFilters);
      setLogs(fetchedLogs);
      setIsLoading(false);
    };
    fetchLogs();
  }, [debouncedFilters]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: ['timestamp_start', 'timestamp_end'].includes(name)
        ? value
        : value,
    }));
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
