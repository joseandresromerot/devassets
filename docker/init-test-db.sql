SELECT 'CREATE DATABASE devassets_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'devassets_test')\gexec
