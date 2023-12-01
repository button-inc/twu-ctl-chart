-- Revert twuproject:insert_dummy_data from pg

BEGIN;

-- revert/insert_dummy_data.sql
DELETE FROM boats WHERE name IN (
  'Salmon Seeker', 
  'Wave Dancer', 
  'Ocean Explorer', 
  'Marine Voyager', 
  'Coastal Spirit', 
  'Harbor Guardian', 
  'Sea Adventurer', 
  'River Runner'
);


COMMIT;
