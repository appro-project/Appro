create sequence if not exists project_config_id_seq;

CREATE TABLE if not exists project_config
(
    id   SERIAL PRIMARY KEY,
    show_on_main boolean          DEFAULT false,
    is_finished  boolean          DEFAULT false
-- ,
--     CONSTRAINT pk_project_id PRIMARY KEY (id),
--     CONSTRAINT fk_project_id FOREIGN KEY (id)
--         REFERENCES project (id) MATCH SIMPLE
)