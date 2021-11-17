truncate table project_image;
truncate table floor;
truncate table project;

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test2', 200, 80, 25000, 197, 250, 'кирпич', 15, 'ленточный', 'монолитная ж/б плита',
        'битумная черепица', 2000000, 'пенопласт', 10, 15, 15, 'современный',
        true, 3, 'test project 2', 2);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test3', 90, 10, 9500, 50, 120, 'кирпич', 15, 'свайный', 'дерево', 'шифер', 100000,
        'стекловата', 10, 5, 15, 'классический', false, 1, 'test project 3', 1);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test4', 500, 90, 100000, 450, 550, 'газоблок', 15, 'свайный', 'дерево', 'шифер', 10000000,
        'стекловата', 10, 20, 20, 'классический', false, 2, 'test project', 1);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test1', 120, 21, 10000, 111, 180, 'газоблок', 15, 'свайный', 'дерево', 'шифер', 1000000,
        'стекловата', 10, 10, 15, 'классический', true, 5, 'test project', 1);


truncate table project_image;
truncate table floor;
truncate table project;

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test2', 200, 80, 25000, 197, 250, 'кирпич', 15, 'ленточный', 'монолитная ж/б плита',
        'битумная черепица', 2000000,
        'пенопласт', 10, 15, 15, 'современный', true, 3, 'test poject 2', 2);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test3', 90, 10, 9500, 50, 120, 'кирпич', 15, 'свайный', 'дерево', 'шифер', 100000,
        'стекловата', 10, 5, 15, 'классический', false, 1, 'test poject 3', 1);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test4', 500, 90, 100000, 450, 550, 'газоблок', 15, 'свайный', 'дерево', 'шифер', 10000000,
        'стекловата', 10, 20, 20, 'классический', false, 2, 'test poject', 1);

INSERT INTO project(title, general_area, time_to_create, project_price, living_area,
                    building_area, wall_material, wall_thickness, foundation, ceiling, roof,
                    building_price, insulation, insulation_thickness, length, width, style,
                    is_garage_present, bedroom_count, description, popularity)
VALUES ('Test1', 120, 21, 10000, 111, 180, 'газоблок', 15, 'свайный', 'дерево', 'шифер', 1000000,
        'стекловата', 10, 10, 15, 'классический', true, 5, 'test poject', 1);


INSERT INTO floor(index, area, height, planning_image, project_id, is_attic, is_basement)
VALUES (1, 50, 2, '/img/projects/p1-plan.jpeg', 1, false, false);

INSERT INTO floor(area, height, project_id, is_attic, is_basement)
VALUES (50, 2, 1, true, false);

INSERT INTO floor(index, area, height, planning_image, project_id, is_attic, is_basement)
VALUES (1, 80, 2, '/img/projects/p2-plan.jpeg', 2, false, false);

INSERT INTO floor(index, area, height, planning_image, project_id, is_attic, is_basement)
VALUES (1, 80, 3, '/img/projects/p3-plan-1.jpeg', 3, false, false);
INSERT INTO floor(index, area, height, planning_image, project_id, is_attic, is_basement)
VALUES (2, 80, 2, '/img/projects/p3-plan-2.jpeg', 3, false, false);
INSERT INTO floor(area, height, planning_image, project_id, is_attic, is_basement)
VALUES (80, 2, '/img/projects/p2-plan-attic.jpeg', 3, true, false);
INSERT INTO floor(area, height, planning_image, project_id, is_attic, is_basement)
VALUES (80, 2, '/img/projects/p2-plan-basement.jpeg', 3, false, true);


INSERT INTO floor(index, area, height, project_id, is_attic, is_basement)
VALUES (1, 80, 2, 4, false, false);
INSERT INTO floor(index, area, height, project_id, is_attic, is_basement)
VALUES (2, 80, 2, 3, false, false);

