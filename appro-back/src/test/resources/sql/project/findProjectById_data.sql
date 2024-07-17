INSERT INTO project (title, description, popularity, general_area, time_to_create, project_price,
                     living_area, building_area, wall_material, wall_thickness, foundation, ceiling,
                     roof, building_price, insulation, insulation_thickness, length, width, style,
                     is_garage_present, bedroom_count, created_at, is_deleted, show_on_main, is_finished)
VALUES ('Будинок із привидами', 'Рухлять минулого століття', 2, 333.6, 28, 49998, 250.4, 301.5, 'CERAMIC_BLOCK',
        0.4, 'COLUMNAR', 'WOOD', 'FLAT', 2000000, 'EXPANDED_POLYSTYRENE', 0.15, 24.2, 32.5, 'CLASSIC',
        true, 8, now(), false, false, false);



INSERT INTO project_image (path, type, project_id)
VALUES ('http://127.0.0.1:51774/my-s3-bucket/1',
        'image', 1);

INSERT INTO project_image (path, type, project_id)
VALUES ('http://127.0.0.1:51774/my-s3-bucket/2',
        'main', 1);

INSERT INTO project_image (path, type)
VALUES ('http://127.0.0.1:51774/my-s3-bucket/3',
        'main');

INSERT INTO floor (index, is_attic, is_basement, area, height, project_id, image_id)
VALUES (0, false, true, 84.0, 2.5, 1, 3);