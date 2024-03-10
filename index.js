const express = require('express');
const bodyParser = require('body-parser');
const {createTables,pool}=require('./databse')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

createTables()
app.get('/',(req,res)=>{
  res.status(200).send("sever started ")
})

app.post('/addinstructor', (req, res) => {
  const query = 'INSERT INTO instructor (ins_id,ins_name,email,linked_in) VALUES (?, ?, ?,?)';
  const { ins_id,name,email,linked_in} = req.body; // Destructure req.body to get individual values
  const params = [ins_id,name,email,linked_in]; // Create an array of parameters

  pool.query(query, params, (error) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log("Request accepted. Data inserted into database.");
      res.status(200).json({ message: 'instructor created successfully' });
    }
  });
});


app.post('/addcourse', (req, res) => {
  const query = 'INSERT INTO courses (course_id,ins_id,name, max_seat, startdate, status) VALUES (?, ?, ?, ?,?,?)';
  const { course_id,ins_id,name, max_seat, startdate, status} = req.body; // Destructure req.body to get individual values
  const params = [course_id,ins_id,name, max_seat, startdate, status]; // Create an array of parameters

  console.log("hello");

  pool.query(query, params, (error) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log("Request accepted. Data inserted into database.");
      res.status(200).json({ message: 'Course created successfully' });
    }
  });
});


// Update course details API
app.put('/updatecourse/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const query=`update courses set name=(?),max_seat=(?),startdate=(?),status=(?) where course_id=${courseId}`;
    const {name,max_seat,startdate,status}=req.body;
    const params = [name, max_seat, startdate, status];
    pool.query(query, params, (error) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(`Request accepted. Data updated at ${courseId}.`);
        res.status(200).json({ message: 'Course updated successfully' });
      }
    });
    // res.status(200).json({ message: `Course ${courseId} details updated successfully` });
});

// Course registration API
app.post('/register/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const query=`insert into leads values(?,${courseId},?,?,?,?,"Applied")`;
    const {lead_id,name, email, ph_number, linked_in}=req.body;
    const prams=[lead_id,name, email, ph_number, linked_in];
    pool.query(query,prams,(error)=>{
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(`Request accepted. Data updated at.`);
        res.status(200).json({ message: 'Course Applied successfully' });
      }
    });
});

// // Lead update API
app.put('/updateleads/:leadId', (req, res) => {
    const leadId = req.params.leadId;
    const query=`update leads set status=(?) where lead_id=${leadId}`;
    const { status } = req.body;
    const prams=[status];
    pool.query(query,prams,(error)=>{
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(`Request accepted. status updated successfully`);
        res.status(200).json({ message: 'lead updated successfully' });
      }
    });
});

// // Lead search API
app.get('/searchleads', (req, res) => {
    const query=`select * from leads where name=(?) or email=(?)`;
    const { name, email } = req.body;
    const prams=[name,email];
    pool.query(query,prams,(error,results)=>{
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      else{
        res.status(200).json({ leads: results }); 
      }
    });
   
});




// // Add comment API
app.post('/comments', (req, res) => {
  const { comment_id, lead_id, instructor_id, comment } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date as YYYY-MM-DD HH:MM:SS

  const query = 'INSERT INTO comments (comment_id, lead_id, instructor_id, comment, timestamp) VALUES (?, ?, ?, ?, ?)';
  const params = [comment_id, lead_id, instructor_id, comment, date];

  pool.query(query, params, (error) => {
      if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          console.log('Comment added successfully');
          res.status(201).json({ message: 'Comment added successfully' });
      }
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
