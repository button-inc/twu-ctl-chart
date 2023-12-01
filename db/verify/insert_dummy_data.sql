-- Verify twuproject:insert_dummy_data on pg

BEGIN;

-- verify/insert_dummy_data.sql
SELECT 'dummy data exists' AS test
WHERE EXISTS (
    SELECT 1 FROM boats WHERE name = 'Salmon Seeker'
);


ROLLBACK;
