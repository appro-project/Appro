create sequence if not exists project_config_id_seq;

CREATE TABLE if not exists project_config
(
    project_id   integer NOT NULL DEFAULT nextval('project_config_id_seq'),
    show_on_main boolean          DEFAULT false,
    is_finished  boolean          DEFAULT false,
    CONSTRAINT pk_project_id PRIMARY KEY (project_id),
    CONSTRAINT fk_project_id FOREIGN KEY (project_id)
        REFERENCES project (id) MATCH SIMPLE
)