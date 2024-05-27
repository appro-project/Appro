CREATE TABLE IF NOT EXISTS project
(
    id                   SERIAL PRIMARY KEY,
    title                varchar(512),
    description          text,
    popularity           numeric   default 0,
    general_area         numeric,
    time_to_create       numeric,
    project_price        numeric,
    living_area          numeric,
    building_area        numeric,
    wall_material        varchar(512),
    wall_thickness       numeric,
    foundation           varchar(512),
    ceiling              varchar(512),
    roof                 varchar(512),
    building_price       numeric,
    insulation           varchar(512),
    insulation_thickness numeric,
    length               numeric,
    width                numeric,
    style                varchar(512),
    is_garage_present    boolean   default false,
    bedroom_count        integer,
    created_at           timestamp
);

