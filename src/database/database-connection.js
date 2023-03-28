import * as SQLite from 'expo-sqlite';

// connect to sqlite database
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};