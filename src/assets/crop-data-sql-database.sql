DROP DATABASE IF EXISTS DATA_SYSTEMS;

CREATE DATABASE DATA_SYSTEMS;
USE DATA_SYSTEMS;

CREATE TABLE FARM (
                      farm_id INT PRIMARY KEY AUTO_INCREMENT,
                      farm_name VARCHAR(100) NOT NULL,
                      farm_location VARCHAR(100) NOT NULL,
                      water_source VARCHAR(100)
);

CREATE TABLE SOIL (
                      farm_id INT NOT NULL PRIMARY KEY,
                      ph_level FLOAT,
                      nitrogen_level INT,
                      phosphorus_level INT,
                      potassium_level INT,
                      FOREIGN KEY (farm_id) REFERENCES FARM(farm_id)
);

CREATE TABLE SUSTAINABILITY_INITIATIVE (
                                           initiative_id INT PRIMARY KEY AUTO_INCREMENT,
                                           initiative_description VARCHAR(100) NOT NULL,
                                           expected_impact VARCHAR(100),
                                           environmental_impact_score INT
);

CREATE TABLE SUSTAINABILITY_INITIATIVE_APPLICATION (
                                                       initiative_application_id INT PRIMARY KEY AUTO_INCREMENT,
                                                       initiative_id INT NOT NULL,
                                                       farm_id INT NOT NULL,
                                                       date_initiated DATE,
                                                       FOREIGN KEY (initiative_id) REFERENCES SUSTAINABILITY_INITIATIVE(initiative_id),
                                                       FOREIGN KEY (farm_id) REFERENCES FARM(farm_id)
);

CREATE TABLE CROP_TYPE (
                           crop_type_id INT PRIMARY KEY AUTO_INCREMENT,
                           crop_type VARCHAR(100) NOT NULL
);

CREATE TABLE CROP_APPLICATION (
                                  crop_application_id INT PRIMARY KEY AUTO_INCREMENT,
                                  crop_type_id INT NOT NULL,
                                  farm_id INT NOT NULL,
                                  planting_date DATE,
                                  harvest_date DATE,
                                  crop_yield INT,
                                  labour_hours INT,
                                  FOREIGN KEY (crop_type_id) REFERENCES CROP_TYPE(crop_type_id),
                                  FOREIGN KEY (farm_id) REFERENCES FARM(farm_id)
);

CREATE TABLE RESOURCE_TYPE (
                               resource_type_id INT PRIMARY KEY AUTO_INCREMENT,
                               resource_type VARCHAR(100) NOT NULL
);

CREATE TABLE RESOURCE_APPLICATION (
                                      resource_application_id INT PRIMARY KEY AUTO_INCREMENT,
                                      resource_type_id INT NOT NULL,
                                      crop_application_id INT NOT NULL,
                                      resource_quantity INT NOT NULL,
                                      date_of_application DATE NOT NULL,
                                      FOREIGN KEY (resource_type_id) REFERENCES RESOURCE_TYPE(resource_type_id),
                                      FOREIGN KEY (crop_application_id) REFERENCES CROP_APPLICATION(crop_application_id)
);


INSERT INTO FARM (farm_id, farm_name, farm_location, water_source)
VALUES
    (1, 'South Farm', 'Kent', 'River'),
    (2, 'Green Acre', 'Essex', 'Borehole'),
    (3, 'Sunny Fields', 'Hampshire', 'Rainwater'),
    (4, 'Hilltop Farm', 'Yorkshire', 'Well'),
    (5, 'Riverbend Farm', 'Cornwall', 'River')
;

INSERT INTO SOIL (farm_id, ph_level, nitrogen_level, phosphorus_level, potassium_level)
VALUES
    (1, 6.5, 50, 20, 100),
    (2, 6.8, 40, 25, 160),
    (3, 6.2, 30, 15, 150),
    (4, 6.4, 45, 22, 175),
    (5, 6.7, 55, 28, 200)
;

