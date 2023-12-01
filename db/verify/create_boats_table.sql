-- Verify twuproject:create_boats_table on pg

BEGIN;

-- Check if the 'boats' table exists
SELECT 'table exists' AS test
WHERE EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename  = 'boats'
);

-- Check if the 'id', 'name', and 'status' columns exist in the 'boats' table
SELECT 'id column exists' AS test
WHERE EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'boats' AND column_name = 'id'
);

SELECT 'name column exists' AS test
WHERE EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'boats' AND column_name = 'name'
);

SELECT 'status column exists' AS test
WHERE EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'boats' AND column_name = 'status'
);

ROLLBACK;
