const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,  
    unique: true,   
    lowercase: true,
  },
  password: {
    type: String,
    required: true,  
    minlength: [8,'Password must be at least 6 characters long'], 
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    },
}, {
  timestamps: true,  
});

const admin = mongoose.model('Admin', adminSchema);

module.export = admin;
