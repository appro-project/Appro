CREATE TABLE project (
                         id SERIAL PRIMARY KEY,
                         title varchar(254) NOT NULL,
                         generalArea numeric NOT NULL,
                         timeToCreate numeric NOT NULL,
                         projectPrice numeric NOT NULL,
                         livingArea numeric NOT NULL,
                         buildingArea numeric NOT NULL,
                         wallMaterial varchar(254) NOT NULL,
                         wallThickness numeric NOT NULL,
                         foundation varchar(254) NOT NULL,
                         ceiling varchar(254) NOT NULL,
                         roof varchar(254) NOT NULL,
                         buildingPrice numeric NOT NULL,
                         insulation varchar(254) NOT NULL,
                         insulationThickness numeric NOT NULL,
                         length numeric  NOT NULL,
                         width numeric  NOT NULL,
                         style varchar(254) NOT NULL,
                         isGaragePresent boolean default false,
                         bedroomCount numeric NOT NULL,
                         createdAt timestamp default now()
);

CREATE TABLE floor (
                       id SERIAL PRIMARY KEY,
                       index numeric NOT NULL,
                       area numeric NOT NULL,
                       height numeric NOT NULL,
                       planningImage varchar(254),
                       projectId int REFERENCES project (id)
);


CREATE TABLE project_image (
                            id SERIAL PRIMARY KEY,
                            path varchar(254) NOT NULL,
                            projectId int REFERENCES project (id)
);
