ALTER TABLE floor DROP COLUMN IF EXISTS planning_image;
ALTER TABLE floor ADD COLUMN IF NOT EXISTS image_id INT REFERENCES project_image(id);

