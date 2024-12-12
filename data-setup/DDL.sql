/** 
	my application is using MongoDB as its database 
	the following MySQL DDL equivalent to tables used in MongoDB
	the json sample is available in repository under folder /data-setup
**/

create database ppobdb;

CREATE TABLE users (
    _id CHAR(24) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_image VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (_id)
);


CREATE TABLE services (
    _id CHAR(24) NOT NULL,
    service_code VARCHAR(50) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_icon VARCHAR(255) NOT NULL,
    service_tariff INT NOT NULL,
    PRIMARY KEY (_id)
);

CREATE TABLE balance (
    _id CHAR(24) NOT NULL,
    email VARCHAR(255) NOT NULL,
    balance INT NOT NULL,
    PRIMARY KEY (_id)
);
CREATE TABLE banner (
    _id CHAR(24) NOT NULL,
    banner_name VARCHAR(100) NOT NULL,
    banner_image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (_id)
);
CREATE TABLE transaction (
    _id CHAR(24) NOT NULL,
    invoice_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service_code VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    total_amount INT NOT NULL,
    created_on DATETIME NOT NULL,
    PRIMARY KEY (_id)
);
