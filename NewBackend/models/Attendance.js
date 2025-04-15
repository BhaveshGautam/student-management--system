import mongoose from 'mongoose';
import User from'./User.js'; 
import Course from './Course.js';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',  
    required: true,
  },
}, {
  timestamps: true,  
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
