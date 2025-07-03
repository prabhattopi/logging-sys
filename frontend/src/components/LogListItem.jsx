import React from 'react';

export function LogListItem({ log }) {
  const { level, message, resourceId, timestamp, traceId, commit } = log;
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  const levelClassName = `log-item level-${level || 'default'}`;

  return (
    <li className={levelClassName}>
      <div className="log-header">
        <span className="log-level">{level.toUpperCase()}</span>
        <span>{formattedTimestamp}</span>
      </div>
      <div className="log-message">{message}</div>
      <div className="log-meta">
        <span><strong>Resource ID:</strong> {resourceId}</span>
        <span><strong>Trace ID:</strong> {traceId}</span>
        <span><strong>Commit:</strong> {commit}</span>
      </div>
    </li>
  );
}