const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || './database/auditor.db';

let db;

const initDatabase = () => {
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('❌ Database connection error:', err.message);
    } else {
      console.log('✅ Connected to SQLite database');
      createTables();
    }
  });
};

const createTables = () => {
  const auditResultsTable = `
    CREATE TABLE IF NOT EXISTS audit_results (
      id TEXT PRIMARY KEY,
      file_name TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      analyzed_at TEXT NOT NULL,
      hostname TEXT,
      total_issues INTEGER,
      critical_count INTEGER,
      high_count INTEGER,
      medium_count INTEGER,
      low_count INTEGER,
      security_score INTEGER,
      issues TEXT,
      config_summary TEXT,
      raw_config TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(auditResultsTable, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Database tables ready');
    }
  });
};

const getDatabase = () => {
  if (!db) {
    initDatabase();
  }
  return db;
};

const saveAuditResult = (result) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const query = `
      INSERT INTO audit_results (
        id, file_name, file_size, analyzed_at, hostname,
        total_issues, critical_count, high_count, medium_count, low_count,
        security_score, issues, config_summary, raw_config
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      result.id,
      result.fileName,
      result.fileSize,
      result.analyzedAt,
      result.config.hostname || '',
      result.summary.total,
      result.summary.critical,
      result.summary.high,
      result.summary.medium,
      result.summary.low,
      result.summary.score,
      JSON.stringify(result.issues),
      JSON.stringify(result.config),
      result.rawConfig
    ];

    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: result.id });
      }
    });
  });
};

const getAuditResult = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const query = 'SELECT * FROM audit_results WHERE id = ?';

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve(null);
      } else {
        resolve({
          ...row,
          issues: JSON.parse(row.issues),
          config: JSON.parse(row.config_summary)
        });
      }
    });
  });
};

const getAllAuditResults = (limit = 10) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const query = `
      SELECT id, file_name, analyzed_at, total_issues, security_score, created_at
      FROM audit_results
      ORDER BY created_at DESC
      LIMIT ?
    `;

    db.all(query, [limit], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const deleteAuditResult = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const query = 'DELETE FROM audit_results WHERE id = ?';

    db.run(query, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ deleted: this.changes > 0 });
      }
    });
  });
};

module.exports = {
  initDatabase,
  getDatabase,
  saveAuditResult,
  getAuditResult,
  getAllAuditResults,
  deleteAuditResult
};