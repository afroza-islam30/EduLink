# Tuition Media Web Application

A platform connecting Teachers and Guardians for Tuition Opportunities

### Overview

Tuition Media is a web-based platform where:

Teachers can register, log in, browse tuition jobs, filter by location/date, and apply for tuitions.

Guardians can register, log in, post tuitions, view applicant teachers, shortlist candidates, and hire tutors.

The system is built using HTML & CSS for the frontend and JavaScript (Node.js + Express) for the backend.
The project follows a Modular MVC architecture enhanced with a Use-Case/Service layer for clean scalability and maintainability.

## Features
### Teacher Module

- Register & login

- View available tuition jobs

-  Filter tuitions by location, class, subject, salary

- Apply for tuition

- Track application status

### Guardian Module

- Register & login

- Post tuition with detailed requirements

- View applications from teachers

- Shortlist tutors

- Hire selected tutor

- Manage posted tuitions

## Authentication

- Secure login system

- Role-based access (Teacher / Guardian)

## Job Board

- Real-time list of tuition posts

- Filtering & sorting options

## Admin (Future Expansion)

- Approve tutors

- Verify guardian identity

- Manage disputes

-  Dashboard & analytics

## System Architecture

This project uses a hybrid MVC pattern with a dedicated Use-case Layer, inspired by the ECB (Entity–Control–Boundary) architecture.

Client (HTML/CSS)<br>
        ↓ <br>
Routes  (/routes)<br>
        ↓<br>
Controllers (/controllers)<br>
        ↓<br>
Services / Use-cases (/services)<br>
        ↓<br>
Models  (/models)<br>
        ↓<br>
Database (MongoDB / SQL)<br>

- Routes: Define endpoints and map them to controllers.

- Controllers: Handle HTTP requests and delegate logic to services.

- Use-case / Service Layer: Contains the core business rules:
<ol type="i">
  
<li> postTuition() </li>

<li> applyForTuition() </li>

<li> shortlistTutor() </li>

<li> hireTutor() </li>

<li> filterTuitions() </li>
</ol>


- Models: Database schemas and CRUD operations.

- Views (public/): Static HTML & CSS pages.

## Project Structure
tuition-media/<br>
│<br>
├── server.js<br>
├── package.json<br>
│<br>
├── src/<br>
│   ├── config/<br>
│   ├── models/<br>
│   ├── controllers/<br>
│   ├── services/<br>
│   ├── routes/<br>
│   ├── middlewares/<br>
│   ├── validators/<br>
│   └── utils/<br>
│<br>
├── public/<br>
│   ├── index.html<br>
│   ├── login.html<br>
│   ├── register.html<br>
│   ├── tuition-list.html<br>
│   ├── tuition-post.html<br>
│   ├── css/<br>
│   └── js/<br>
│<br>
└── tests/<br>

## Technologies Used
### Frontend

- HTML5

- CSS3

- JavaScript

### Backend

- Node.js

- Express.js

### Database

MongoDB

### Authentication

JWT

Bcrypt

### Testing

Jest (unit tests for services layer)


## API Endpoints Overview
Auth<br>
Method	Endpoint	Description<br>
POST	/auth/register	User registration<br>
POST	/auth/login	Login<br>
Tuition<br>
Method	Endpoint	Description<br>
POST	/tuitions	Post a new tuition<br>
GET	/tuitions	List all tuitions<br>
GET	/tuitions/filter	Filter tuition<br>
PUT	/tuitions/:id	Update tuition<br>
DELETE	/tuitions/:id	Delete tuition<br>
Applications<br>
Method	Endpoint	Description<br>
POST	/applications/apply	Teacher applies for tuition<br>
GET	/applications/:tuitionId	View applicants for a tuition<br>
POST	/applications/shortlist	Shortlist teacher<br>
POST	/applications/hire	Hire tutor<br>
## Running Tests

To run unit tests:

npm test


### Sample test file:

tests/<br>
 ├── tuitionService.test.js<br>
 ├── authService.test.js<br>
 └── applicationService.test.js<br>

## How to Run the Project
1. Clone the repository
git clone https://github.com/YOUR-USERNAME/tuition-media.git
cd tuition-media

2. Install dependencies
 npm install

3. Set environment variables

4. Create a .env file:

PORT=3000
JWT_SECRET=your_jwt_secret
DB_URI=mongodb://localhost:27017/tuition-media

5. Start the server
npm start


### Visit:
- http://localhost:3000

- Contributing

Pull requests are welcome!
Please follow the architecture pattern when adding new features:

- Add logic inside services

- Keep controllers thin

- Update routes separately

- Write tests for service functions



## Contact

Email: afrozamimm18@email.com
