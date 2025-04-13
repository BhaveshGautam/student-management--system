const mongoose = import('mongoose');
const User = import('./models/User'); 
const Course = import ('./models/Course');

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
