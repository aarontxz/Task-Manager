# Task Manager

## Project Description

This is a simple to do list application that allows the user to create, read, update and delete tasks using loopback 3 for the backend connected to a PostgreSQL database and Ember.js for the frontend.

## Overview of application
<img width="895" alt="Screenshot 2023-12-10 at 12 22 26 PM" src="https://github.com/aarontxz/Task-Manager/assets/115057223/6b36c57d-c3fd-4b04-a0af-6327e1f852af">

## Usage Instructions

- Use the 'Add a new task' box to add Tasks in to your to do list. Title and Status are compulsory field while description and dueDate are optional

  <img width="1004" alt="Screenshot 2023-12-10 at 12 15 20 PM" src="https://github.com/aarontxz/Task-Manager/assets/115057223/af9c82fc-b4dd-40ac-9b84-bf51b5bf8540">

  In the example given above, a new task Math Homework is being added to the to do list with the description chapter 3 question 4-7, status todo and dueDate 12-31-2023.

- Use the 'Update an existing task' box to update Tasks in your to do list. use the ID field to specify which Task to update, and add the change to whichever field you want to change.

  <img width="997" alt="Screenshot 2023-12-10 at 12 17 14 PM" src="https://github.com/aarontxz/Task-Manager/assets/115057223/88f50196-6370-4fe7-9d98-ada0afea9431">

  In the example given aboce, the id of the task with id 27 is being updated to be completed. The rest of the fields will not be changed.
  
## Setup Instructions

###Environment Information

ember-cli: 4.6.0
node: 12.16.2
loopback: 5.2.0
PostgreSQL: 14.10 (Homebrew)


- Clone the repository: `git clone https://github.com/aarontxz/Task-Manager.git`

### Database (PostgreSQL)
- set up a PostgreSQL database using `createdb db'
- create a table called task using `CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  status VARCHAR(255) NOT NULL,
  due_date DATE
);`


### Backend (Loopback 3)

- Navigate to the backend directory: `cd loopback`
- Install dependencies: `npm install`
- edit the datasources.js file in the server folder accordingly to the PostgreSQL database you created.
- Run the server: `node .`

### Frontend (EmberJS)

- Navigate to the frontend directory: `cd frontend`
- Install dependencies: `npm install`
- Run the application: `ember serve`
- the application will be running on: `http://localhost:4200/`

## Limitations\Future features
- Currently there is no output box that tells the user what is the issue if there is an error, eg (attempt to create a task without title)
- dueDate field cant be removed once it has been added and can only be updated
