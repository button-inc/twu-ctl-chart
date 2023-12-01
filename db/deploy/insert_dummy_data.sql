-- Deploy twuproject:insert_dummy_data to pg
-- requires: create_boats_table

BEGIN;

-- deploy/insert_dummy_data.sql
INSERT INTO boats (name, status) VALUES
('Salmon Seeker', 'Docked'),
('Wave Dancer', 'Outbound to Sea'),
('Ocean Explorer', 'Inbound to Harbor'),
('Marine Voyager', 'Maintenance'),
('Coastal Spirit', 'Docked'),
('Harbor Guardian', 'Outbound to Sea'),
('Sea Adventurer', 'Inbound to Harbor'),
('River Runner', 'Maintenance');


COMMIT;
