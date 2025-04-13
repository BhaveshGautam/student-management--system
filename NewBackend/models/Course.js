 const mongoose = import('mongoose');
const User = import('./models/User'); 
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
