import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// Optimize sorted admin queries
ApplicationSchema.index({ createdAt: -1 });

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;
