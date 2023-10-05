# BCard App

# Advertising Buisness Application

This is a dynamic application for advertising businesses that provides full CRUD functionality and a RESTful API. It is built using React TypeScript Template with Material-UI for the frontend, Node.js with Express for the backend, and MongoDB as the database.

## Installation

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB
- Installation:
  - 1 Clone the repository:
  - 2 Install the dependencies:
- run: npm Install at both backend and main project folder directories
  - Server port at 3000
  - React development port at 3001
- Start the development server at Server directory: npm start.
- Start the frontend on main project directory: npm start.


## Features

- Create, read, update, and delete (CRUD) operations for managing advertisements
- RESTful API for accessing and manipulating advertisement data
- User-friendly interface with a modern and responsive design
- Integration with MongoDB for data storage
- Multi-users Favorite functionality and My cards abilities
- BackEnd and FrontEnd RouteGuard , Adapted to three types of users : User , Buisness , Admin
- Admin Area with users console
- Login limited to 3 failed attempts, if limit reached users account will be blocked for 24 hours

---

## Technologies Used

- React: A JavaScript library for building user interfaces - Using TypeScript template.
- Material-UI: A popular React UI framework that provides pre-designed components and styling.
- Bootstrap: A popular UI framework that provide designed compenents and styling.
- Node.js: A runtime environment for executing JavaScript code on the server-side.
- Express: A minimalist web application framework for Node.js.
- MongoDB: A document-oriented NoSQL database for storing application data.

## Project Restrictions: (As of the time of writing)

- Running the server initializes the project by providing a hardcoded buisnesses json to the database, reprovides only when no businesses exist.

