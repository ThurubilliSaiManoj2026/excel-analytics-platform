import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, requestedRole = 'user' } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // For user registration - auto approve and give token
    if (requestedRole === 'user') {
      const user = await User.create({
        name,
        email,
        password,
        role: 'user',
        requestedRole: 'user',
        isApproved: true,
        approvedAt: new Date()
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        token,
        message: 'User registration successful!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved
        }
      });
    }

    // For admin registration - create pending account
    if (requestedRole === 'admin') {
      const user = await User.create({
        name,
        email,
        password,
        role: 'user', // Start as user until approved
        requestedRole: 'admin',
        isApproved: false,
        approvedAt: null
      });

      return res.status(201).json({
        success: true,
        message: 'Admin registration request submitted! Please wait for super admin approval before logging in.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          requestedRole: user.requestedRole,
          isApproved: user.isApproved
        },
        requiresApproval: true
      });
    }

    return res.status(400).json({ message: 'Invalid role specified' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account has been deactivated.' });
    }

    // Check role-based access
    if (role === 'user' && user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied. This account is not a regular user account.' });
    }

    if (role === 'admin') {
      if (user.role !== 'admin' && user.role !== 'super_admin') {
        if (user.requestedRole === 'admin' && !user.isApproved) {
          return res.status(403).json({ 
            message: 'Your admin access request is still pending approval from the super administrator.',
            requiresApproval: true
          });
        }
        return res.status(403).json({ message: 'Access denied. You do not have admin privileges.' });
      }
    }

    if (role === 'super_admin' && user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied. Super admin access required.' });
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isApproved: req.user.isApproved,
      requestedRole: req.user.requestedRole
    }
  });
};

// Admin functions
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ 
      isApproved: false,
      requestedRole: 'admin'
    }).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      users: pendingUsers,
      count: pendingUsers.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { approve } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.requestedRole !== 'admin') {
      return res.status(400).json({ message: 'This user did not request admin access' });
    }

    if (approve) {
      user.isApproved = true;
      user.role = 'admin'; // Promote to admin
      user.approvedBy = req.user._id;
      user.approvedAt = new Date();
      await user.save();

      return res.json({
        success: true,
        message: 'Admin access approved successfully. User can now login as admin.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved
        }
      });
    } else {
      // Reject the admin request - delete the account
      await User.findByIdAndDelete(userId);
      return res.json({
        success: true,
        message: 'Admin request rejected and account removed.'
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isApproved: true })
      .select('-password')
      .populate('approvedBy', 'name email');

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  register,
  login,
  getMe,
  getPendingUsers,
  approveUser,
  getAllUsers
};
