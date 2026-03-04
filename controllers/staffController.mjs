import path from 'path';
import multer from 'multer';
import fs from 'fs';
import pool from '../config/db.mjs';





//Get Classes for staff froom username
export const getStaffClasses = async (req, res) => {
  const { username } = req.params;

  try {
    // Get user ID from username
    const [userResult] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userId = userResult[0].id;

    // Get staff ID from user ID
    const [staffResult] = await pool.query('SELECT id FROM staffs WHERE user_id = ?', [userId]);
    if (staffResult.length === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const staffId = staffResult[0].id;

    // Get classes assigned to the staff member
    const [classesResult] = await pool.query(
      'SELECT c.id, c.name FROM classes c JOIN staff_classes sc ON c.id = sc.class_id WHERE sc.staff_id = ?',
      [staffId]
    );

    res.status(200).json(classesResult);
  } catch (error) {
    console.error('Error fetching staff classes:', error);
    res.status(500).json({ error: 'Failed to fetch staff classes' });
  }
};

//Get Staff_id from staff from username
// Helper function to get staff ID from username
const getStaffIdFromUsername = async (username) => {
    const [userResult] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userResult.length === 0) {
      throw new Error('User not found');
    }
    const userId = userResult[0].id;
  
    const [staffResult] = await pool.query('SELECT id FROM staffs WHERE user_id = ?', [userId]);
    if (staffResult.length === 0) {
      throw new Error('Staff not found');
    }
    return staffResult[0].id;
  };


// Set up Multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, `${basename}-${Date.now()}${ext}`);
        }
    })
});

export const uploadFiles = async (req, res) => {
    console.log("I m upload");
    // Initialize multer to handle file uploads
    upload.array('files')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Extract username and class_ids from the request body
        const { username, class_ids } = req.body;

        try {
            // Fetch the staff ID based on the username
            const staffId = await getStaffIdFromUsername(username);

            // Parse class_ids
            const parsedClassIds = JSON.parse(class_ids);

            // Insert files into the database
            for (const file of req.files) {
                const filePath = `uploads/${file.filename}`;
                const fileType = path.extname(file.originalname);

                for (const classId of parsedClassIds) {
                    await pool.query(
                        'INSERT INTO files (staff_id, class_id, file_path, file_type) VALUES (?, ?, ?, ?)',
                        [staffId, classId, filePath, fileType]
                    );
                }
            }

            res.status(200).json({ message: 'Files uploaded successfully' });
        } catch (error) {
            console.error('Error during database insert:', error);
            res.status(500).json({ error: 'Failed to upload files' });
        }
    });
};

//To get student classid and studentid 
// API to get student details by username
export const getStudentDetails = async (req, res) => {
    const { username } = req.params;
    console.log(username);
    try {
        // Get user ID from username
        const [userResult] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (userResult.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = userResult[0].id;

        // Get student details from user ID
        const [studentResult] = await pool.query('SELECT id, class_id FROM students WHERE user_id = ?', [userId]);
        if (studentResult.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentDetails = studentResult[0];
        res.status(200).json(studentDetails);
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
};





//Download Links For Student
export const downloadFiles = async (req, res) => {
    const { studentId } = req.body;
    console.log("I M IN DOWNLOAD");
    console.log(studentId);
    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    try {
        // Fetch class ID for the student
        const [classResult] = await pool.query('SELECT class_id FROM students WHERE id = ?', [studentId]);
        if (classResult.length === 0) {
            return res.status(404).json({ error: 'Class not found for the student' });
        }

        const classId = classResult[0].class_id;
         console.log(classId);
        // Fetch files for the class
        const [fileResults] = await pool.query('SELECT file_path, file_type FROM files WHERE class_id = ?', [classId]);

        res.status(200).json({ files: fileResults });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
};

//create complaint by student
export const createComplaint = async (req, res) => {    

    const { student_id, category, description } = req.body;
    const [result] = await db.query('INSERT INTO complaints (student_id, category, description) VALUES (?, ?, ?)', [student_id, category, description]);
    res.json({ id: result.insertId });

}

//Get All Complaints
export const getAllComplaints = async (req, res) => {   

    const [complaints] = await db.query('SELECT * FROM complaints');
    res.json(complaints);
}

//Get complaint for specific 
export const detailCom = async (req, res) => {
    const { student_id } = req.params;
    const [complaints] = await db.query('SELECT * FROM complaints WHERE student_id = ?', [student_id]);
    res.json(complaints);
}