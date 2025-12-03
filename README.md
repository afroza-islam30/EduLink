# EduLink

A platform connecting Teachers and Guardians for Tuition Opportunities

### Overview

EduLink is a web-based platform where:

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
EduLink/<br>
│<br>
├── server.js<br>
├── package.json<br>
│<br>
├── src/<br>
│   ├── models/<br>
│   ├── controllers/<br>
│   ├── services/<br>
│
│<br>
├── views/<br>
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

### Testing

Jest (unit tests for services layer)


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
DB_URI=mongodb://localhost:27017/EduLink

5. Start the server
npm start


### Visit:
- http://localhost:5000

- Contributing

Pull requests are welcome!
Please follow the architecture pattern when adding new features:

- Add logic inside services

- Keep controllers thin

- Update routes separately

- Write tests for service functions



## Contact

Email: afrozamimm18@email.com
