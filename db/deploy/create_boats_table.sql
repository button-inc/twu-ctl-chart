-- Deploy twuproject:create_boats_table to pg

BEGIN;

CREATE TABLE boats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

COMMIT;
