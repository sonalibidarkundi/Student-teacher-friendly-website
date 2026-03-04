import pool from '../config/db.mjs';

export const addJob = async (req, res) => {
  const { title, description, skills, username } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO job (title, description, skills, username) VALUES (?, ?, ?, ?)',
      [title, description, skills, username]
    );
    res.status(201).json({ id: result.insertId, title, description, skills, username });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
};




export const addCompany = async (req, res) => {

  const { name, username } = req.body;
  

  try {
    const [result] = await pool.query(
      'INSERT INTO company (name, logo, username) VALUES (?, ?, ?)',
      [name, '/uploads/default-logo.png', username] // Assuming logo is default or provided elsewhere
    );
    res.status(201).json({ id: result.insertId, name, username });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ error: 'Failed to add company' });
  }
};

export const getApplicationsByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const [applications] = await pool.query(
      `SELECT a.username, j.title, j.description 
       FROM applications a 
       JOIN job j ON a.jobId = j.id 
       WHERE j.username = ?`,
      [username]
    );

    if (applications.length > 0) {
      res.status(200).json(applications);
    } else {
      res.status(404).json({ error: 'No applications found' });
    }
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
