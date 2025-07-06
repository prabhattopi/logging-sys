const filterLogs = (logs, filters) => {
    return logs.filter(log => {
      let isValid = true;
      for (const key in filters) {
        if (filters[key]) {
          if (key === 'message') {
            isValid = isValid && log.message.toLowerCase().includes(filters[key].toLowerCase());
          } else if (key === 'level') {
            isValid = isValid && log.level === filters[key];
          }
          // Add other filter conditions here as needed
        }
      }
      return isValid;
    });
  };
  
  const mockLogs = [
    { level: 'error', message: 'Failed to connect' },
    { level: 'info', message: 'User logged in' },
    { level: 'error', message: 'Database connection error' },
    { level: 'warn', message: 'Disk space low' },
  ];
  
  describe('Log Filtering Logic', () => {
    test('should return all logs when no filters are applied', () => {
      expect(filterLogs(mockLogs, {})).toHaveLength(4);
    });
  
    test('should filter by level correctly', () => {
      const errorLogs = filterLogs(mockLogs, { level: 'error' });
      expect(errorLogs).toHaveLength(2);
      expect(errorLogs[0].level).toBe('error');
    });
  
    test('should filter by message content (case-insensitive)', () => {
      const connectionLogs = filterLogs(mockLogs, { message: 'connect' });
      expect(connectionLogs).toHaveLength(2);
    });
  
    test('should combine filters with AND logic', () => {
      const specificError = filterLogs(mockLogs, { level: 'error', message: 'database' });
      expect(specificError).toHaveLength(1);
      expect(specificError[0].message).toBe('Database connection error');
    });
  });