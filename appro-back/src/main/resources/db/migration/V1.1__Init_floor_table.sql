CREATE TABLE IF NOT EXISTS floor
(
    id             SERIAL PRIMARY KEY,
    index          integer,
    is_attic       boolean default false,
    is_basement    boolean default false,
    area           numeric,
    height         numeric,
    planning_image varchar(512),
    project_id     int REFERENCES project (id)
);