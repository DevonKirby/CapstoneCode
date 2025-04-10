import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Enable async/await for SQLite operations
export async function openDB() {
    return open({
        filename: './data.db',
        driver: sqlite3.Database
    });
}