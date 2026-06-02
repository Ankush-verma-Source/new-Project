import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import connectDB from './db.js';
import Admin from './models/Admin.js';
import Application from './models/Application.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Seed default Admin if not exists
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      console.log(`Default admin user seeded. Username: ${username}`);
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};
seedAdmin();

// JWT Authentication Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'global_edu_secure_jwt_token_key_2026');
      
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ message: 'Not authorized, admin user not found' });
      }
      req.admin = admin;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// --- PUBLIC ROUTES ---

// Submit scholarship application with robust validation
app.post('/api/submissions/apply', async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;
    
    // 1. Basic empty checks
    if (!name || !email || !phone || !course) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\-/g, ''); // Keep spacing between country code and 10 digits

    // 2. Name validation: Only letters and spaces, between 2 and 50 characters
    if (!/^[a-zA-Z\s]{2,50}$/.test(cleanName)) {
      return res.status(400).json({ message: 'Name must contain only letters and spaces, and be between 2 and 50 characters.' });
    }

    // 3. Email validation: standard email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // 4. Phone validation: Strictly "+[1-4 digits country code] [exactly 10 digits]"
    if (!/^\+\d{1,4}\s\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number with its country code.' });
    }

    const application = new Application({ 
      name: cleanName, 
      email: cleanEmail, 
      phone: cleanPhone, 
      course 
    });
    await application.save();

    // Note: Email sending (Phase 2) will go here.
    
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: application });
  } catch (error) {
    console.error(`Application submission error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error while saving application' });
  }
});

// Submit contact message with robust validation
app.post('/api/submissions/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Basic empty checks
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\-/g, '');
    const cleanMessage = message.trim();

    // 2. Name validation
    if (!/^[a-zA-Z\s]{2,50}$/.test(cleanName)) {
      return res.status(400).json({ message: 'Name must contain only letters and spaces, and be between 2 and 50 characters.' });
    }

    // 3. Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // 4. Phone validation: Strictly "+[1-4 digits country code] [exactly 10 digits]"
    if (!/^\+\d{1,4}\s\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number with its country code.' });
    }

    // 5. Message validation: minimum length of 5 characters
    if (cleanMessage.length < 5) {
      return res.status(400).json({ message: 'Message must be at least 5 characters long.' });
    }

    const enquiry = new Enquiry({ 
      name: cleanName, 
      email: cleanEmail, 
      phone: cleanPhone, 
      message: cleanMessage 
    });
    await enquiry.save();

    // Note: Email sending (Phase 2) will go here.

    res.status(201).json({ success: true, message: 'Message sent successfully', data: enquiry });
  } catch (error) {
    console.error(`Contact submission error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error while saving contact message' });
  }
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || 'global_edu_secure_jwt_token_key_2026',
        { expiresIn: '30d' }
      );
      
      res.json({
        success: true,
        token,
        admin: {
          id: admin._id,
          username: admin.username
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login authentication' });
  }
});

// --- PROTECTED ADMIN ROUTES ---

// Get all scholarship applications
app.get('/api/admin/applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error(`Error fetching applications: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
});

// Get all contact enquiries
app.get('/api/admin/enquiries', protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error(`Error fetching enquiries: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching enquiries' });
  }
});

// Delete scholarship application
app.delete('/api/admin/applications/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application record not found' });
    }
    await application.deleteOne();
    res.json({ success: true, message: 'Application record deleted successfully' });
  } catch (error) {
    console.error(`Error deleting application: ${error.message}`);
    res.status(500).json({ message: 'Server error deleting application record' });
  }
});

// Delete contact enquiry
app.delete('/api/admin/enquiries/:id', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry record not found' });
    }
    await enquiry.deleteOne();
    res.json({ success: true, message: 'Enquiry record deleted successfully' });
  } catch (error) {
    console.error(`Error deleting enquiry: ${error.message}`);
    res.status(500).json({ message: 'Server error deleting enquiry record' });
  }
});

// Fallback Route
app.get('/', (req, res) => {
  res.send('GlobalEdu Guide Backend Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
