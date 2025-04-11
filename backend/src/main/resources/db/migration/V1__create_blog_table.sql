-- V1__create_user_table.sql
CREATE TABLE "blog" (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
