require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const createSuperAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/excel-analytics');
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'SuperAdmin@gmail.com',
      password: 'SuperAdmin@123',
      role: 'super_admin',
      isApproved: true,
      approvedAt: new Date()
    });

    console.log('Super admin created successfully:');
    console.log('Email:', superAdmin.email);
    console.log('Password: SuperAdmin@123');
    console.log('Role:', superAdmin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();