CREATE TABLE IF NOT EXISTS project_image
(
    id         SERIAL PRIMARY KEY,
    path       text,
    is_main    boolean default false,
    is_photo   boolean default false,
    project_id int REFERENCES project (id)
);