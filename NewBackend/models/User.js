import  mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  section: {
    type: String,
    required: true,  
  },
  branch: {
    type: String,
    required: true, 
  },
  year: {
    type: Number,
    required: true,  
  },
  rollNo: {
    type: String,
    required: true, 
    unique: true,   
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,  
    minlength: [6, 'Password must be at least 6 characters long'], 
  },
}, {
  timestamps: true, 
});

const User = mongoose.model('User', userSchema);

export default User;
