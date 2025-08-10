import ExcelFile from '../models/ExcelFile.js';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const file = req.file;
    
    // Read Excel file
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    // Get headers
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    
    // Create file record
    const excelFile = await ExcelFile.create({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      data: data,
      headers: headers,
      rowCount: data.length,
      uploadedBy: req.user._id,
      isProcessed: true
    });

    // Basic analytics
    const analytics = {
      totalRows: data.length,
      totalColumns: headers.length,
      headers: headers,
      sampleData: data.slice(0, 5)
    };

    res.json({
      success: true,
      file: excelFile,
      analytics: analytics
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFiles = async (req, res) => {
  try {
    const files = await ExcelFile.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');

    res.json({
      success: true,
      count: files.length,
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is admin
    if (file.uploadedBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this file' });
    }

    res.json({
      success: true,
      file: file
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file or is admin
    if (file.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this file' });
    }

    // Delete file from filesystem
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await file.remove();

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  uploadExcel,
  getUserFiles,
  getFileById,
  deleteFile
};
