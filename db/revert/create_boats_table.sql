-- Revert twuproject:create_boats_table from pg

BEGIN;

DROP TABLE IF EXISTS boats;

COMMIT;
