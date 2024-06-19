alter table project_image drop column is_main;
alter table project_image drop column is_photo;

alter table project drop column main_image_id;

alter table project_image add column type varchar not null default 'image';