INSERT INTO SUSTAINABILITY_INITIATIVE (initiative_id, initiative_description, expected_impact, environmental_impact_score)
VALUES
    (1, 'Organic Farming', 'Increase in yield', 4),
    (2, 'Crop Rotation', 'Improved soil quality', 4),
    (3, 'Water Conservation', 'Reduced water usage', 3),
    (4, 'Soil Health Improvement', 'Enhanced nutrient retention', 2),
    (5, 'Pesticide Reduction', 'Less chemical runoff', 4)
;

INSERT INTO SUSTAINABILITY_INITIATIVE_APPLICATION (initiative_application_id, initiative_id, farm_id, date_initiated)
VALUES
    (1, 1, 1, '2023-01-01'),
    (2, 2, 2, '2023-02-15'),
    (3, 3, 3, '2023-03-01'),
    (4, 4, 4, '2023-01-20'),
    (5, 5, 5, '2023-02-10')
;

INSERT INTO CROP_TYPE (crop_type_id, crop_type)
VALUES
    (1, 'Wheat'),
    (2, 'Barley'),
    (3, 'Corn'),
    (4, 'Soybeans'),
    (5, 'Potatoes'),
    (6, 'Carrots'),
    (7, 'Apples'),
    (8, 'Pears'),
    (9, 'Tomatoes'),
    (10, 'Lettuce')
;

INSERT INTO CROP_APPLICATION (crop_application_id, crop_type_id, farm_id, planting_date, harvest_date, crop_yield, labour_hours)
VALUES
    (101, 1, 1, '2023-03-15', '2023-08-15', 3000, 150),
    (102, 2, 1, '2023-03-16', '2023-08-20', 2800, 120),
    (201, 3, 2, '2023-04-10', '2023-09-15', 1500, 200),
    (202, 4, 2, '2023-04-11', '2023-09-20', 1200, 180),
    (301, 5, 3, '2023-03-20', '2023-07-20', 2000, 160),
    (302, 6, 3, '2023-03-21', '2023-07-20', 2200, 170),
    (401, 7, 4, '2023-04-05', '2023-09-10', 1800, 140),
    (402, 8, 4, '2023-04-06', '2023-09-15', 1600, 130),
    (501, 9, 5, '2023-03-25', '2023-08-10', 2500, 190),
    (502, 10, 5, '2023-03-26', '2023-08-15', 2400, 175)
;

INSERT INTO RESOURCE_TYPE (resource_type_id, resource_type)
VALUES
    (1, 'Water'),
    (2, 'Fertilizer'),
    (3, 'Energy')
;

INSERT INTO RESOURCE_APPLICATION (resource_application_id, resource_type_id, crop_application_id, resource_quantity, date_of_application)
VALUES
    (1011, 1, 101, 1000, '2023-03-10'),
    (1012, 3, 101, 360000, '2023-05-30'),
    (1021, 2, 102, 200, '2023-03-12'),
    (1022, 3, 102, 280000, '2023-06-02'),
    (2011, 1, 201, 800, '2023-04-05'),
    (2012, 3, 201, 180000, '2023-09-24'),
    (2021, 2, 202, 150, '2023-04-06'),
    (2022, 3, 202, 144000, '2023-10-12'),
    (3011, 1, 301, 1200, '2023-03-18'),
    (3012, 3, 301, 240000, '2023-05-17'),
    (3021, 2, 302, 300, '2023-03-19'),
    (3022, 3, 302, 264000, '2023-05-20'),
    (4011, 1, 401, 900, '2023-04-02'),
    (4012, 3, 401, 216000, '2023-07-22'),
    (4021, 2, 402, 250, '2023-04-03'),
    (4022, 3, 402, 192000, '2023-07-25'),
    (5011, 3, 501, 300000, '2023-07-01'),
    (5012, 1, 501, 1100, '2023-03-22'),
    (5021, 3, 502, 288000, '2023-06-05'),
    (5022, 2, 502, 180, '2023-03-24')
;