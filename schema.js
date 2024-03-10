function createInstructor(){
    var query=`CREATE TABLE IF NOT EXISTS instructor (
    ins_id INT PRIMARY KEY,
    ins_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    linked_in VARCHAR(255) UNIQUE NOT NULL);`
    return query;
}


function createCourses(){
 var query=`CREATE TABLE IF NOT EXISTS courses (
    course_id INT  PRIMARY KEY,
    ins_id INT,
    name VARCHAR(255) NOT NULL,
    max_seat INT,
    startdate varchar(255),
    status varchar(255),
    FOREIGN KEY (ins_id) REFERENCES instructor(ins_id)
);`
return query;
}

function createLeads(){
 var query=`CREATE TABLE IF NOT EXISTS leads (
    lead_id INT  PRIMARY KEY,
    course_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    ph_number VARCHAR(20),
    linked_in varchar(255),
    status varchar(255),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`
return query;
}

function createComment(){
var query=`CREATE TABLE IF NOT EXISTS comments (
    comment_id INT  PRIMARY KEY,
    lead_id INT,
    ins_id INT,
    comment varchar(255) NOT NULL,
    timestamp varchar(255),
    FOREIGN KEY (lead_id) REFERENCES leads(lead_id),
    FOREIGN KEY (ins_id) REFERENCES instructor(ins_id)
);`
return query;
}
module.exports = {createInstructor,createCourses,createLeads,createComment};