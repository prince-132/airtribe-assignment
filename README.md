# airtribe-assignment

Airtribe is an application designed for managing instructors, courses, leads, comments, and their interactions. This repository contains the backend implementation of the Airtribe application using Node.js and MySQL.

# Table of Contents
 * Installation
 * Usage
 * Endpoints
 * Database Schema
 * Contributing
   
# Installation
To set up the Airtribe application locally, follow these steps:
1. Clone this repository to your local machine:
```
   git clone https://github.com/your-username/airtribe-backend.git
```

2. Navigate to the project directory:
```
```

3. Install the dependencies:
```
npm install
```
4. Ensure you have MySQL installed and running on your system. Modify the database configuration in databse.js file if needed.

5. Create the necessary database tables by running:
```
node database.js
```

# Usage
To start the server, run:
```
npm start
```
This will start the server on the default port 3000 unless a different port is specified in the environment variable PORT.

# Endpoints
The following endpoints are available in the Airtribe application:

1.GET /:
Description: Server status endpoint.
Response: "Server started".

2.POST /addinstructor:
Description: Add a new instructor to the database.
Request Body:
```
{ 
"ins_id": 1, 
"name": "John Doe",
"email": "john@example.com", 
"linked_in": "https://www.linkedin.com/in/johndoe" 
}.
```
Response:
```
{ 
"message": "Instructor created successfully"
}.
```

3.POST /addcourse:
Description: Add a new course to the database.
Request Body: 
```
{ 
"course_id": 1, 
"ins_id": 1,
"name": "Course Name",
"max_seat": 20,
"startdate": "2024-03-10",
"status": "Active"
}.
```

Response: 
```
{ 
"message": "Course created successfully" 
}.
```


4.PUT /updatecourse/:courseId:
Description: Update details of a course.
Request Body: 
```
{ "name": "New Course Name"
, "max_seat": 30,
"startdate": "2024-03-15",
"status": "Inactive"
}.
```

Response:
```
 { 
"message": "Course updated successfully" 
}.
```


5.POST /register/:courseId:
Description: Register for a course.
Request Body: 
```
{ 
"lead_id": 1,
"name": "Lead Name",
"email": "lead@example.com",
"ph_number": "1234567890",
"linked_in": "https://www.linkedin.com/in/leadname" 
}.
```

Response:
```
{
"message": "Course Applied successfully"
}.
```

6.PUT /updateleads/:leadId:
Description: Update status of a lead.
Request Body: 
```
{ 
"status": "Accepted"
}.
```
Response: 
```
{ 
"message": "Lead updated successfully" 
}.
```

7.GET /searchleads:
Description: Search leads by name or email.
Query Parameters: name (string), email (string).
Response: List of leads matching the search criteria.

8.POST /comments:
Description: Add a comment.
Request Body:
```
{ 
"comment_id": 1,
"lead_id": 1, 
"instructor_id": 1,
"comment": "This is a comment"
}.
```
Response:
```
{ 
"message": "Comment added successfully"
}.
```

# Database Schema
The application uses the following database schema:

. instructor: Stores information about instructors.
. courses: Stores information about courses.
. leads: Stores information about leads for courses.
. comments: Stores comments made by instructors or leads.
You can find the schema definitions in the schema.js file.

# Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.
