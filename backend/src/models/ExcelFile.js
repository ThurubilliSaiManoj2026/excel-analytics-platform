import mongoose from 'mongoose';

const excelFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: {}
  },
  headers: [{
    type: String
  }],
  rowCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isProcessed: {
    type: Boolean,
    default: false
  },
  analytics: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.model('ExcelFile', excelFileSchema);
