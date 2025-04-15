import mongoose from 'mongoose';
import User from './User.js'; 

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
  }],
  totalMarks: {
    type: Number,
    required: true,
  },
  coursecode: {
    type: String,
    required: true,
    unique: true,  
  },
 
}, {
  timestamps: true,  
});
const Course = mongoose.model('Course', courseSchema);

export default Course;
