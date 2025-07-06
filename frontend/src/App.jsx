// frontend/src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { io } from "socket.io-client";
import { LogFilterBar } from './components/LogFilterBar';
import { LogList } from './components/LogList';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { getLogs } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INITIAL_FILTERS = { level: '', message: '', resourceId: '', timestamp_start: '', timestamp_end: '' };

function App() {
  const [allLogs, setAllLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedMessage = useDebounce(filters.message, 500);
  const debouncedResourceId = useDebounce(filters.resourceId, 500);

  const activeFilters = useMemo(() => ({
    ...filters,
    message: debouncedMessage,
    resourceId: debouncedResourceId,
  }), [filters, debouncedMessage, debouncedResourceId]);

  // Initial data fetch and socket connection
  useEffect(() => {
    getLogs({}).then(initialLogs => {
      setAllLogs(initialLogs);
      setIsLoading(false);
    });

    // Add the options object as the second argument
    const socket = io(API_BASE_URL, {
      withCredentials: true // 👈 Add this option
    });
    socket.on('new_log', (newLog) => {
      setAllLogs(prevLogs => [newLog, ...prevLogs]);
    });

    return () => socket.disconnect();
  }, []);

  // Effect to apply filters when logs or filters change
  useEffect(() => {
    let result = allLogs;
    if (activeFilters.level) result = result.filter(log => log.level === activeFilters.level);
    if (activeFilters.message) result = result.filter(log => log.message.toLowerCase().includes(activeFilters.message.toLowerCase()));
    if (activeFilters.resourceId) result = result.filter(log => log.resourceId.toLowerCase().includes(activeFilters.resourceId.toLowerCase()));
    if (activeFilters.timestamp_start) result = result.filter(log => new Date(log.timestamp) >= new Date(activeFilters.timestamp_start));
    if (activeFilters.timestamp_end) result = result.filter(log => new Date(log.timestamp) <= new Date(activeFilters.timestamp_end));
    setFilteredLogs(result);
  }, [allLogs, activeFilters]);

  const handleFilterChange = (name, value) => setFilters(prev => ({ ...prev, [name]: value }));
  const handleClearFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <div className="app-container">
      <h1>Log Query System</h1>
      <AnalyticsDashboard logs={filteredLogs} />
      <LogFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <LogList
        logs={filteredLogs}
        isLoading={isLoading}
        searchTerm={filters.message}
      />
    </div>
  );
}

export default App;