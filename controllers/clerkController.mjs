import pool from '../config/db.mjs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const signUp = [upload.single('logo'), async (req, res) => {
  const { username, password, role } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, role, image) VALUES (?, ?, ?, ?)',
      [username, password, role, image]
    );
    res.status(201).json({ id: result.insertId, username, role, image });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
}];

export const logIn = async (req, res) => {

  const { username, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (user && user.password === password) {
      res.status(200).json({ id: user.id, username: user.username, role: user.role, image: user.image });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('User login failed:', error); // Log the error for debugging
    res.status(500).json({ error: 'User login failed' });
  }
};

export const getUser = async (req, res) => {
  const { username } = req.body;
  

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};


// Function to create a new class
export const createClass = async (req, res) => {
  const { name } = req.body;
  try {
      const [result] = await pool.query('INSERT INTO classes (name) VALUES (?)', [name]);
      console.log(result);
      res.status(201).json({ id: result.insertId, name });
  } catch (error) {
      console.error('Error inserting class:', error);
      res.status(500).json({ error: 'Failed to create class' });
  }
};

// In your server file, e.g., server.js or app.js

// Function to get all classes
export const getAllClasses = async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM classes');
      res.status(200).json(rows);
  } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ error: 'Failed to fetch classes' });
  }
};





// Function to create a new student
export const createStudent = async (req, res) => {
 // console.log(req.body);
  const { username, password, fullname, mobile_number, address, class_id } = req.body;
  try {
      // Create user first
      const [userResult] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'student']);
      const userId = userResult.insertId;

      // Create student with user_id
      const [studentResult] = await pool.query('INSERT INTO students (user_id, fullname, mobile_number, address, class_id) VALUES (?, ?, ?, ?, ?)', [userId, fullname, mobile_number, address, class_id]);
      res.status(201).json({ id: studentResult.insertId, username, fullname, mobile_number, address, class_id });
  } catch (error) {
      console.error('Error inserting student:', error);
      res.status(500).json({ error: 'Failed to create student' });
  }
};

//Craete Staff
// Server-side code to create staff and assign classes
export const createStaff = async (req, res) => {
  const { username, password, fullname, mobile_number, address, class_ids } = req.body;

  // Validate the inputs
  if (!username || !password || !fullname || !mobile_number || !address || !Array.isArray(class_ids)) {
    return res.status(400).json({ error: 'All fields are required and class_ids must be an array' });
  }

  const connection = await pool.getConnection(); // Get a connection from the pool

  try {
    // Start a transaction
    await connection.beginTransaction();

    // Create user first
    const [userResult] = await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'staff']);
    const userId = userResult.insertId;

    // Create staff with user_id
    const [staffResult] = await connection.query('INSERT INTO staffs (user_id, fullname, mobile_number, address) VALUES (?, ?, ?, ?)', [userId, fullname, mobile_number, address]);
    const staffId = staffResult.insertId;

    // Assign classes to staff using staffId
    for (const class_id of class_ids) {
      await connection.query('INSERT INTO staff_classes (staff_id, class_id) VALUES (?, ?)', [staffId, class_id]);
    }

    // Commit the transaction
    await connection.commit();

    res.status(201).json({ id: staffId, username, fullname, mobile_number, address, class_ids });
  } catch (error) {
    // Rollback the transaction in case of error
    await connection.rollback();
    
    console.error('Error inserting staff:', error);
    res.status(500).json({ error: 'Failed to create staff' });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};
//To get the student ID
export const getStudentId = async (req, res) => {

  const { username } = req.body;

  try {
      // Query to get the student ID based on the username
      const [result] = await pool.query(
          `SELECT students.id AS student_id
           FROM users
           INNER JOIN students ON users.id = students.user_id
           WHERE users.username = ?`,
          [username]
      );

      if (result.length > 0) {
          res.status(200).json({ studentId: result[0].student_id });
      } else {
          res.status(404).json({ error: 'Student not found' });
      }
  } catch (error) {
      console.error('Error fetching student ID:', error);
      res.status(500).json({ error: 'Failed to fetch student ID' });
  }
}
