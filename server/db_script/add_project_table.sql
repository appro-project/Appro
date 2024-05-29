CREATE TABLE project (
--                          id SERIAL PRIMARY KEY, +
--                          title varchar(254) NOT NULL,
--                          description varchar(2000),
--                          popularity numeric  default 0,
--                          general_area numeric NOT NULL,
--                          time_to_create numeric NOT NULL,
--                          project_price numeric NOT NULL,
--                          living_area numeric NOT NULL,
--                          building_area numeric NOT NULL,
--                          wall_material varchar(254) NOT NULL,
--                          wall_thickness numeric NOT NULL,
--                          foundation varchar(254) NOT NULL,
--                          ceiling varchar(254) NOT NULL,
--                          roof varchar(254) NOT NULL,
--                          building_price numeric NOT NULL,
--                          insulation varchar(254) NOT NULL,
--                          insulation_thickness numeric NOT NULL,
                         length numeric  NOT NULL,
                         width numeric  NOT NULL,
                         style varchar(254) NOT NULL,
                         is_garage_present boolean default false,
                         bedroom_count numeric NOT NULL,
                         created_at timestamp default now()
);

CREATE TABLE floor (
                       id SERIAL PRIMARY KEY,
                       index numeric,
                       is_attic boolean default false,
                       is_basement boolean default false,
                       area numeric NOT NULL,
                       height numeric NOT NULL,
                       planning_image varchar(254),
                       project_id int REFERENCES project (id)
);


CREATE TABLE project_image (
                            id SERIAL PRIMARY KEY,
                            path varchar(254) NOT NULL,
                            is_main boolean default false,
                            is_photo boolean default false,
                            project_id int REFERENCES project (id)
);


CREATE TABLE project_config (
    project_id integer NOT NULL DEFAULT nextval('project_config_project_id_seq'::regclass),
    showonmain boolean DEFAULT false,
    isfinished boolean DEFAULT false,
    CONSTRAINT pk_project_id PRIMARY KEY (project_id),
    CONSTRAINT fk_project_id FOREIGN KEY (project_id)
        REFERENCES project (id) MATCH SIMPLE
)
