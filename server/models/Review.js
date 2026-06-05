import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Optimize pagination sorted reads
ReviewSchema.index({ approved: 1, createdAt: -1 });

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
