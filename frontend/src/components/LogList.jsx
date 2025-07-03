import React from 'react';
import { LogListItem } from './LogListItem';

export function LogList({ logs, isLoading }) {
  if (isLoading) {
    return <div className="loading-text">Loading logs...</div>;
  }

  if (logs.length === 0) {
    return <div className="no-logs-text">No logs found.</div>;
  }

  return (
    <ul className="log-list">
      {logs.map((log, index) => (
        <LogListItem key={`${log.traceId}-${index}`} log={log} />
      ))}
    </ul>
  );
}