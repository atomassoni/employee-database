CREATE TABLE employees (
   id serial PRIMARY KEY,
   first_name varchar(50),
   last_name varchar(50),
   job_title varchar(50),
   annual_salary numeric(12,2)
);

ALTER TABLE employees
ADD active boolean DEFAULT TRUE;
